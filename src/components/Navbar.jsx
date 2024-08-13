import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import image from "../assets/images/logo.webp";
import UserContext from "../context/UserContext";

function NavigationBar() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
      setUser({
        username: "",
        customer_id: "",
        account_id: "",
        isLoggedIn: false,
      });
      navigate("/"); // redirect to home page after logout
    };

  return (
    <>

<Navbar className="navbar navbar-expand-lg bg-body-tertiary">
  <Container fluid>
    <Navbar.Brand href="/">
      <img
        alt="Site Logo"
        src={image}
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{" "}
      E-Commerce
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbar-nav" />
    <Navbar.Collapse id="navbar-nav" className="justify-content-end">
      {user.isLoggedIn ? (
        <>
          <Dropdown align="end" className="me-3">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {user.username}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("account-details")}>
                Account Details
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("orders")}>
                Orders
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button onClick={handleLogout} variant="outline-danger" className="me-2">
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() => navigate("login")} variant="outline-success" className="me-2">
            Login
          </Button>
          <Button onClick={() => navigate("create-user")} variant="outline-primary">
            Create User
          </Button>
        </>
      )}
    </Navbar.Collapse>
  </Container>
</Navbar>

    </>
  );
}

export default NavigationBar;