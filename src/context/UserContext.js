import { createContext } from "react";

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
