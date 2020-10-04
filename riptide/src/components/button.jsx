import React, { Component } from "react";
import "./button.css";

class Button extends Component {
  render() {
    return (
      <button className="button" onClick={this.props.onRender}>
        Simulate Flood
      </button>
    );
  }
}

export default Button;
