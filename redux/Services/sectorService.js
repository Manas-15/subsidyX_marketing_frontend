import { authHeader } from "redux/authHeader";
import api from "../api";

export const sectorService = {
  getSectorList,
};

async function getSectorList() {
  return await api.get(`industry_sector/?page=1&page_size=10`, {
    headers: authHeader(),
  });
}
