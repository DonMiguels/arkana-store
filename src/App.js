import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails'; // Importar la nueva página

const App = () => {
  return (
    <Router>
      <div className="App">
        

        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Página principal */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetails />} /> {/* Nueva ruta */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>

        <Footer /> {/* Agregar el Footer */}
      </div>
    </Router>
  );
};

export default App;
