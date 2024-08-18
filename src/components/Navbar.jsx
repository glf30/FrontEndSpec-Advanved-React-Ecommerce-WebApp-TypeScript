import React, { useContext } from "react";
import { Navbar, Container, Button, Dropdown, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import image from "../assets/images/logo.webp";
import UserContext from "../context/UserContext";
import { Cart } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/shoppingCartSlice";

function NavigationBar() {
  // User Info
  const { user, setUser } = useContext(UserContext);
  // Get the item total for display in the cart
  const { totalItems } = useSelector((state) => state.shoppingCart);
  //hook set up
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Logout function to clear the user context, remove session user redirect to the home page
  const handleLogout = () => {
    setUser({
      username: "",
      customer_id: "",
      account_id: "",
      isLoggedIn: false,
    });
    sessionStorage.removeItem("user");
    dispatch(clearCart());
    navigate("/", { replace: true });
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
          <Navbar.Collapse
            id="navbar-nav"
            className="justify-content-end align-items-center"
          >
            {user.isLoggedIn && (
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

            {user.isLoggedIn ? (
              <>
                {/* Dropdown for logged-in user */}
                <Dropdown align="end" className="me-3">
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {user.username}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() =>
                        navigate("/account-details", { replace: true })
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

                {/* Logout Button */}
                <Button onClick={handleLogout} variant="outline-danger">
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* Login and Create User Buttons */}
                <Button
                  onClick={() => navigate("/login", { replace: true })}
                  variant="outline-success"
                  className="me-2"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/create-user", { replace: true })}
                  variant="outline-primary"
                >
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
