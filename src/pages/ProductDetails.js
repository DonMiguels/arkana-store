import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductDetails.css'; 

const ProductDetails = () => {
  const { productId } = useParams(); // Obtener el ID del producto de la URL
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener detalles del producto por ID
    fetch(`http://localhost:5000/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error al obtener el producto:', error));
  }, [productId]);

  const handleDelete = () => {
    // Llamada al backend para eliminar el producto
    fetch(`http://localhost:5000/products/${productId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          alert('Producto eliminado exitosamente');
          navigate('/products'); // Redirige a la lista de productos
        } else {
          alert('Error al eliminar el producto');
        }
      })
      .catch((error) => console.error('Error al eliminar el producto:', error));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    // Llamada al backend para actualizar el producto
    fetch(`http://localhost:5000/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) {
          alert('Producto actualizado exitosamente');
          setIsEditing(false);
        } else {
          alert('Error al actualizar el producto');
        }
      })
      .catch((error) => console.error('Error al actualizar el producto:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  if (!product) {
    return <p>Cargando producto...</p>; // Mensaje mientras se cargan los datos
  }

  return (
    <div className="product-details">
      <h1>Detalles del Producto</h1>
      {isEditing ? (
        <form onSubmit={handleEdit}>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={product.nombre}
              onChange={handleChange}
            />
          </label>
          <label>
            Descripción:
            <textarea
              name="descripcion"
              value={product.descripcion}
              onChange={handleChange}
            />
          </label>
          <label>
            Precio:
            <input
              type="number"
              name="precio"
              value={product.precio}
              onChange={handleChange}
            />
          </label>
          <label>
            Imagen URL:
            <input
              type="text"
              name="imagen_url"
              value={product.imagen_url}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancelar
          </button>
        </form>
      ) : (
        <div className="product-info">
          <img src={product.imagen_url} alt={product.nombre} />
          <h2>{product.nombre}</h2>
          <p>{product.descripcion}</p>
          <p>${product.precio}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={handleDelete}>Eliminar</button>
          <button onClick={() => navigate('/products')}>Volver</button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
