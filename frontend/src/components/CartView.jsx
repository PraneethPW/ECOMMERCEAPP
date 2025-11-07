import React, { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../api/api";

function CartView({ onUpdate }) {
  const [cart, setCart] = useState({ items: [], total: 0 });

  useEffect(() => {
    getCart().then(setCart);
  }, [onUpdate]);

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.items.map(item => (
          <li key={item.product._id}>
            {item.product.name} × {item.qty} = ₹{item.product.price * item.qty}
            <button onClick={() => { removeFromCart(item.product._id); onUpdate(); }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h3>Total: ₹{cart.total}</h3>
    </div>
  );
}

export default CartView;
