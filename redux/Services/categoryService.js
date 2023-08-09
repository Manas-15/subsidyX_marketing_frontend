
import api from "../api";

export const categoryService = {
  getCategoryList,
};

async function getCategoryList() {
  return await api.get(`industry/industries`, );
}
