import React, { useContext, useState, useEffect } from 'react';
import { Container, Col, Row, Form, Button, Modal } from 'react-bootstrap';
import { useVerifyUser } from '../hooks/useVerifyUser';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Home from './Home';

const Login = () => {
  const navigate = useNavigate();
  const [inputUsername, setInputUsername] = useState(""); 
  const [inputPassword, setInputPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(true); // Control modal visibility
  
  // Get the trigger function from the hook
  const { verifyUser, verifiedUser, loading, error } = useVerifyUser();

  useEffect(() => {
    if (verifiedUser) {
      const currentUser = { username: verifiedUser.username, customer_id: verifiedUser.customer_id, account_id: verifiedUser.account_id, isLoggedIn: true };
      setUser(currentUser);
      sessionStorage.setItem("user", JSON.stringify(currentUser));
      // console.log(currentUser)
      setShowModal(false); // Close the modal on successful login
      navigate("/");
    }
  }, [verifiedUser, navigate, setUser]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const account = { user: inputUsername, pass: inputPassword };
    await verifyUser(account);
  };

  const handleClose = () => {
    setShowModal(false); // Close the modal
    navigate("/")
  };

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
              <Col className='col-12'>
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
                  {error && <p>{error}</p>}
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

