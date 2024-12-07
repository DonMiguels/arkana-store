import React, { useContext } from 'react';
import { StoreContext } from '../store/StoreContext';
import '../styles/Cart.css'

const Cart = () => {
  const { cart, setCart } = useContext(StoreContext);

  // Función para eliminar un producto del carrito
  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  return (
    <div className="container mt-5">
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.nombre}</h5>
                  <p>${item.precio} x {item.cantidad}</p>
                </div>
                <button className="btn btn-danger" onClick={() => handleRemove(item.id)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          {/* Botón de pago (sin funcionalidad por ahora) */}
          <div className="mt-3 d-flex justify-content-between">
            <button className="btn btn-primary" onClick={() => {}}>Pagar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
