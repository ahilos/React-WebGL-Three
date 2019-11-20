import React, { Component } from 'react';
import {  Row, Col, Container} from 'react-bootstrap';

import Drawbar from './Drawbar/Drawbar';
import Appbar from './Appbar/Appbar';
import './App.css';

class App extends Component {
  render() {
    return (
      <Container fluid={true} style={{padding:'0px'}}>
        <Appbar/>
        <Row style={{margin:'20px'}}>
          <Col md={3} style={{height:"calc(100vh - 100px)",overflow: 'auto'}}>
            <Drawbar/>
          </Col>

          <Col md={9}>
            <Container fluid={true}>
                {this.props.children}
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
