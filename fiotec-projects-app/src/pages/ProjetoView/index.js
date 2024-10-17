import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjetos } from "../../context/ProjetosContext";
import { Filter } from "../../components/Filter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./index.css";

const ProjetoView = () => {
  const { id } = useParams();
  const { getById, setSelectedProject, selectedProject } = useProjetos();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      const project = await getById(id);
      if (project) {
        setSelectedProject(project);
      } else {
        console.error(`Project with ID: ${id} not found`);
      }
    };

    fetchProject();
  }, [id, getById, setSelectedProject]);

  const handleBack = () => {
    setSelectedProject(null);
    navigate("/projetos");
  };

  return (
    <div className="projeto-view">
      <Filter />
      <div className="view-container">
        <div className="view-title">
          <ArrowBackIcon className="view-rounded-btn" onClick={handleBack} />
          <h4>{selectedProject?.title}</h4>
        </div>
        <div className="view-description">
          <img src={selectedProject?.image} alt={selectedProject?.title} />
          <span>{selectedProject?.description}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjetoView;
