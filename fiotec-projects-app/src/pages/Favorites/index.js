import React, { useEffect } from "react";
import { useProjetos } from "../../context/ProjetosContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "./index.css";

export const Favorites = () => {
  const { filteredProjetos, handleFilterChange, setSelectedProject } =
    useProjetos();
  const navigate = useNavigate();

  useEffect(() => {
    handleFilterChange("Todos");
  }, [handleFilterChange]);

  const favoriteProjects = filteredProjetos.filter(
    (projeto) => projeto.favorite
  );

  const handleBack = () => {
    setSelectedProject(null);
    navigate("/projetos");
  };

  return (
    <div className="container-favoritos my-4">
      <div className="favoritos-title">
        <ArrowBackIcon className="favorito-rounded-btn" onClick={handleBack} />
        <h5 className="mb-4">Meus Favoritos</h5>
      </div>
      <div className="favoritos">
        {favoriteProjects.length === 0 ? (
          <p>Nenhum projeto favoritado.</p>
        ) : (
          <div className="row">
            {favoriteProjects.map((projeto) => (
              <div
                className="favoritos-projeto-container col-md-12 mb-4"
                key={projeto.id}
              >
                <div className="projeto-favorito d-flex align-items-start">
                  <img
                    src={projeto.image}
                    alt={projeto.title}
                    className="img-fluid me-3"
                    style={{ width: "150px", height: "auto" }}
                  />
                  <div className="projeto-favorito-info">
                    <h5 className="card-title">{projeto.title}</h5>
                    <p className="card-text">{projeto.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
