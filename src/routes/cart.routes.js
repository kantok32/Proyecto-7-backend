const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
  getCart,
  upsertItemInCart,
  removeItemFromCart,
  clearCart
} = require('../controllers/cart.controller');

// @desc    Obtener el carrito del usuario
// @route   GET /api/cart
// @access  Private
router.get('/', protect, getCart);

// @desc    Añadir o actualizar un item en el carrito
// @route   POST /api/cart
// @access  Private
router.post('/', protect, upsertItemInCart);

// @desc    Eliminar un item del carrito
// @route   DELETE /api/cart/:productId
// @access  Private
router.delete('/:productId', protect, removeItemFromCart);

// @desc    Vaciar todo el carrito
// @route   DELETE /api/cart/clear
// @access  Private
router.delete('/clear', protect, clearCart);

module.exports = router; 