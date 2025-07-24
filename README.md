# Backend para E-commerce

Este repositorio contiene el código del backend para una aplicación de e-commerce completa y funcional. Ha sido desarrollado con Node.js, Express y MongoDB, siguiendo las mejores prácticas de la industria para crear una API RESTful robusta, segura y escalable.

El proyecto cumple con todos los requisitos solicitados, implementando un sistema completo de autenticación, gestión de productos, un carrito de compras optimizado y un flujo de pago seguro integrado con Stripe.

## ✨ Características Principales

-   **Autenticación Segura:** Sistema de registro y login basado en JWT (JSON Web Tokens). Las contraseñas se almacenan hasheadas con `bcryptjs`. El login es flexible y permite al usuario autenticarse con su email o su nombre de usuario.
-   **Autorización Basada en Roles:** Middleware implementado para restringir el acceso a ciertas rutas solo a usuarios con roles específicos (ej: administradores).
-   **Gestión de Carrito de Compras:** Un sistema de carrito de compras eficiente donde todos los cálculos de subtotales y totales se realizan en el servidor para garantizar la integridad de los datos.
-   **Pasarela de Pagos con Stripe:** Integración segura con Stripe para procesar pagos con tarjeta. El flujo de pago desacoplado (creación de `PaymentIntent` y confirmación) asegura que los datos sensibles nunca tocan el servidor, cumpliendo con los estándares de seguridad.
-   **Subida de Imágenes:** Endpoint dedicado para la subida de imágenes de productos, utilizando `multer` para la gestión de archivos y `sharp` para la optimización y redimensionamiento de imágenes.
-   **Base de Datos Optimizada:** Uso de Mongoose para definir esquemas de datos claros, con lógica de negocio (métodos y campos virtuales) implementada directamente en los modelos para mayor eficiencia.

## 🛠️ Stack Tecnológico

| Área          | Tecnología                                                               |
|---------------|--------------------------------------------------------------------------|
| **Backend**   | Node.js, Express.js, Mongoose, JWT, bcryptjs, Stripe, Multer, Sharp      |
| **Base de Datos** | MongoDB (a través de MongoDB Atlas)                                       |
| **Desarrollo**| `nodemon` para recarga en caliente, `dotenv` para gestión de entorno.      |

## 🚀 Cómo Empezar

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

### Prerrequisitos

-   Node.js (v14 o superior)
-   npm
-   Una cuenta de MongoDB Atlas
-   Una cuenta de Stripe

### Guía de Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone <url_del_repositorio>
    cd backend
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Crea el archivo de variables de entorno:**
    Crea un archivo llamado `.env` en la raíz de la carpeta `backend` y añade las siguientes variables. Reemplaza los valores con tus propias claves.

    ```env
    # Configuración del Servidor
    PORT=5000

    # Base de Datos
    MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>...

    # Autenticación
    JWT_SECRET=un_secreto_muy_largo_y_dificil_de_adivinar

    # Stripe
    STRIPE_SECRET_KEY=sk_test_...
    ```

4.  **Puebla la base de datos (Opcional pero recomendado):**
    Para tener productos de ejemplo, ejecuta el script de siembra.
    ```bash
    npm run seed
    ```

5.  **Ejecuta el servidor en modo de desarrollo:**
    El servidor se iniciará en `http://localhost:5000` y se reiniciará automáticamente con cada cambio.
    ```bash
    npm run dev
    ```

6.  **Ejecuta el servidor en modo de producción:**
    ```bash
    npm start
    ```

## ☁️ Despliegue

El proyecto está listo para ser desplegado en plataformas como **Railway**, Vercel o Heroku.

-   Asegúrate de que tu código esté en un repositorio de GitHub.
-   Conecta tu repositorio a la plataforma de despliegue que elijas.
-   **Muy importante:** Configura las mismas variables de entorno que tienes en tu archivo `.env` en la sección de "Variables" o "Secrets" de tu plataforma de despliegue.

---

Este proyecto ha sido construido no solo para cumplir con los requisitos funcionales, sino también para servir como una base sólida y un ejemplo de las mejores prácticas en el desarrollo de backends modernos. 