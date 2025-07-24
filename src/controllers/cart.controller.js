const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Función para obtener o crear un carrito
const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [], total: 0 });
  }
  return cart;
};

// Obtener el carrito del usuario
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate({
      path: 'items.product',
      select: 'name imageUrl' // Solo seleccionamos los campos necesarios
    });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Carrito no encontrado' });
    }
    
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error del servidor', error: error.message });
  }
};

// Añadir o actualizar un item en el carrito
exports.upsertItemInCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  if (quantity <= 0) {
    return exports.removeItemFromCart(req, res);
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }
    if (product.stock < quantity) {
        return res.status(400).json({ success: false, message: 'Stock insuficiente' });
    }

    const cart = await getOrCreateCart(userId);

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      cart.items.push({ product: productId, quantity, price: product.price });
    }
    
    await cart.save();
    
    // Devolvemos el carrito actualizado y poblado
    const populatedCart = await cart.populate({
        path: 'items.product',
        select: 'name imageUrl'
    });

    res.json({ success: true, data: populatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error del servidor', error: error.message });
  }
};

// Eliminar un item del carrito
exports.removeItemFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return res.status(404).json({ success: false, message: 'Carrito no encontrado' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    
    await cart.save();
    
    const populatedCart = await cart.populate({
        path: 'items.product',
        select: 'name imageUrl'
    });

    res.json({ success: true, data: populatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error del servidor', error: error.message });
  }
};

// Vaciar el carrito
exports.clearCart = async (req, res) => {
  const userId = req.user._id;
  try {
    const cart = await Cart.findOne({ user: userId });
     if (!cart) {
        return res.status(404).json({ success: false, message: 'Carrito no encontrado' });
    }

    cart.items = [];
    await cart.save();
    
    res.json({ success: true, message: 'Carrito vaciado correctamente', data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error del servidor', error: error.message });
  }
}; 