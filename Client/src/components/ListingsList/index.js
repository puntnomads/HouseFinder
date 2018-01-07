import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { listingsGet } from "./actions";
import {
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button
} from "react-bootstrap";
import "./index.css";

class Listings extends Component {
  componentDidMount() {
    this.props.listingsGet();
  }

  render() {
    const {
      listingsList: { requesting, successful, messages, errors, listings }
    } = this.props;
    return (
      <div className="companieslistpage">
        <Grid>
          <Row>
            <Col xs={10} xsOffset={1} md={6} mdOffset={3}>
              <ListGroup>
                {listings &&
                  listings.map((listing, i) => (
                    <Link key={i} to={`/${listing.slug}/project-list`}>
                      <ListGroupItem>{listing.name}</ListGroupItem>
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
  listingsList: state.listingsList
});

const connected = connect(mapStateToProps, { listingsGet })(Listings);

export default connected;
