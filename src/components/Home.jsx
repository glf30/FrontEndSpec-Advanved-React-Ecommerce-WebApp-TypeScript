import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import NavigationBar from "./NavBar";
import ProductList from "./ProductList";


const Home = () => {
  const { user } = useContext(UserContext);

  return (
    
    <>
      <NavigationBar />
      <Container fluid className="p-0">
        {/* Hero Section */}
        <div className="bg-dark text-white text-center py-5">
          <h1 className="display-4">Welcome to Our E-Commerce Site</h1>
          <p className="lead">Find the best products at unbeatable prices.</p>
          <Button variant="primary" size="lg">Shop Now</Button>
        </div>

        {/* About Us Section */}
        <Container className="my-5">
          <h2>About Us</h2>
          <p>
            We are committed to offering the highest quality products at affordable prices.
            Explore our wide range of products and experience top-notch customer service.
          </p>
        </Container>

        {/* Product Listing Section */}
        <Container className="my-5">
          <h2>Our Products</h2>
          <ProductList />
        </Container>
      </Container>
    </>
  );
};

export default Home;
