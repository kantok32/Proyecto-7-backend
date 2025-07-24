const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Crear una nueva intención de pago con Stripe
// @route   POST /api/orders/create-payment-intent
// @access  Private
exports.createPaymentIntent = async (req, res) => {
  try {
    // 1. Obtener el carrito del usuario para saber el total
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Tu carrito está vacío' });
    }

    // El total ya está calculado y guardado en el modelo del carrito
    const totalAmount = cart.total;

    // 2. Crear el Payment Intent en Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Stripe requiere el monto en centavos
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    // 3. Enviar el client_secret al frontend
    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear la intención de pago', error: error.message });
  }
};


// @desc    Crear una nueva orden después de un pago exitoso
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
    const { shippingAddress, paymentIntentId } = req.body;
  
    try {
      // 1. Verificar el estado del Payment Intent con Stripe
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (paymentIntent.status !== 'succeeded') {
        return res.status(400).json({ success: false, message: 'El pago no se ha completado.' });
      }

      // 2. Obtener el carrito para convertirlo en una orden
      const cart = await Cart.findOne({ user: req.user._id });
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ success: false, message: 'No se puede crear una orden con un carrito vacío.' });
      }

      // 3. Crear la nueva orden en la base de datos
      const order = await Order.create({
        user: req.user._id,
        items: cart.items,
        totalAmount: cart.total,
        shippingAddress: shippingAddress,
        paymentDetails: {
            paymentId: paymentIntent.id,
            status: paymentIntent.status,
            paymentMethod: paymentIntent.payment_method_types[0]
        }
      });

      // 4. Vaciar el carrito del usuario
      cart.items = [];
      cart.total = 0;
      await cart.save();

      res.status(201).json({ success: true, data: order });

    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear la orden', error: error.message });
    }
};

// @desc    Obtener las órdenes del usuario logueado
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json({ success: true, count: orders.length, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener las órdenes', error: error.message });
    }
}; 