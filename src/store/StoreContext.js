import React, { createContext, useReducer, useContext } from 'react';

// Estado inicial del carrito
const initialState = {
  cart: [],
};

// Reducer para manejar las acciones sobre el carrito
const storeReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.product] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.productId),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
};

// Crear el contexto de la tienda
const StoreContext = createContext();

// Proveedor de contexto
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useStore = () => useContext(StoreContext);

// Si necesitas usar StoreContext directamente, también lo exportamos
export { StoreContext };
