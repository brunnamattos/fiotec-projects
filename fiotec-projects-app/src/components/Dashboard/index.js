import React from "react";
import { useProjetos } from "../../context/ProjetosContext";
import { Filter } from "../Filter";
import ProjetoView from "../../pages/ProjetoView";
import { Card } from "../Card";

const Dashboard = () => {
  const { projetos, filteredProjetos, selectedProject, setSelectedProject } =
    useProjetos();

  return (
    <div>
      <div className="filter">
        <Filter />
      </div>
      <div className="projetos">
        <h1>Projetos em Destaque</h1>
        {!selectedProject && (
          <p>
            Mostrando {filteredProjetos.length} de {projetos.length} resultados
          </p>
        )}
      </div>
      {selectedProject ? (
        <ProjetoView />
      ) : (
        <div>
          {filteredProjetos.map((projeto) => (
            <Card
              key={projeto.id}
              projeto={projeto}
              onView={() => setSelectedProject(projeto)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
