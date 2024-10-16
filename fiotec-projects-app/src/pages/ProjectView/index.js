import React from "react";
import { useParams } from "react-router-dom";
import { useProjetos } from "../../context/ProjetosContext";

const ProjectView = () => {
  const { id } = useParams();
  const { state } = useProjetos();

  const projeto = state.projetos.find(p => p.id === parseInt(id));

  return (
    <div>
      {projeto ? (
        <div>
          <h1>{projeto.title}</h1>
          <p>{projeto.description}</p>
          <p>Categoria: {projeto.category}</p>
        </div>
      ) : (
        <p>Projeto não encontrado.</p>
      )}
    </div>
  );
};

export default ProjectView;