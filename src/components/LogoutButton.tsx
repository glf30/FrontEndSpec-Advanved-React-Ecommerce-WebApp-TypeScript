import  { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import UserContext, { initialUserState } from "../context/UserContext";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { setDatabaseUser } = useContext(UserContext);

  const handleLogout = () => {
    // Clear the user context and session storage
    setDatabaseUser(initialUserState);
    sessionStorage.removeItem("user");

    // Log the user out and redirect to the homepage
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <Button variant="outline-danger" onClick={handleLogout}>
      Log Out
    </Button>
  );
};

export default LogoutButton;