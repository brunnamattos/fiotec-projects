import React from "react";
import { useProjetos } from "../../context/ProjetosContext";
import { Filter } from "../Filter";
import ProjetoView from "../../pages/ProjetoView";
import { CardItem } from "../CardItem";
import { Col, Row } from "react-bootstrap";
import "./index.css";

const Dashboard = () => {
  const { projetos, filteredProjetos, selectedProject, setSelectedProject } =
    useProjetos();

  return (
    <div className="dashboard">
      <div className="filter">
        <Filter />
      </div>
      <div className="projetos-container">
        <div className="info-projetos">
          <h5>Projetos em Destaque</h5>
          {!selectedProject && (
            <p className="results">
              Mostrando {filteredProjetos.length} de {projetos.length}{" "}
              resultados
            </p>
          )}
        </div>
        {selectedProject ? (
          <ProjetoView />
        ) : (
          <Row>
            {filteredProjetos.map((projeto) => (
              <Col
                key={projeto.id}
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={4}
                className="mb-4"
              >
                <CardItem
                  key={projeto.id}
                  projeto={projeto}
                  onView={() => setSelectedProject(projeto)}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
