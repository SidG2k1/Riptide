import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import "./App.css";
import ElapsedHours from "./components/elapsedHours";
import FloodIntensity from "./components/floodIntensity";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import Button from "./components/button";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibXJ1Z2FuazA5IiwiYSI6ImNrZmx5dzFiazB5azYyeHF1ZzRncHhjNGEifQ.ZJisPtGi4p3k9U5RU-aj6A";

class App extends Component {
  state = {
    lng: 0,
    lat: 0,
    zoom: 2,
    elapsedTime: 0,
    intensity: 0,
    populationDisplaced: 0,
    totalDamage: 0,
  };

  globalMap;
  points = [];
  allPoints = [];

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/light-v10",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    this.globalMap = map;

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(1),
      });
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false,
        zoom: 14,
      })
    );
  }

  jsonParser(jsonFile) {
    obj = JSON.parse(JSON.stringify(jsonFile));
    let geodata = obj.geodata;
    geodata.forEach((dataPoint) => {
      this.points.push([dataPoint.Longitude, dataPoint.Latitude]);
    });

    this.allPoints = this.points.map((point) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: { ...point },
      },
    }));

    const populationDisplaced = obj.populationDisplaced;
    this.setState({ populationDisplaced });

    const totalDamage = obj.totalDamage;
    this.setState({ totalDamage });
  }

  handleRender = () => {
    let map = this.globalMap;

    if (this.globalMap.getLayer("circle500") !== undefined) {
      this.globalMap.removeLayer("circle500");
    }
    if (this.globalMap.getSource("circle500") !== undefined) {
      this.globalMap.removeSource("circle500");
    }

    this.jsonParser(
      fetch(url).then((response) => {
        return response.json();
      })
    );

    map.addLayer({
      id: "circle500",
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: this.allPoints,
        },
      },
      layout: {
        visibility: "visible",
      },
      paint: {
        "circle-radius": {
          stops: [
            [0, 1],
            [1, 1],
            [3, 2],
            [5, 5],
            [10, 50],
            [15, 75],
          ],
          base: 1.3,
        },
        "circle-color": "rgba(25, 181, 254, 0.35)",
      },
    });
  };

  handleTime = (event, value) => {
    const elapsedTime = value;
    this.setState({ elapsedTime });
  };

  handleIntensity = (event, value) => {
    const intensity = value;
    this.setState({ intensity });
  };

  render() {
    const menustyle = {
      width: "26%",
      padding: "20px",
    };

    return (
      <React.Fragment>
        <div>
          <div className="sidebarStyle" style={menustyle}>
            <h5 className="center low">Elapsed Minutes</h5>
            <ElapsedHours onTime={this.handleTime} />
            <h5 className="center low">Flood Intensity</h5>
            <FloodIntensity onIntensity={this.handleIntensity} />
            <h5 className="center low">
              Population Displaced: {this.state.populationDisplaced}
            </h5>
            <h5 className="center low">
              Total Est. Damage: ${this.state.totalDamage}
            </h5>
            <span className="center-place">
              <Button onRender={() => this.handleRender()} />
            </span>
          </div>
          <div className="infobarStyle">
            Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
            {this.state.zoom}
          </div>
          <div
            ref={(el) => (this.mapContainer = el)}
            className="mapContainer"
          />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
