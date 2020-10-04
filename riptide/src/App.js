import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import "./App.css";
import ElapsedHours from "./components/elapsedHours";
import FloodIntensity from "./components/floodIntensity";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYTZyYW1hbmEiLCJhIjoiY2tmc3loYTZvMGw5cDJ5cWcxNG5mcWR0ayJ9.qI5lnaQPLtsRUAz-LKLihg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2,
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/light-v10",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

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
      })
    );
  }

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

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
