import React, { Component } from "react";
import { Slider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

class ElapsedHours extends Component {
  state = {
    elapsed: 0,
    sliderLabel: "Elapsed Hours",
  };

  valuetext(value) {
    return value;
  }

  handleEvent = (event, value) => {
    const elapsed = value;
    this.setState({ elapsed });
  };

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
      { value: 10, label: "10" },
      { value: 20, label: "20" },
      { value: 30, label: "30" },
      { value: 40, label: "40" },
      { value: 50, label: "50" },
      { value: 60, label: "60" },
      { value: 70, label: "70" },
      { value: 80, label: "80" },
      { value: 90, label: "90" },
      { value: 100, label: "100" },
      { value: 110, label: "110" },
      { value: 120, label: "120" },
    ];
    return (
      <div className="row">
        <ThemeProvider theme={this.muiTheme}>
          <Slider
            defaultValue={10}
            aria-labelledby="discrete-slider-always"
            min={10}
            max={120}
            step={10}
            valueLabelDisplay="off"
            marks={marks}
            onChange={this.handleEvent}
          />
        </ThemeProvider>
      </div>
    );
  }
}

export default ElapsedHours;
