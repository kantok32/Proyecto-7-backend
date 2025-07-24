const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use('/public', express.static(path.join(__dirname, '../public')));


// Rutas de la API
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/products', require('./routes/products.routes'));
app.use('/api/cart', require('./routes/cart.routes'));
app.use('/api/orders', require('./routes/orders.routes'));
app.use('/api/upload', require('./routes/upload.routes'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`)); 