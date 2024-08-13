import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { Container } from "react-bootstrap";
import Login from "./Login";
import NavigationBar from "./NavBar";
import ProductList from "./ProductList";
import AccountDetails from "./AccountDetails";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    
    <>
    <NavigationBar/>
    <Container>
      <h1>Waelcome {user.username}</h1>
      <h1>Customer ID {user.customer_id}</h1>
      <h1>Account ID {user.account_id}</h1>

      <p>
        Your are now{" "}
        {user.isLoggedIn ? "Your are logged in" : "You are logged out"}
      </p>
    </Container>
    <ProductList />
    </>
  );
};

export default Home;
