// src/components/Header.jsx
import React from "react";
import "./Header.css";

const Header = ({content}) => (
  <header className="header">

    <img src="../src/assets/logo.png" alt="Logo Empresa" className="logo" />
    <h1 className="company-name">{content}</h1>

  </header>
);

export default Header;
