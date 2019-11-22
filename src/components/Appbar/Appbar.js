import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';

class Appbar extends Component {
  render() {
    return (
        <Navbar bg="dark" variant="dark" style={{marginBottom:'10px'}}>
            <Navbar.Brand>React Three Examples</Navbar.Brand>
        </Navbar>
    );
  }
}

export default Appbar;
