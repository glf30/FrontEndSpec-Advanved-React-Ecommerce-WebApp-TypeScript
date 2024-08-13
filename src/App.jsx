import { useState } from "react";
import UserContext from "./context/UserContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AccountDetails from "./components/AccountDetails";
import NotFound from "./components/NotFound";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  const [user, setUser] = useState({
    username: "",
    id: "",
    isLoggedIn: false,
  });

  const queryClient = new QueryClient();

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/account-details" element={<AccountDetails />}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </Router>
      </UserContext.Provider>
      </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
