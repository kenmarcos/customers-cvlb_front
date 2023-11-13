import React from "react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-card">
      <div className="container">
        <p className="py-4 text-center text-sm">
          {new Date().getFullYear()} — Todos os direitos reservados — Grupo CVLB
        </p>
      </div>
    </footer>
  );
};

export default Footer;
