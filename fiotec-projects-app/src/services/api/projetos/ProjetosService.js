import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";

const getAll = async () => {
  try {
    const { data } = await Api().get("/projetos");
    return data;
  } catch (error) {
    return new ApiException(error.message || "Erro ao consultar consultar API");
  }
};

const getById = async (id) => {
  try {
    const { data } = await Api().get(`/projetos/${id}`);
    return data;
  } catch (error) {
    return new ApiException(error.message || "Erro - Projeto não encontrado");
  }
};

export const ProjetosService = {
  getAll,
  getById,
};
