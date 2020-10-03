import React, { Component } from 'react';
import { Slider } from '@material-ui/core';
class ElapsedHours extends Component{

    state = {
        
    };
      
    valuetext(value) {
        return value;
      }

    render() {
        return (
            <div>
                <Slider
                 defaultValue={80}
                 //getAriaValueText={valuetext}
                 aria-labelledby="discrete-slider-always"
                 step={10}
                 //marks={marks}
                 valueLabelDisplay="off"
                />
            </div>
        );
    }
}

export default ElapsedHours;
