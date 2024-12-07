import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; 

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Obtener productos desde el backend
    fetch('http://localhost:5000/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  return (
    <div className="home-container">
      {/* Botón para el carrito */}
      <Link to="/cart">
        <button className="cart-btn">Carrito</button>
      </Link>

      {/* Sección de bienvenida */}
      <div className="welcome-section">
        <h1 className="welcome-title">Bienvenidos a Arkana Store</h1>
        <p className="welcome-description">
          Encuentra productos de calidad con los mejores precios, ¡explora nuestra tienda!
        </p>
        <Link to="/products">
          <button className="shop-now-btn">Ver Todos los Productos</button>
        </Link>
      </div>

      {/* Sección de productos destacados */}
      <div className="featured-products">
        <h2 className="featured-title">Productos Destacados</h2>
        <div className="featured-grid">
          {products.slice(0, 6).map((product) => (
            <div key={product.id} className="featured-card">
              <img
                src={product.imagen_url}
                alt={product.nombre}
                className="featured-image"
              />
              <div className="featured-info">
                <h3 className="featured-name">{product.nombre}</h3>
                <p className="featured-price">${product.precio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
