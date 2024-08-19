import React, { useContext, useState } from 'react';
import { Container, Col, Row, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Home from './Home';

interface NewAccount {
  username: string;
  password: string;
  customer_id: number;
}

const CreateUser: React.FC = () => {
  // Set up the customer to be submitted
  const [inputName, setInputName] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPhone, setInputPhone] = useState<string>("");

  // Set up the account to be submitted
  const [inputUsername, setInputUsername] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");

  // State to store IDs
  const [customerId, setCustomerId] = useState<string>("");
  const [accountId, setAccountId] = useState<string>("");

  // User Context
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }
  const { setUser } = userContext;

  // Set up the hook for navigation
  const navigate = useNavigate();

  // Modal Control
  const [showModal, setShowModal] = useState<boolean>(true);

  const handleClose = () => {
    setShowModal(false);
    navigate("/");
  };

  // Form submission begins the process of creating a customer and an account separately
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted");

    try {
      // Step 1: Create the customer
      const customerResponse = await axios.post('http://127.0.0.1:5000/customers', {
        name: inputName,
        email: inputEmail,
        phone: inputPhone,
      });
      console.log("Customer created:", customerResponse.data);

      const customerId = customerResponse.data.customer_id; // The API returns the customer_id
      setCustomerId(customerId);

      if (customerId) {
        // If it gets the customer ID, proceed to create the account
        // Step 2: Create the account using input username/password and the stored customer ID
        createAccountMutation.mutate({
          username: inputUsername,
          password: inputPassword,
          customer_id: customerId,
        });
      } else {
        console.error("Failed to retrieve customer ID.");
      }
    } catch (error) {
      console.error("Error during customer creation process:", error);
    }
  };

  // useMutation for creating the account
  const createAccountMutation = useMutation({
    mutationFn: async (newAccount: NewAccount) => {
      const response = await axios.post('http://127.0.0.1:5000/customeraccounts', newAccount);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Account created:", data);
      // API has been set up to return the account_id
      setAccountId(data.account_id);  // Store the account_id in state
      // Set user context and navigate to home
      setUser({
        username: inputUsername,
        customer_id: customerId!,
        account_id: data.account_id,
        isLoggedIn: true,
      });
      sessionStorage.setItem("user", JSON.stringify({ username: inputUsername, customer_id: customerId, account_id: data.account_id, isLoggedIn: true }));
      handleClose(); // Close the modal on success
    },
    onError: (error) => {
      console.error("Error creating account:", error);
    }
  });

  return (
    <>
      <Home />
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid className="p-0">
            <Row className="w-100 justify-content-center">
              <Col className='col-12'>
                <Form onSubmit={handleSubmit} className="mt-3">
                  <Form.Group className="mb-3" controlId="formCreateUser">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      autoComplete="off"
                      value={inputName}
                      onChange={(event) => setInputName(event.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formCreateUser">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      autoComplete="off"
                      value={inputEmail}
                      onChange={(event) => setInputEmail(event.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formCreateUser">
                    <Form.Control
                      type="text"
                      placeholder="Phone"
                      autoComplete="off"
                      value={inputPhone}
                      onChange={(event) => setInputPhone(event.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formCreateUser">
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      autoComplete="off"
                      value={inputUsername}
                      onChange={(event) => setInputUsername(event.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formCreateUser">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      autoComplete="off"
                      value={inputPassword}
                      onChange={(event) => setInputPassword(event.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary" className="w-100">
                    Create Account
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateUser;






