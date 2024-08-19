import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Facebook, Twitter, Instagram } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: support@example.com</p>
            <p>Phone: +1 123 456 7890</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link className="text-white">Privacy Policy</Nav.Link>
              <Nav.Link className="text-white">Terms of Service</Nav.Link>
              <Nav.Link className="text-white">Contact Us</Nav.Link>
            </Nav>
          </Col>
          <Col md={4} className="text-center">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center">
              <Nav.Link className="text-white p-2">
                <Facebook size={24} />
              </Nav.Link>
              <Nav.Link className="text-white p-2">
                <Twitter size={24} />
              </Nav.Link>
              <Nav.Link className="text-white p-2">
                <Instagram size={24} />
              </Nav.Link>
            </div>
          </Col>
        </Row>
        <Row className="pt-3 border-top border-secondary">
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} E-Commerce Site. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
