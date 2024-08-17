import React, { useCallback, useContext } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart} from '../features/shoppingCartSlice';
import NavigationBar from './NavBar';
import UserContext from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ShoppingCart = () => {
  const { user  } = useContext(UserContext); 
  const { shoppingCart, totalPrice, totalItems } = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = useCallback((product) => {
    try {
      dispatch(removeFromCart(product));
    } catch (error) {
      console.error('Error removing product from cart:', error);
      // Handle the error here, e.g. show an error message to the user
    }
  }, [dispatch]);

    // Gotta pull the product IDs out of the shopping cart and map them to a product to get the name
    const productIds = shoppingCart.map((item) => item.product_id);

    // Get the current and change the format to make the API happy
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    // At this time you can only add 1 of each product to the order
      const makeOrder = async () => {
      if(productIds.length === 0) {
        alert('Please add items to your cart');
        navigate('/products', { replace: true });
      }else{
        try {
        const response = await axios.post('http://127.0.0.1:5000/orders', {
          customer_id: user.customer_id,
          date: formattedDate,
          product_id: productIds
        });

        alert('Order placed successfully');
        // Clear the cart
        dispatch(clearCart());
        // Navigate to the orders page
        navigate('/orders', { replace: true });
        // console.log(response.data);
      } catch (error) {
        console.error('Error making order:', error);

      }
    }
  }

    
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
              shoppingCart.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveFromCart(product)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  Your cart is empty.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Total Price Section */}
        <div className="d-flex  mt-4">
          <h4>Total: {totalItems}</h4>
        </div>
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

