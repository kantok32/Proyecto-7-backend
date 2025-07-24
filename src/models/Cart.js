const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'La cantidad debe ser al menos 1'],
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  _id: false,
  // Campo virtual para el subtotal de cada item
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

itemSchema.virtual('subtotal').get(function() {
  return this.quantity * this.price;
});


const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  items: [itemSchema],
  total: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Método para recalcular el total del carrito
cartSchema.methods.calculateTotal = function() {
  this.total = this.items.reduce((acc, item) => acc + item.subtotal, 0);
  return this.total;
};

// Middleware para recalcular el total antes de guardar
cartSchema.pre('save', function(next) {
  this.calculateTotal();
  next();
});

module.exports = mongoose.model('Cart', cartSchema); 