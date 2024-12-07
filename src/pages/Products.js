import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Products.css'; 

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const navigate = useNavigate(); // Hook para manejar la navegación

  useEffect(() => {
    // Hacer una solicitud GET al backend para obtener los productos
    fetch('http://localhost:5000/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  // Función para manejar la redirección al home
  const handleBackClick = () => {
    navigate('/'); // Redirige a la página principal (Home)
  };

  // Función para manejar el carrito
  const handleCartClick = () => {
    navigate('/cart'); // Redirige al carrito
  };

  // Función para redirigir a la página de detalles del producto
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`); // Redirige a la página de detalles del producto
  };

  // Filtrar productos por nombre según el término de búsqueda
  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) // Comparar sin distinción entre mayúsculas y minúsculas
  );

  return (
    <div className="products-container">
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar producto..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado con el valor de la barra de búsqueda
      />
      
      {/* Botón de Volver */}
      <button className="back-btn" onClick={handleBackClick}>
        Volver
      </button>

      <h1 className="title">Listado de Productos</h1>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProductClick(product.id)} // Redirige al hacer clic en el producto
          >
            <img
              src={product.imagen_url} 
              alt={product.nombre}
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-name">{product.nombre}</h3>
              <p className="product-description">{product.descripcion}</p>
              <p className="product-price">${product.precio}</p>
              <button
                className="add-to-cart-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Evita que el clic en el botón también abra la página de detalles
                  console.log(`Producto ${product.id} agregado al carrito`);
                }}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Nuevo botón Carrito */}
      <button className="cart-btn" onClick={handleCartClick}>
        Carrito
      </button>
    </div>
  );
}

export default Products;
