import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext, { DatabaseUser } from "../context/UserContext";
import { Customer } from "../interface/types";

const useVerifyUserNew = () => {
  const { setDatabaseUser } = useContext(UserContext);
  const { user, isAuthenticated } = useAuth0();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      // if authenticated and we have user data get the customer list and compare the email
      if (isAuthenticated && user) {
        try {
          const response = await axios.get("http://127.0.0.1:5000/customers");
          const customer = response.data.find(
            (customer: Customer) => customer.email === user.email
          );

          let updatedUser: DatabaseUser;
          // if there is a customer set the updated customer to the customer in the dtabase
          if (customer) {
            updatedUser = {
              name: user.name || "",
              customer_id: customer.customer_id,
              isLoggedIn: true,
            };
          } else {
            // if not create a new customer with the information provided by the authentication data
            // const newCustomerResponse = await axios.post(
            //   "http://127.0.0.1:5000/customers",
            //   {
            //     name: user.name || "",
            //     email: user.email || "",
            //     phone: user.phone_number || "111-111-1111",
            //   }
            // );

            const newCustomerResponse = await axios.post(
              "https://backendcore-advanced-flask-api.onrender.com/customers",
              {
                name: user.name || "",
                email: user.email || "",
                phone: user.phone_number || "111-111-1111",
              }
            );

            updatedUser = {
              name: user.name || "",
              customer_id: newCustomerResponse.data.customer_id,
              isLoggedIn: true,
            };
          }
          //either way set the updated customer to the DatabaseUser context and add it to sessionstorage
          setDatabaseUser(updatedUser);
          sessionStorage.setItem("user", JSON.stringify(updatedUser));
        } catch (error) {
          console.error("Error verifying user:", error);
        }
      }
      //Once everything is done set the loading to false
      setLoading(false);
    };

    verifyUser();
  }, [isAuthenticated, user, setDatabaseUser]);

  return loading;
};

export default useVerifyUserNew;


