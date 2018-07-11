import React, { Component } from "react";
import { Grid, Row, Col, Thumbnail } from "react-bootstrap";

class ErrorBoundary extends Component {
  state = {
    hasError: false
  };
  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    });
  }
  render() {
    if (this.state.hasError) {
      return (
        <Grid>
          <Row>
            <Col xs={12}>
              <Thumbnail
                src="https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops.png"
                alt="oops"
              >
                <h3>"Sorry Something went wrong!!!"</h3>
                <p>Error catched by error boundary of react 16</p>
              </Thumbnail>
            </Col>
          </Row>
        </Grid>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
