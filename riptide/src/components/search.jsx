import React, { Component } from "react";

class Search extends Component {
  state = {
    searchTerm: "",
  };

  editSearchTerm = (term) => {
    const searchTerm = term.target.value;
    this.setState({ searchTerm });
  };

  render() {
    const searchStyle = {
      width: "80%",
      padding: "10px",
      margin: "10px",
      fontFamily: "Arial"
    }
    return (
      <div>
        <input
        style = {searchStyle}
          placeholder="Search Riptide"
          type="text"
          value={this.state.searchTerm}
          onChange={this.editSearchTerm}
        />
      </div>
    );
  }
}

export default Search;
