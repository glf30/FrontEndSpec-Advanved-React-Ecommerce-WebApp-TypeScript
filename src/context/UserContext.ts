import { createContext, Dispatch, SetStateAction } from "react";

export interface DatabaseUser {
  name: string;
  customer_id: string;
  isLoggedIn: boolean;
}

export const initialUserState: DatabaseUser = {
  name: "",
  customer_id: "",
  isLoggedIn: false,
};

const UserContext = createContext<{
  databaseuser: DatabaseUser;
  setDatabaseUser: Dispatch<SetStateAction<DatabaseUser>>;
}>({
  databaseuser: initialUserState,
  setDatabaseUser: () => {}, 
});

export default UserContext;
