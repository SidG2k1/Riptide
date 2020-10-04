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
// Abbiram's token: "pk.eyJ1IjoiYTZyYW1hbmEiLCJhIjoiY2tmc3loYTZvMGw5cDJ5cWcxNG5mcWR0ayJ9.qI5lnaQPLtsRUAz-LKLihg";

class App extends Component {
  state = {
    lng: 0,
    lat: 0,
    zoom: 2,
    searchTerm: "",
  };

  globalMap;

  exampleJSON = {
    populationDisplaced: 16,
    totalDamage: 2500,
    geodata: [
      {
        Longitude: -74.0,
        Latitude: 40.0,
        Volume: 0,
        populationDisplaced: 1,
        damage: 200,
      },
      {
        Longitude: -73.9991673605329,
        Latitude: 40.0,
        Volume: 0,
        populationDisplaced: 2,
        damage: 300,
      },
      {
        Longitude: -73.99833472106577,
        Latitude: 40.0,
        Volume: 0,
        populationDisplaced: 3,
        damage: 300,
      },
    ],
  };

  points = [];
  allPoints = [];

  jsonParser(jsonObj) {
    let stringyObj = JSON.stringify(jsonObj);
    const obj = JSON.parse(stringyObj);
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
  }

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

  handleRender = () => {
    let map = this.globalMap;

    if (this.globalMap.getLayer("circle500") !== undefined) {
      this.globalMap.removeLayer("circle500");
    }
    if (this.globalMap.getSource("circle500") !== undefined) {
      this.globalMap.removeSource("circle500");
    }

    this.jsonParser(this.exampleJSON);

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
            [10, 20],
            [15, 35],
          ],
          base: 1.3,
        },
        "circle-color": "rgba(25, 181, 254, 0.35)",
      },
    });
  };

  //https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addsource

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
            <ElapsedHours />
            <h5 className="center low">Flood Intensity</h5>
            <FloodIntensity />
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
