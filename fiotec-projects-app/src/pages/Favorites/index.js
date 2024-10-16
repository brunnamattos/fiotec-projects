import React, { useEffect } from "react";
import { useProjetos } from "../../context/ProjetosContext";

export const Favorites = () => {
  const { filteredProjetos, handleFilterChange } = useProjetos();

  useEffect(() => {
    handleFilterChange("Todos");
  }, [handleFilterChange]);

  const favoriteProjects = filteredProjetos.filter(
    (projeto) => projeto.favorite
  );

  return (
    <div>
      {favoriteProjects.length === 0 ? (
        <p>Nenhum projeto favoritado.</p>
      ) : (
        <div>
          {favoriteProjects.map((projeto) => (
            <div key={projeto.id}>
              <img src={projeto.image} alt={projeto.title} />
              <h2>{projeto.title}</h2>
              <p>{projeto.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
