const ProjetosReducer = (state, action) => {
  switch (action.type) {
    case "FAVORITE_PROJECT":
      const updatedFavoriteProjects = state.projetos.map((projeto) => {
        if (projeto.id === action.payload.id) {
          return { ...projeto, favorite: !projeto.favorite };
        }
        return projeto;
      });
      localStorage.setItem(
        "projetos",
        JSON.stringify(updatedFavoriteProjects.filter(projeto => projeto.favorite))
      );
      return { ...state, projetos: updatedFavoriteProjects };

    case "INITIALIZE_PROJECTS":
      return { ...state, allProjects: action.payload, projetos: action.payload }; // Armazenar todos os projetos

    case "FILTER_PROJECTS": {
      const { payload } = action;
      const filteredProjects = payload === "Todos"
        ? state.allProjects // Retornar todos os projetos
        : state.allProjects.filter((projeto) => projeto.category === payload); // Filtrar pela categoria
      return { ...state, projetos: filteredProjects }; // Atualizar apenas os projetos filtrados
    }

    default:
      return state;
  }
};

export default ProjetosReducer;