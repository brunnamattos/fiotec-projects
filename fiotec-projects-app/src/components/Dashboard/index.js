import React from "react";
import { useProjetos } from "../../context/ProjetosContext";
import Card from "../Card";
import { Filter } from "../Filter";

const Dashboard = () => {
  const { projetos, filteredProjetos } = useProjetos();

  return (
    <div>
      <div>
        <Filter />
      </div>
      <div>
        <h1>Projetos em Destaque</h1>
        <p>
          Mostrando {filteredProjetos?.length} de {projetos?.length} resultados
        </p>
      </div>
      <div>
        {filteredProjetos?.length === 0 ? (
          <p>Nenhum projeto encontrado.</p>
        ) : (
          <div>
            {filteredProjetos.map((projeto) => (
              <Card key={projeto.id} projeto={projeto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
