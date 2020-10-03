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
    return (
      <div>
        <input
          placeholder="Search"
          type="text"
          value={this.state.searchTerm}
          onChange={this.editSearchTerm}
        />
      </div>
    );
  }
}

export default Search;
