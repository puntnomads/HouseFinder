import React, { Component } from "react";
import { connect } from "react-redux";
import { propertyGet, propertyUpdate } from "./actions";
import "./index.css";

class Property extends Component {
  componentDidMount() {
    const propertyId = this.props.match.params.propertyId;
    this.props.propertyGet(propertyId);
  }
  dismissProperty = propertyId => {
    const update = { status: "dismissed" };
    this.props.propertyUpdate(propertyId, update);
  };
  interestProperty = propertyId => {
    const update = { status: "interesting" };
    this.props.propertyUpdate(propertyId, update);
  };
  render() {
    const {
      property: { requesting, successful, messages, errors, property }
    } = this.props;
    const url = this.props.property.property.details_url;
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <button onClick={() => this.dismissProperty(property._id)}>
          Dismissed
        </button>
        <button onClick={() => this.interestProperty(property._id)}>
          Interesting
        </button>
        <webview
          is
          nodeintegration
          style={{ width: "100%", height: "100%" }}
          src={url}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  property: state.property
});

const connected = connect(mapStateToProps, { propertyGet, propertyUpdate })(
  Property
);

export default connected;
