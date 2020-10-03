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
            { value: 11 },
            { value: 12 },
            { value: 13 },
          ];
        return (
            <div>
                <Slider
                 defaultValue={1}
                 aria-labelledby="discrete-slider-always"
                 aria-label={this.sliderLabel}
                 min={1}
                 max={13}
                 scale={(x) => (x <= 6 ? x : (x - 1) * 2)}
                 valueLabelDisplay="auto"
                 marks={marks}
                 onChange={this.handleEvent}
                />
            </div>
        );
    }
}

export default ElapsedHours;
