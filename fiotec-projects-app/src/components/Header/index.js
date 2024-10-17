import React from "react";
import logo from "../../assets/images/logo.png";
import user_icon from "../../assets/images/user_icon.png";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (page) => {
    navigate(page);
  };

  return (
    <header className="navbar">
      <nav className="navbar-content">
        <img
          src={logo}
          onClick={() => handleNavigate("/projetos")}
          alt="Fiotec Logo"
          className="navbar-logo"
        />
        <div className="btns-navbar">
          <button
            className="btn-navbar"
            onClick={() => handleNavigate("/projetos")}
          >
            Home
          </button>
          <button
            onClick={() => handleNavigate("/projetos")}
            className={`btn-navbar ${
              location.pathname === "/projetos" ? "active-navbar" : ""
            }`}
          >
            Projetos em Destaque
          </button>
          <button
            onClick={() => handleNavigate("/favoritos")}
            className={`btn-navbar ${
              location.pathname === "/favoritos" ? "active-navbar" : ""
            }`}
          >
            Meus Favoritos
          </button>
        </div>
        <div className="navbar-user-icon">
          <img className="user-icon" src={user_icon} alt="User" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
