import React, { useCallback } from 'react'
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart } from '../features/shoppingCartSlice';


const ShoppingCart = () => {
  const { shoppingCart } = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
    
  
  const handleRemoveFromCart = useCallback((product) => {
        dispatch(removeFromCart(product));
    }, [dispatch]);
  
    return (
    <div>
      <Container className="col-8 pt-5">
        <h3>Shopping Cart</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shoppingCart.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>${(product.price * product.quantity).toFixed(2)}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleRemoveFromCart(product)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </div>
  )
}

export default ShoppingCart

