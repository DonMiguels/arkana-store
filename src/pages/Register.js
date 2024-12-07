import React, { useState } from 'react';
import api from '../api/axiosConfig';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/register', { email, password });
      console.log('Usuario registrado:', response.data);
      // Redirigir o mostrar mensaje de éxito
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Crear Cuenta</h1>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
