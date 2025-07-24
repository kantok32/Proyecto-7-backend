const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');

const {
  createPaymentIntent,
  createOrder,
  getMyOrders
} = require('../controllers/order.controller');


// @desc    Crear una nueva intención de pago
// @route   POST /api/orders/create-payment-intent
// @access  Private
router.post('/create-payment-intent', protect, createPaymentIntent);

// @desc    Crear una nueva orden
// @route   POST /api/orders
// @access  Private
router.post('/', protect, createOrder);

// @desc    Obtener las órdenes del usuario
// @route   GET /api/orders/my-orders
// @access  Private
router.get('/my-orders', protect, getMyOrders);


module.exports = router; 