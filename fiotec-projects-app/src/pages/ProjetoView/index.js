import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjetos } from "../../context/ProjetosContext";
import { Filter } from "../../components/Filter";

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
    navigate("/");
  };

  return (
    <div>
      <Filter />
      <h2>{selectedProject?.title}</h2>
      <img src={selectedProject?.image} alt={selectedProject?.title} />
      <p>{selectedProject?.description}</p>
      <button onClick={handleBack}>Voltar</button>
    </div>
  );
};

export default ProjetoView;