import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import NavigationBar from "./NavBar";
import { Button, Card, Container, Modal, Form } from "react-bootstrap";
import ShoppingCart from "./ShoppingCart";

const AccountDetails = () => {
  const { user } = useContext(UserContext);
  const [customer, setCustomer] = useState({});
  const [account, setAccount] = useState({});
  const [showEditCustomerModal, setShowEditCustomerModal] = useState(false);
  const [showEditAccountModal, setShowEditAccountModal] = useState(false);
  const [customerName, setCustomerName] = useState(customer.name);
  const [customerEmail, setCustomerEmail] = useState(customer.email);
  const [customerPhone, setCustomerPhone] = useState(customer.phone);
  const [username, setUsername] = useState(account.username);
  const [password, setPassword] = useState("");

  const fetchCustomer = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
      setCustomer(response.data);
    } catch (error) {
      console.log("Error fetching Customer:", error);
    }
  };

  const fetchAccount = async (id) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/customeraccounts/${id}`
      );
      setAccount(response.data);
    } catch (error) {
      console.log("Error fetching Account:", error);
    }
  };

  useEffect(() => {
    fetchCustomer(user.customer_id);
    fetchAccount(user.account_id);
  }, []);

  const handleEditCustomer = () => setShowEditCustomerModal(true);
  const handleCloseEditCustomer = () => setShowEditCustomerModal(false);

  const handleEditAccount = () => setShowEditAccountModal(true);
  const handleCloseEditAccount = () => setShowEditAccountModal(false);

  
  const handleCustomerSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.put(`http://127.0.0.1:5000/customers/${user.customer_id}`, {
            name: customerName,
            email: customerEmail,
            phone: customerPhone
        });
        console.log('Customer updated successfully:', response.data);

        setCustomerName('');
        setCustomerEmail('');
        setCustomerPhone('');
        handleCloseEditCustomer();
    } catch (error) {
        console.error('There was an error updating the customer!', error);
    }
};

const handleAccountSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.put(`http://127.0.0.1:5000/customeraccounts/${user.account_id}`, {
            username: username,
            password: password,
            customer_id: user.customer_id
        });
        console.log('Customer account updated successfully:', response.data);

        setUsername('');
        setPassword('');
        setCustomerId('');
        handleCloseEditAccount();
    } catch (error) {
        console.error('There was an error updating the customer account!', error);
    }
};
  
  
  return (
    <>
      <NavigationBar />
      <Container className="d-flex justify-content-center mt-5">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Account Details</Card.Title>
            <Card.Text>
              <p>
                <strong>Name:</strong> {customer.name}
              </p>
              <p>
                <strong>Email:</strong> {customer.email}
              </p>
              <p>
                <strong>Phone:</strong> {customer.phone}
              </p>
              <p>
                <strong>Username:</strong> {account.username}
              </p>
            </Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between">
            <Button variant="primary" onClick={handleEditCustomer}>
              Edit Customer
            </Button>
            <Button variant="secondary" onClick={handleEditAccount}>
              Edit Account
            </Button>
          </Card.Footer>
        </Card>

        {/* Edit Customer Modal */}
        <Modal
          show={showEditCustomerModal}
          onHide={handleCloseEditCustomer}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCustomerSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={customer.name ? customer.name : "Enter name"}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={customer.email ? customer.email : "Enter Email"}
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={customer.phone ? customer.phone : "Enter #"}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Edit Account Modal */}
        <Modal
          show={showEditAccountModal}
          onHide={handleCloseEditAccount}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAccountSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={account.username ? account.username : "Enter Username"}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>

      <ShoppingCart/>
    </>
  );
};

export default AccountDetails;
