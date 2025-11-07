exports.checkout = async (req, res) => {
    const { cartItems } = req.body;
    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
    res.json({ total, timestamp: Date.now() });
  };
  