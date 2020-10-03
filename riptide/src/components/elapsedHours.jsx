import React, { Component } from 'react';
import { Slider } from '@material-ui/core';
class ElapsedHours extends Component{

    state = {
        elapsed: 0,
        sliderLabel: "Elapsed Hours"
    };
      
    valuetext(value) {
        return value;
      }

    handleEvent = (event, value) => {
        const elapsed = value;
        this.setState({ elapsed });
    };

    render() {
        return (
            <div>
                <Slider
                 defaultValue={1}
                 aria-labelledby="discrete-slider-always"
                 aria-label={this.sliderLabel}
                 min={1}
                 max={13}
                 step={1}
                 scale={(x) => (x <= 6 ? x : (x - 1) * 2)}
                 valueLabelDisplay="auto"
                 onChange={this.handleEvent}
                />
            </div>
        );
    }
}

export default ElapsedHours;
