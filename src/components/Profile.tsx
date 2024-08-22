import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "./Navbar";
import { Button, Card, Container, Modal, Form } from "react-bootstrap";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/shoppingCartSlice";
import UserContext from "../context/UserContext";
import { Customer } from "../interface/types";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  //user stuff
  const { databaseuser, setDatabaseUser } = useContext(UserContext);
  const { user, isAuthenticated, isLoading } = useAuth0();

  // Form input states
  const [customerName, setCustomerName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");

  // Set up a customer 
  const [customer, setCustomer] = useState<Customer | null>(null);

  // Modal Control
  const [showEditCustomerModal, setShowEditCustomerModal] = useState<boolean>(false);

  // Hook setup
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // if the context has been set to a customer
  //fetch the rest of thier information fromthe database
  useEffect(() => {
    if (databaseuser.customer_id) {
      fetchCustomer(databaseuser.customer_id);
    }
  }, [databaseuser.customer_id]);

  // fetch the data and set it t the customer state for later use
  const fetchCustomer = async (id: string): Promise<void> => {
    try {
      const response = await axios.get<Customer>(`http://127.0.0.1:5000/customers/${id}`);
      setCustomer(response.data);
    } catch (error) {
      console.log("Error fetching Customer:", error);
    }
  };

  // Modal hanlers
  const handleEditCustomer = () => setShowEditCustomerModal(true);
  const handleCloseEditCustomer = () => setShowEditCustomerModal(false);

  // When the form is submit change customer info
  const handleCustomerSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // const response = await axios.put<Customer>(
      //   `http://127.0.0.1:5000/customers/${databaseuser.customer_id}`,
      //   {
      //     name: customerName,
      //     email: customerEmail,
      //     phone: customerPhone,
      //   }
      // );
      const response = await axios.put<Customer>(
        `https://backendcore-advanced-flask-api.onrender.com/customers/${databaseuser.customer_id}`,
        {
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
        }
      );
      console.log("Customer updated successfully:", response.data);
      // Set te inputs back to empty
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
      handleCloseEditCustomer();
    } catch (error) {
      console.error("There was an error updating the customer!", error);
    }
  };
  // delete the customer and clear all associations
  const deleteCustomer = async (customer_id: string) => {
    console.log(`Deleting customer ${customer_id}...`);
    const confirmed = window.confirm("Are you sure you want to delete this customer?");
    if (!confirmed) return;
    try {
      await axios.delete(`http://127.0.0.1:5000/customers/${customer_id}`);
      console.log(`Customer ${customer_id} deleted successfully`);
      sessionStorage.clear();
      setDatabaseUser({
        name: "",
        customer_id: "",
        isLoggedIn: false,
      });
      sessionStorage.removeItem("user");
      dispatch(clearCart());
      navigate("/", { replace: true });
    } catch (error) {
      console.log(`Error deleting customer ${customer_id}:`, error);
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <NavigationBar />
      <Container className="d-flex justify-content-center mt-5">
        <Card>
          <Card.Img variant="top" src={user?.picture} alt={user?.name} />
          <Card.Body>
            <Card.Title className="text-center">Account Details</Card.Title>
            {isAuthenticated ? (
              <Card.Text>
                <p>
                  <strong>ID:</strong> {customer?.customer_id}
                </p>
                <p>
                  <strong>Name:</strong> {user?.name}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
                <p>
                  <strong>Phone:</strong> {customer?.phone}
                </p>
              </Card.Text>
            ) : (
              <Card.Text className="text-center text-danger">
                Please log in to view your account details.
              </Card.Text>
            )}
          </Card.Body>
          {isAuthenticated && (
            <Card.Footer className="d-flex justify-content-between">
              <Button className="p-2 m-2" variant="primary" onClick={handleEditCustomer}>
                Edit Customer
              </Button>
              <Button
                className="p-2 m-2"
                variant="outline-danger"
                onClick={() => deleteCustomer(customer?.customer_id || "")}
              >
                Delete Account
              </Button>
            </Card.Footer>
          )}
        </Card>
      </Container>

      {/* Edit Customer Modal */}
      <Modal show={showEditCustomerModal} onHide={handleCloseEditCustomer} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCustomerSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={customer?.name || "Enter name"}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder={customer?.email || "Enter Email"}
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder={customer?.phone || "Enter #"}
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Footer />
    </>
  );
};

export default Profile;

