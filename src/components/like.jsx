import React, { Component } from "react";

class Like extends Component {
  render() {
    return (
      <i
        className={this.props.like ? "fa fa-heart" : "fa fa-heart-o"}
        area-hidden="false"
        onClick={this.props.onClick}
      ></i>
    );
  }
}

export default Like;
