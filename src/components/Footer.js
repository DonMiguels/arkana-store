import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light py-3 mt-5">
      <div className="container text-center">
        <p>&copy; 2024 ArkanaStore. Todos los derechos reservados.</p>
        <p>
          <a href="/about" className="text-decoration-none">Acerca de</a> | 
          <a href="/contact" className="text-decoration-none">Contacto</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
