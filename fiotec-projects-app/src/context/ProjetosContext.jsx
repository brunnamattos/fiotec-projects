import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { ProjetosService } from "../services/api/projetos/ProjetosService";
import { ApiException } from "../services/api/ApiException";

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

  const getById = useCallback(async (id) => {
    const data = await ProjetosService.getById(id);
    if (data instanceof ApiException) {
      console.log("Erro encontrado, recarregando a página...");
      window.location.reload();
    }
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

    // Atualiza os favoritos no localStorage
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
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </ProjetosContext.Provider>
  );
};

export default ProjetosProvider;
