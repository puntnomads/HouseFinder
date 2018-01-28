import React, { Component } from "react";
import "./index.css";
const WebView = require("react-electron-web-view");

class Property extends Component {
  state = {
    url: "https://www.google.com"
  };
  render() {
    return (
      <div>
        <WebView
          src={this.state.url}
          style={{ width: 720, height: 480 }}
          className="height-large"
        />
      </div>
    );
  }
}

export default Property;
