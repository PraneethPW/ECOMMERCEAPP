import React, { useState } from "react";
import ProductsGrid from "./components/ProductsGrid";
import CartView from "./components/CartView";
import CheckoutForm from "./components/CheckoutForm";
import ReceiptModal from "./components/ReceiptModal";

function App() {
  const [cartChanged, setCartChanged] = useState(false);
  const [receipt, setReceipt] = useState(null);

  // Refresh cart after any cart change or checkout
  const handleCartChange = () => setCartChanged(!cartChanged);

  return (
    <div>
      <h1>E-Commerce Cart</h1>
      {/* Products grid at the top */}
      <ProductsGrid onAdd={handleCartChange} />

      {/* Cart and checkout below */}
      <CartView onUpdate={handleCartChange} />
      <CheckoutForm onReceipt={setReceipt} />

      <ReceiptModal receipt={receipt} />
    </div>
  );
}

export default App;
