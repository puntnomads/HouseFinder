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

class PropertiesList extends Component {
  componentDidMount() {
    const postcode = this.props.match.params.postcode;
    this.props.propertiesGet(postcode);
  }

  render() {
    const {
      propertiesList: { requesting, successful, messages, errors, properties }
    } = this.props;
    console.log("PropertiesList: ", properties);

    return (
      <div className="companieslistpage">
        <h1>Properties</h1>
        <Grid>
          <Row>
            <Col xs={10} xsOffset={1} md={6} mdOffset={3}>
              <ListGroup>
                {properties &&
                  properties.map((property, i) => (
                    <Link key={i} to={property.details_url}>
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
  propertiesList: state.propertiesList
});

const connected = connect(mapStateToProps, { propertiesGet })(PropertiesList);

export default connected;
