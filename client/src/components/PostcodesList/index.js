import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { postcodesGet } from "./actions";
import { Grid, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import "./index.css";

class PostcodesList extends Component {
  componentDidMount() {
    this.props.postcodesGet();
  }

  render() {
    const { postcodesList: { postcodes } } = this.props;
    return (
      <div className="companieslistpage">
        <h1>Postcodes</h1>
        <Grid>
          <Row>
            <Col xs={10} xsOffset={1} md={6} mdOffset={3}>
              <ListGroup>
                {postcodes &&
                  postcodes.map((postcode, i) => (
                    <Link key={i} to={`/properties/${postcode.text}`}>
                      <ListGroupItem>{postcode.text}</ListGroupItem>
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
  postcodesList: state.postcodesList
});

const connected = connect(mapStateToProps, { postcodesGet })(PostcodesList);

export default connected;
