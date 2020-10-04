import React, { Component } from "react";
import './button.css';

class Button extends Component {
  state = {};
  render() {
    return (
        <button
          className="button"
          onClick={this.props.handleClick}
        >
            Simulate Flood
        </button>
    );
  }
}

export default Button;
