import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Modal,
  Alert,
} from "react-bootstrap";
import { useVerifyUser } from "../hooks/useVerifyUser";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const Login: React.FC = () => {
  // Get the user context
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }
  const { setUser } = userContext;

  // Set up the account to be submitted for verification
  const [inputUsername, setInputUsername] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");

  // Modal Toggle and login handler for confirmation
  const [showModal, setShowModal] = useState<boolean>(true); // Control modal visibility
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false); // Track login success

  // Set up navigation hook
  const navigate = useNavigate();

  // Get the trigger function from the hook
  const { verifyUser, verifiedUser, loading, error } = useVerifyUser();

  // Close the modal
  const handleClose = () => {
    setShowModal(false);
    navigate("/");
  };

  // Package the form data and send it to be verified by the hook
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const account = { user: inputUsername, pass: inputPassword };
    try {
      await verifyUser(account);
    } catch (error) {
      console.error(error);
      alert("Error logging in. Please try again later.");
    }
  };

  // Check if the user is verified and set the user context
  useEffect(() => {
    if (verifiedUser) {
      const currentUser = {
        username: verifiedUser.username,
        customer_id: verifiedUser.customer_id,
        account_id: verifiedUser.account_id,
        isLoggedIn: true,
      };
      setUser(currentUser);
      sessionStorage.setItem("user", JSON.stringify(currentUser));
      setLoginSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 1000); // Delay navigation for 1 second to show the success message
    }
  }, [verifiedUser, navigate, setUser]);

  return (
    <>
      <Home />
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid className="p-0">
            <Row className="w-100 justify-content-center">
              <Col className="col-12">
                <Form onSubmit={handleSubmit} className="mt-3">
                  <Form.Group className="mb-3" controlId="formBasicLogin">
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      autoComplete="off"
                      value={inputUsername}
                      onChange={(event) => setInputUsername(event.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicLogin">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      autoComplete="off"
                      value={inputPassword}
                      onChange={(event) => setInputPassword(event.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary" className="w-100">
                    Login
                  </Button>
                  {loading && <p>Loading...</p>}
                  {error && <Alert variant="danger">{error}</Alert>}
                  {loginSuccess && (
                    <Alert variant="success">Logged in successfully!</Alert>
                  )}
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
