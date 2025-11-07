require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
// Middleware for mock user authentication
const User = require('./models/User');
const mockUserMiddleware = async (req, res, next) => {
  let user = await User.findOne();
  if (!user) user = await User.create({ name: 'Demo User', email: 'demo@demo.com' });
  req.user = user;
  next();
};

const app = express();
connectDB();
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(mockUserMiddleware);

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
