import React, { Component } from "react";
import { Slider } from "@material-ui/core";

class FloodIntensity extends Component {
  state = {
    sliderLabel: "Flood Intensity",
    intensity: 0,
  };

  handleChange = (event, value) => {
    const intensity = value;
    console.log(intensity);
    this.setState({ intensity });
  };

  render() {
    const marks = [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
      { value: 6 },
      { value: 7 },
      { value: 8 },
      { value: 9 },
      { value: 10 },
    ];

    return (
      <div className="row">
        <Slider
          defaultValue={0}
          //getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          step={1}
          marks={marks}
          min={1}
          max={10}
          valueLabelDisplay="off"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default FloodIntensity;
