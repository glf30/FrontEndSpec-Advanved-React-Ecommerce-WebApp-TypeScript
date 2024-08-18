import { createContext } from "react";

// Setting up the initial state of UserContext
const UserContext = createContext({
  user: {
    username: "",
    customer_id: "",
    account_id: "",
    isLoggedIn: false,
  },
  setUser: () => {},
});

export default UserContext;
