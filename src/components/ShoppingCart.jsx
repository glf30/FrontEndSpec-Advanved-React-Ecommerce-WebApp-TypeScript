import React, { useCallback } from 'react'
import { Container, Nav, Table, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart } from '../features/shoppingCartSlice';
import NavigationBar from './NavBar';



const ShoppingCart = () => {
  const { shoppingCart, totalPrice, totalItems } = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
    
  
  const handleRemoveFromCart = useCallback((product) => {
        dispatch(removeFromCart(product));
    }, [dispatch]);
  
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
                <td colSpan="3" className="text-center">Your cart is empty.</td>
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
          <Button variant="primary" className="ms-4">Checkout</Button>
        </div>
      </Container>
    </div>
    );
}

export default ShoppingCart

