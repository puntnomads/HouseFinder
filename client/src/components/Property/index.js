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
    const { propertyState: { property } } = this.props;
    const url = property.details_url;
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <button onClick={() => this.dismissProperty(property._id)}>
          Dismissed
        </button>
        <button onClick={() => this.interestProperty(property._id)}>
          Interesting
        </button>
        <span>{`Distance ${property.distance}KM `}</span>
        <br />
        <span>Train Stations </span>
        {property.train_stations &&
          property.train_stations.map(train_station => (
            <span>{`${train_station.name}: ${train_station.distance *
              1000}M `}</span>
          ))}
        <br />
        <span>Bus Stops </span>
        {property.bus_stops &&
          property.bus_stops.map(bus_stop => (
            <span>{`${bus_stop.name}: ${bus_stop.distance * 1000}M `}</span>
          ))}
        <br />
        <span>Supermarkets </span>
        {property.supermarkets &&
          property.supermarkets.map(supermarket => (
            <span>{`${supermarket.name}: ${supermarket.distance *
              1000}M `}</span>
          ))}
        <br />
        <span>URL: {url}</span>
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
  propertyState: state.property
});

const connected = connect(mapStateToProps, { propertyGet, propertyUpdate })(
  Property
);

export default connected;
