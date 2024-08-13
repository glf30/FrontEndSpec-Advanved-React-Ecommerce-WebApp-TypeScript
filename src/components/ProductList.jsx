import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { addToCart } from "../features/shoppingCartSlice";
import { useDispatch } from "react-redux";

const ProductList = () => {
  const [products, setProducts] = useState([]); 
  const navigate = useNavigate(); 

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/products'); 
      setProducts(response.data);
    } catch (error)  {
      console.log("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProducts(); 
  }, []);

//   const deleteProduct = async (product_id) => {
//     const confirmed = window.confirm("Are you sure you want to delete this product?");
//     if (!confirmed) return;
//     try {
//       await axios.delete(`http://127.0.0.1:5000/products/${product_id}`)
//       fetchProducts(); 
//     } catch (error) {
//       console.log(`Error deleting products ${products}`)
//     }
//   }
const dispatch = useDispatch();

const handleAddShoppingCart = (product) => {
  dispatch(addToCart(product));  
}


  return (
    <Container className="col-8 pt-5">
      <h3>Products</h3>
      <Row>
        {products.map((product) => (
          <Col key={product.product_id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price.toFixed(2)}</Card.Text>
                <div className="d-flex justify-content-between">
                  {/* <Button variant="outline-primary">
                    {/* <Link to={`/product-edit/${product.product_id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      Edit
                    </Link>
                  </Button>
                  <Button variant="outline-danger" onClick={() => deleteProduct(product.product_id)}>
                    Delete
                  </Button> */} 
                  <Button variant="success" onClick={() => handleAddShoppingCart({...product, id: Date.now()})}>
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;