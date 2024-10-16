import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    navigate(page);
  };

  return (
    <header>
      <nav>
        <button onClick={() => handleNavigate("/projetos")}>Home</button>
        <button onClick={() => handleNavigate("/projetos")}>
          Projetos em Destaque
        </button>
        <button onClick={() => handleNavigate("/favoritos")}>
          Meus Favoritos
        </button>
      </nav>
    </header>
  );
};

export default Header;
