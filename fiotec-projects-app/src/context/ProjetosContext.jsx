import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { ProjetosService } from "../services/api/projetos/ProjetosService";

const ProjetosContext = createContext();

export const useProjetos = () => {
  const context = useContext(ProjetosContext);
  if (!context) {
    throw new Error("useProjetos must be used within a ProjetosProvider");
  }
  return context;
};

const ProjetosProvider = ({ children }) => {
  const [projetos, setProjetos] = useState([]);
  const [filteredProjetos, setFilteredProjetos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const loadProjetos = async () => {
      const result = await ProjetosService.getAll();
      const savedFavorites = JSON.parse(localStorage.getItem("projetos")) || [];
      const updatedProjects = result.map((projeto) => {
        const isFavorite = savedFavorites.some((fav) => fav.id === projeto.id);
        return { ...projeto, favorite: isFavorite };
      });

      setProjetos(updatedProjects);
      setFilteredProjetos(updatedProjects);
    };

    loadProjetos();
  }, []);

  // Use useCallback para evitar que a função getById seja recriada em cada renderização
  const getById = useCallback(async (id) => {
    const data = await ProjetosService.getById(id);
    return data;
  }, []);

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    if (category === "Todos") {
      setFilteredProjetos(projetos);
    } else {
      const filtered = projetos.filter(
        (projeto) => projeto.category === category
      );
      setFilteredProjetos(filtered);
    }
    setSelectedProject(null);
  };

  const toggleFavorite = (projectId) => {
    const updatedProjects = projetos.map((projeto) => {
      if (projeto.id === projectId) {
        return { ...projeto, favorite: !projeto.favorite };
      }
      return projeto;
    });

    setProjetos(updatedProjects);

    const filtered =
      selectedCategory === "Todos"
        ? updatedProjects
        : updatedProjects.filter(
            (projeto) => projeto.category === selectedCategory
          );

    setFilteredProjetos(filtered);

    localStorage.setItem(
      "projetos",
      JSON.stringify(updatedProjects.filter((projeto) => projeto.favorite))
    );
  };

  return (
    <ProjetosContext.Provider
      value={{
        getById,
        projetos,
        filteredProjetos,
        handleFilterChange,
        toggleFavorite,
        selectedProject,
        setSelectedProject,
      }}
    >
      {children}
    </ProjetosContext.Provider>
  );
};

export default ProjetosProvider;