import { useState } from "react";
import UserContext, { DatabaseUser, initialUserState } from "./context/UserContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotFound from "./components/NotFound";
import store from "./store";
import { Provider } from "react-redux";
import ShoppingCart from "./components/ShoppingCart";
import ProductList from "./components/ProductList";
import Orders from "./components/Orders";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./components/Profile";

function App() {
  const { isAuthenticated } = useAuth0();
  const [databaseuser, setDatabaseUser] = useState<DatabaseUser>(() => {
    let currentUser = sessionStorage.getItem("user");
    return currentUser
      ? JSON.parse(currentUser)
      : initialUserState;
  });

  

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <UserContext.Provider value={{ databaseuser, setDatabaseUser }}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </UserContext.Provider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;


