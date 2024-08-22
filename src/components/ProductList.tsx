import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { addToCart } from "../features/shoppingCartSlice";
import { useDispatch } from "react-redux";
import UserContext from "../context/UserContext";
import NavigationBar from "./Navbar";
import { useGetProducts } from "../hooks/useGetProducts";
import { Product } from "../interface/types";


const ProductList = () => {
  // Database User
  const { databaseuser } = useContext(UserContext);

  // State for list of products
  const [productList, setProductList] = useState<Product[]>([]);

  //setting up hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // assigning the things returned by useGetProducts
  const { fetchProducts, products, loading, error } = useGetProducts();

  // Fetch the products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Update the product list when products are fetched
  useEffect(() => {
    if (!loading && !error) {
      setProductList(products);
    }
  }, [loading, error, products]);

  // Verify if they loggedin before letting them add to cart.
  // when dispatching the product add an id to it so that you can find it better when you need to delete it from the cart
  const handleAddShoppingCart = (product: Product) => {
    if (databaseuser.isLoggedIn) {
      dispatch(addToCart({ ...product, id: Date.now().toString() }));
    } else {
      alert("Please login to add items to your cart");
      navigate("/");
    }
  };

  
  return (
    <>
      <NavigationBar />
      <Container className="col-12 pt-5">
        <h3>Products</h3>
        <Row>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!loading &&
            !error &&
            productList.map((product) => (
              <Col key={product.product_id} md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>${product.price.toFixed(2)}</Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="outline-success"
                        onClick={() =>
                          handleAddShoppingCart(product)
                        }
                      >
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
};

export default ProductList;
