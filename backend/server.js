const express = require('express');
const cors = require('cors');
const { Client } = require('pg'); // Asegúrate de usar el cliente de PostgreSQL

const app = express();

// Configuración de la base de datos directamente en server.js
const client = new Client({
  host: 'localhost',       // Cambia esto si tu base de datos está en otro servidor
  port: 5432,              // El puerto por defecto de PostgreSQL
  user: 'postgres',        // Tu usuario de la base de datos
  password: 'Miguel02',    // Tu contraseña de la base de datos
  database: 'arkana_store_db',  // El nombre de tu base de datos
});

client.connect()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch((err) => console.error('Error de conexión a la base de datos', err));

// Middleware
app.use(cors());
app.use(express.json()); // Para leer los datos en formato JSON

// Rutas de Productos
// Ruta para obtener todos los productos
app.get('/products', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM products');
    res.json(result.rows); // Devuelve los productos desde la base de datos
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
});

// Ruta para obtener un producto por su ID
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
});

// Ruta para agregar un nuevo producto
app.post('/products', async (req, res) => {
  const { nombre, descripcion, precio, imagen_url } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO products (nombre, descripcion, precio, imagen_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, descripcion, precio, imagen_url]
    );
    res.status(201).json(result.rows[0]); // Devuelve el producto recién creado
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear el producto" });
  }
});

// Ruta para actualizar un producto
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, imagen_url } = req.body;
  try {
    const result = await client.query(
      'UPDATE products SET nombre = $1, descripcion = $2, precio = $3, imagen_url = $4 WHERE id = $5 RETURNING *',
      [nombre, descripcion, precio, imagen_url, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(result.rows[0]); // Devuelve el producto actualizado
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
});

// Ruta para eliminar un producto
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado con éxito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
});

// Rutas del Carrito
// Obtener el carrito
app.get('/cart', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM cart');
    res.json(result.rows);  // Devuelve los productos del carrito
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener el carrito" });
  }
});

// Agregar producto al carrito
app.post('/cart', async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO cart (product_id, quantity) VALUES ($1, $2) RETURNING *',
      [productId, quantity]
    );
    res.status(201).json(result.rows[0]);  // Devuelve el producto agregado al carrito
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al agregar el producto al carrito" });
  }
});

// Eliminar producto del carrito
app.delete('/cart/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const result = await client.query(
      'DELETE FROM cart WHERE product_id = $1 RETURNING *',
      [productId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado en el carrito" });
    }
    res.json({ message: "Producto eliminado del carrito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al eliminar el producto del carrito" });
  }
});

// Configura el puerto y corre el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
