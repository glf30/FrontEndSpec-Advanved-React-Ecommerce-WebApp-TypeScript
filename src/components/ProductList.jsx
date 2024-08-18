import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { addToCart } from "../features/shoppingCartSlice";
import { useDispatch } from "react-redux";
import UserContext from "../context/UserContext";
import NavigationBar from "./NavBar";
import { useGetProducts } from "../hooks/useGetProducts";

const ProductList = () => {
  
  const { user } = useContext(UserContext);

  const [productList, setProductList] = useState([]); 

  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  
  const { fetchProducts, products, loading, error } = useGetProducts();

  // get the products
  useEffect(() => {
    fetchProducts();
  }, []); 

  useEffect(() => {
    if (!loading && !error) {
      setProductList(products);
    }
  }, [products, loading, error]);


  const handleAddShoppingCart = (product) => {
    if (user.isLoggedIn) {
      dispatch(addToCart(product));  
    } else { 
      alert("Please login to add items to your cart");
      navigate("/login");
    }
  }

  return (
    <>
      <NavigationBar />
      <Container className="col-12 pt-5">
        <h3>Products</h3>
        <Row>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && productList.map((product) => (
            <Col key={product.product_id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>${product.price.toFixed(2)}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="outline-success" onClick={() => handleAddShoppingCart({...product, id: Date.now()})}>
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default ProductList;
