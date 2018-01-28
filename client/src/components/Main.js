import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PostcodesList from "./PostcodesList";
import PropertiesList from "./PropertiesList";
import Property from "./Property";

export default class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={PostcodesList} />
          <Route path="/properties/:postcode" component={PropertiesList} />
          <Route path="/hi" component={Property} />
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
