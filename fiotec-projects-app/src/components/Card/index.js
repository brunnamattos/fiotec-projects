import React from "react";
import { useProjetos } from "../../context/ProjetosContext";

const Card = ({ projeto }) => {
  const { toggleFavorite } = useProjetos();

  const handleFavoriteToggle = () => {
    toggleFavorite(projeto.id);
  };

  return (
    <div>
      <img src={projeto.image} alt={projeto.title} />
      <h3>{projeto.title}</h3>
      <p>{projeto.description}</p>
      <button onClick={handleFavoriteToggle}>
        {projeto.favorite ? "Desfavoritar" : "Favoritar"}
      </button>
      <button>Visualizar</button>
    </div>
  );
};

export default Card;