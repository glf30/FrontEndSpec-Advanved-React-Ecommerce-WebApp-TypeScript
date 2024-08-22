import { useContext } from "react";
import { Navbar, Container, Button, Dropdown, Badge, Spinner, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import image from "../assets/images/logo.webp";
import UserContext from "../context/UserContext";
import { Cart } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import useVerifyUserNew from "../hooks/useVerifyUserNew";

function NavigationBar() {

  // The hook returns loading until the database user is set then it returns the database user.
  // was having issues with it loading the login button cuz it would render before the the home page before it set the context
  const loading = useVerifyUserNew();

  // DatabaseUser Info
  const { databaseuser } = useContext(UserContext);
  
  // Get the item total for display in the cart
  const { totalItems } = useSelector((state: RootState) => state.shoppingCart);
  
  // Hook set up
  const navigate = useNavigate();

  if (loading) {
    return <Spinner animation="grow" variant="info" />;  
  }
  
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
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
          </Nav>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse
            id="navbar-nav"
            className="justify-content-end align-items-center"
          >
            {databaseuser.isLoggedIn && (
              <>
                {/* Cart Icon and Badge */}
                <div
                  className="d-flex align-items-center me-3"
                  onClick={() => navigate("/cart", { replace: true })}
                >
                  <Badge bg="secondary" className="me-2">
                    {totalItems}
                  </Badge>
                  <Cart />
                </div>
              </>
            )}

            {databaseuser.isLoggedIn ? (
              <>
                {/* Dropdown for logged-in user */}
                <Dropdown align="end" className="me-3">
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {databaseuser.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() =>
                        navigate("/profile", { replace: true })
                      }
                    >
                      Account Details
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => navigate("/orders", { replace: true })}
                    >
                      Orders
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <LogoutButton/>
              </>
            ) : (
              <>
                <LoginButton/>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;

