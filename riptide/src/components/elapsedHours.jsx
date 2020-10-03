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
      { value: 1, label: "1" },
      { value: 2, label: "2" },
      { value: 3, label: "3" },
      { value: 4, label: "4" },
      { value: 5, label: "5" },
      { value: 6, label: "6" },
      { value: 7, label: "12" },
      { value: 8, label: "14" },
      { value: 9, label: "16" },
      { value: 10, label: "18" },
      { value: 11, label: "20" },
      { value: 12, label: "22" },
      { value: 13, label: "24" },
    ];
    return (
      <div className="row">
        <ThemeProvider theme={this.muiTheme}>
          <Slider
            defaultValue={1}
            aria-labelledby="discrete-slider-always"
            min={1}
            max={13}
            scale={(x) => (x <= 6 ? x : (x - 1) * 2)}
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
