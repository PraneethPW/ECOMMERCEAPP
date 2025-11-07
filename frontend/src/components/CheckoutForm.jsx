import React, { useState } from "react";
import { checkout, getCart } from "../api/api";

function CheckoutForm({ onReceipt }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const cart = await getCart();
    const result = await checkout(cart.items);
    onReceipt(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input required value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Checkout</button>
    </form>
  );
}

export default CheckoutForm;
