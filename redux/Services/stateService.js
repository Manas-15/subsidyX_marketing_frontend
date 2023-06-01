import authHeader from "redux/authHeader";
import api from "../api";

export const stateService = {
  getStateList,
};

async function getStateList() {
  return await api.get(`state/`, {
    headers: authHeader,
  });
}
