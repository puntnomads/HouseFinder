import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { propertiesGet } from "./actions";
import {
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button
} from "react-bootstrap";
import Input from "../Lib/Input";

const Title = styled.h1`
  text-align: center;
`;

class PropertiesList extends Component {
  componentDidMount() {
    const postcode = this.props.match.params.postcode;
    this.props.propertiesGet(postcode);
  }
  submit = values => {
    console.log(values);
    this.props.propertiesGet(values.postcode);
  };
  render() {
    const {
      propertiesList: { requesting, successful, messages, errors, properties },
      handleSubmit
    } = this.props;
    properties.sort(function(a, b) {
      return a.distance - b.distance;
    });
    return (
      <div className="companieslistpage">
        <Title>Properties</Title>
        <Grid>
          <Row>
            <Col xs={10} xsOffset={1} md={6} mdOffset={3}>
              <div className="page">
                <form onSubmit={handleSubmit(this.submit)}>
                  <Field
                    name="postcode"
                    label="Postcode"
                    controlId="postcode"
                    bsSize="large"
                    type="text"
                    component={Input}
                  />
                  <Button block bsSize="large" type="submit">
                    Search
                  </Button>
                </form>
              </div>
            </Col>
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
  propertiesList: state.propertiesList
});

const connected = connect(
  mapStateToProps,
  { propertiesGet }
)(PropertiesList);

const formed = reduxForm({
  form: "propertiesList"
})(connected);

export default formed;
