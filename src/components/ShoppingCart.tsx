import React, { useCallback, useContext } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../features/shoppingCartSlice";
import NavigationBar from "./Navbar";
import UserContext from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { Item } from "../interface/types";

const ShoppingCart = () => {
  // User
  const { databaseuser } = useContext(UserContext);

  // Get the shopping cart from the store
  const { shoppingCart, totalPrice } = useSelector(
    (state: RootState) => state.shoppingCart
  );

  // Set up hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Remove from cart function
  const handleRemoveFromCart = useCallback(
    (item: Item) => {
      try {
        dispatch(removeFromCart(item));
      } catch (error) {
        console.error("Error removing product from cart:", error);
      }
    },
    [dispatch]
  );

  // Get the current date and format it to make the API happy
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  // At this time you can only add 1 of each product to the order API will need to be updated to fix this
  const makeOrder = async () => {
    if (shoppingCart.length === 0) {
      alert("Please add items to your cart");
      navigate("/products", { replace: true });
    } else {
      try {
        const productIds = shoppingCart.map((item: Item) => item.product_id);
        const response = await axios.post("http://127.0.0.1:5000/orders", {
          customer_id: databaseuser.customer_id,
          date: formattedDate,
          product_id: productIds,
        });

        alert("Order placed successfully");
        // Clear the cart
        dispatch(clearCart());
        // Navigate to the orders page
        navigate("/orders", { replace: true });
      } catch (error) {
        console.error("Error making order:", error);
      }
    }
  };

  return (
    <div>
      <NavigationBar />
      <Container className="shopping-cart-container shadow-lg rounded-5 p-4 mt-5 col-6">
        <h3 className="text-center mb-4">Shopping Cart</h3>
        <Table responsive className="mb-0">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(shoppingCart) && shoppingCart.length > 0 ? (
              shoppingCart.map((item: Item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center">
                  Your cart is empty.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Total Price Section */}
        <div className="d-flex justify-content-end mt-4">
          <h4>Total: ${totalPrice.toFixed(2)}</h4>
          <Button variant="primary" className="ms-4" onClick={makeOrder}>
            Checkout
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ShoppingCart;
