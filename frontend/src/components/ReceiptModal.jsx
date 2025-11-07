import React from "react";

function ReceiptModal({ receipt }) {
  if (!receipt) return null;
  return (
    <div className="modal">
      <h2>Receipt</h2>
      <p>Total: ₹{receipt.total}</p>
      <p>Timestamp: {new Date(receipt.timestamp).toLocaleString()}</p>
    </div>
  );
}

export default ReceiptModal;
