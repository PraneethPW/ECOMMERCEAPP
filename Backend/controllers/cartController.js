const Cart = require('../models/Cart');

// Get current cart and total for the user
exports.getCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (!cart) {
    // If no cart is found, return empty cart and total
    return res.json({ items: [], total: 0 });
  }
  const total = cart.items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  res.json({ items: cart.items, total });
};

// Add an item/qty to the user's cart
exports.addToCart = async (req, res) => {
  const { productId, qty } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }
  // Try to find the item in the cart
  const item = cart.items.find(i => i.product.toString() === productId);
  if (item) {
    item.qty += qty;
  } else {
    cart.items.push({ product: productId, qty });
  }
  await cart.save();
  // Populate products for response
  await cart.populate('items.product');
  res.json({ items: cart.items, total: cart.items.reduce((sum, item) => sum + item.product.price * item.qty, 0) });
};

// Remove an item from the cart by product id
exports.removeFromCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    // Cart doesn't exist, nothing to remove
    return res.json({ items: [], total: 0 });
  }
  cart.items = cart.items.filter(item => item.product.toString() !== req.params.id);
  await cart.save();
  // Populate products for response
  await cart.populate('items.product');
  res.json({ items: cart.items, total: cart.items.reduce((sum, item) => sum + item.product.price * item.qty, 0) });
};
