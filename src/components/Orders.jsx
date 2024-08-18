import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useGetProducts } from "../hooks/useGetProducts";
import { Card, Container, Row, Col } from "react-bootstrap";
import NavigationBar from "./NavBar";

const Orders = () => {
  // User
  const { user } = useContext(UserContext);
  // Set up the initial ordfers the filtered list and the products associated
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [productList, setProductList] = useState([]);
  // Hook to get the products
  const { fetchProducts, products, loading, error } = useGetProducts();

  // First fetch the orders
  useEffect(() => {
    fetchOrders();
  }, []);
  
  //Set the orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/orders");
      setOrders(response.data);
      console.log("Orders fetched:", response.data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  // if the orders are fetched filter them by the the customers id
  useEffect(() => {
    const filtered = orders.filter(
      (order) => order.customer_id === user.customer_id
    );
    setFilteredOrders(filtered);
  }, [orders, user.customer_id]);



  //fetch and set the products list
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      setProductList(products);
    }
  }, [products, loading, error]);

  // Gets the product by id from the product list
  const getProductById = (productId) => {
    return productList.find((product) => product.product_id === productId);
  };


  return (
    <>
      <NavigationBar />
      <Container className="shadow mt-5 rounded-5 p-5"> 
        <h3 className="text-center pb-3">Orders</h3>
        <Row>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <Col key={index} md={6} lg={4} className="mb-4" xs={12}>
                <Card>
                  <Card.Body>
                    <Card.Title>Order ID: {order.order_id}</Card.Title>
                    <Card.Subtitle 
                      className="mb-2 text-muted" 
                      style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      Customer: {user.username}
                    </Card.Subtitle>
                    <Card.Text>Order Date: {order.date || "N/A"}</Card.Text>

                    <Card.Text>Products:</Card.Text>
                    {/* Maps through the order to get the product ids in the list then 
                    matches those product ids to the product and returns the prodct name to be displayed */}
                    {order.products.length > 0 ? (
                      order.products.map((productId) => {
                        const product = getProductById(productId);
                        return (
                          <div key={product.product_id}>
                            <Card.Text>- {product.name}</Card.Text>
                          </div>
                        );
                      })
                    ) : (
                      <Card.Text>No products found.</Card.Text>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Card.Text>No orders found.</Card.Text>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Orders;
