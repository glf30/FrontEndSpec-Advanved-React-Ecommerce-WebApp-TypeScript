import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useGetProducts } from "../hooks/useGetProducts";
import { Card, Container, Row, Col } from "react-bootstrap";
import NavigationBar from "./Navbar";
import {Order, Product } from "../interface/types"




const Orders = () => {
  // Database User
  const { databaseuser } = useContext(UserContext);

  // Set up the initial orders, the filtered list, and the products associated
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);

  // Hook to get the products
  const { fetchProducts, products, loading, error } = useGetProducts();

  // First fetch the orders
  useEffect(() => {
    fetchOrders();
  }, []);

  // Set the orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get<Order[]>("http://127.0.0.1:5000/orders");
      setOrders(response.data);
      console.log("Orders fetched:", response.data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  // If the orders are fetched, filter them by the customer's ID
  useEffect(() => {
    const filtered = orders.filter(
      (order) => order.customer_id === databaseuser.customer_id
    );
    setFilteredOrders(filtered);
  }, [orders, databaseuser.customer_id]);

  // Fetch and set the products list
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (!loading && !error) {
      setProductList(products);
    }
  }, [products, loading, error]);

  // Gets the product by ID from the product list
  const getProductById = (productId: string) => {
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
                      Customer: {databaseuser.name}
                    </Card.Subtitle>
                    <Card.Text>Order Date: {order.date || "N/A"}</Card.Text>

                    <Card.Text>Products:</Card.Text>
                    {order.products.length > 0 ? (
                      order.products.map((productId) => {
                        const product = getProductById(productId);
                        return product ? (
                          <div key={product.product_id}>
                            <Card.Text>- {product.name}</Card.Text>
                          </div>
                        ) : (
                          <Card.Text key={productId}>Product not found.</Card.Text>
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

