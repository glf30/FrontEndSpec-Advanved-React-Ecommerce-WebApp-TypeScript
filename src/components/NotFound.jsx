import React from 'react';
import Gandalf from '../assets/images/Gandalf.jpg'
import { Container, Row, Col } from 'react-bootstrap';

function NotFound() {
  return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-100 shadow-lg ">
      <Row className="text-center">
        <Col className='bg-dark p-5 text-light shadow rounded-5'>
        <h1>ERROR: 404</h1>
          <img src={Gandalf} alt="Gandalf" className="img-fluid" />
          <p className="mt-3"><strong>You're not supposed to be here! Fly, you fool.</strong></p>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;