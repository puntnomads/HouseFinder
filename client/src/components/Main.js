import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PostcodesList from "./PostcodesList";
import PropertiesList from "./PropertiesList";
import Property from "./Property";
import InterestingPropertiesList from "./InterestingPropertiesList";

export default class Main extends Component {
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Switch>
          <Route exact path="/" component={PostcodesList} />
          <Route path="/properties/:postcode" component={PropertiesList} />
          <Route path="/property/:propertyId" component={Property} />
          <Route
            path="/interesting_properties"
            component={InterestingPropertiesList}
          />
          <Route
            render={function() {
              return <p>Not Found</p>;
            }}
          />
        </Switch>
      </div>
    );
  }
}
