import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { propertiesGet } from "./actions";
import {
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button
} from "react-bootstrap";
import "./index.css";

class InterestingPropertiesList extends Component {
  componentDidMount() {
    this.props.propertiesGet();
  }
  render() {
    const {
      interestingPropertiesList: {
        requesting,
        successful,
        messages,
        errors,
        properties
      }
    } = this.props;
    return (
      <div className="companieslistpage">
        <h1>Properties</h1>
        <Grid>
          <Row>
            <Col xs={10} xsOffset={1} md={6} mdOffset={3}>
              <ListGroup>
                {properties &&
                  properties.map((property, i) => (
                    <Link key={i} to={`/property/${property._id}`}>
                      <ListGroupItem>
                        {property.displayable_address}
                      </ListGroupItem>
                    </Link>
                  ))}
              </ListGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  interestingPropertiesList: state.interestingPropertiesList
});

const connected = connect(mapStateToProps, { propertiesGet })(
  InterestingPropertiesList
);

export default connected;
