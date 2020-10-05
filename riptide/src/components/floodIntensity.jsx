import React, { Component } from "react";
import { Slider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

class FloodIntensity extends Component {
  muiTheme = createMuiTheme({
    overrides: {
      MuiSlider: {
        thumb: {
          color: "skyblue",
        },
        track: {
          color: "skyblue",
        },
        rail: {
          color: "black",
        },
        markLabel: {
          color: "white",
        },
        markLabelActive: {
          color: "skyblue",
        },
      },
    },
  });

  render() {
    const marks = [
      { value: 1, label: "1" },
      { value: 2, label: "2" },
      { value: 3, label: "3" },
      { value: 4, label: "4" },
      { value: 5, label: "5" },
      { value: 6, label: "6" },
      { value: 7, label: "7" },
      { value: 8, label: "8" },
      { value: 9, label: "9" },
      { value: 10, label: "10" },
    ];

    return (
      <div className="row">
        <ThemeProvider theme={this.muiTheme}>
          <Slider
            defaultValue={0}
            aria-labelledby="discrete-slider-always"
            step={1}
            marks={marks}
            min={1}
            max={10}
            valueLabelDisplay="off"
            onChange={this.props.onIntensity}
          />
        </ThemeProvider>
      </div>
    );
  }
}

export default FloodIntensity;
