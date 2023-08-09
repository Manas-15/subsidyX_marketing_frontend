
import api from "../api";

export const sectorService = {
  getSectorList,
};

async function getSectorList(id) {
  const params = id ? `&industry_category_id=${id}` : "";
  return await api.get(`industry_sector/?page=1&page_size=10${params}`);
}
