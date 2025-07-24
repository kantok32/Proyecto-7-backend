
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/database');
const User = require('../models/User');
const Product = require('../models/Product');

// Cargar variables de entorno del archivo raíz
dotenv.config({ path: `${__dirname}/../../.env` });

const seedProducts = async () => {
  await connectDB();

  try {
    // 1. Buscar o crear un usuario administrador
    let adminUser = await User.findOne({ email: 'admin@example.com' });

    if (!adminUser) {
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123', // La contraseña será hasheada por el hook pre-save
        role: 'admin',
      });
      console.log('Usuario administrador creado.');
    } else {
      console.log('Usuario administrador ya existe.');
    }

    // 2. Definir los datos de las alfombras
    const carpets = [
      {
        name: 'Alfombra Persa Clásica',
        description: 'Una hermosa alfombra persa tejida a mano con patrones tradicionales.',
        price: 499.99,
        stock: 15,
        imageUrl: 'https://images.pexels.com/photos/565324/pexels-photo-565324.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Alfombras',
        createdBy: adminUser._id,
      },
      {
        name: 'Alfombra Moderna Geométrica',
        description: 'Alfombra de estilo moderno con un diseño geométrico audaz en blanco y negro.',
        price: 249.50,
        stock: 30,
        imageUrl: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Alfombras',
        createdBy: adminUser._id,
      },
      {
        name: 'Alfombra de Yute Natural',
        description: 'Alfombra ecológica hecha de yute 100% natural, perfecta para un look rústico.',
        price: 129.00,
        stock: 50,
        imageUrl: 'https://images.pexels.com/photos/6585620/pexels-photo-6585620.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Alfombras',
        createdBy: adminUser._id,
      },
        {
        name: 'Alfombra Shaggy de Pelo Largo',
        description: 'Extremadamente suave y cómoda, esta alfombra shaggy es ideal para salones y dormitorios.',
        price: 199.99,
        stock: 25,
        imageUrl: 'https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Alfombras',
        createdBy: adminUser._id,
      }
    ];

    // 3. Limpiar los productos existentes de la categoría "Alfombras"
    await Product.deleteMany({ category: 'Alfombras' });
    console.log('Alfombras antiguas eliminadas.');

    // 4. Insertar las nuevas alfombras
    await Product.insertMany(carpets);
    console.log('¡Nuevas alfombras insertadas con éxito!');

    process.exit();
  } catch (error) {
    console.error(`Error durante el sembrado: ${error}`);
    process.exit(1);
  }
};

// Ejecutar la función de sembrado
seedProducts(); 