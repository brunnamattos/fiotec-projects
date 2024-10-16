import React from "react";
import { useNavigate } from "react-router-dom";
import { useProjetos } from "../../context/ProjetosContext";

export const Card = ({ projeto }) => {
  const { toggleFavorite } = useProjetos();
  const navigate = useNavigate();

  const handleFavoriteToggle = () => {
    toggleFavorite(projeto.id);
  };

  const handleView = () => {
    navigate(`/projetos/${projeto.id}`);
  };

  return (
    <div>
      <img src={projeto.image} alt={projeto.title} />
      <h3>{projeto.title}</h3>
      <p>{projeto.description}</p>
      <button onClick={handleView}>Visualizar</button>
      <button onClick={handleFavoriteToggle}>
        {projeto.favorite ? "Desfavoritar" : "Favoritar"}
      </button>
    </div>
  );
};
