import React, { createContext, useContext, useEffect, useState } from "react";
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
      value={{ projetos, filteredProjetos, handleFilterChange, toggleFavorite }}
    >
      {children}
    </ProjetosContext.Provider>
  );
};

export default ProjetosProvider;
