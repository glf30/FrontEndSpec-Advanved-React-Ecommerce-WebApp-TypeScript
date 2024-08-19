import { createContext, Dispatch, SetStateAction } from "react";

// Define the User interface to describe the user structure
interface User {
  username: string;
  customer_id: string;
  account_id: string;
  isLoggedIn: boolean;
}

// Define the UserContext type that includes both the user and the function to update it
interface UserContextType {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

// Initial state of UserContext
const initialUserState: User = {
  username: "",
  customer_id: "",
  account_id: "",
  isLoggedIn: false,
};

// Create the UserContext with initial state and types
const UserContext = createContext<UserContextType>({
  user: initialUserState,
  setUser: () => {}, // This will be replaced by the actual function in the provider
});

export default UserContext;
