import { authHeader } from "../authHeader";
import api from "../api";

export const reportManagementService = {
  getAllReportBasedOnUser,
  getReportByID,
};

async function getAllReportBasedOnUser() {
  //   let params = ID ? "?state_id=" + ID : "";
  return await api.get(`reports/?page=1&page_size=100`, {
    headers: authHeader(),
  });
}

async function getReportByID(id) {
  //   let params = ID ? "?state_id=" + ID : "";
  return await api.get(`subsidy/fetch_answered_question ?report_id=${id}`, {
    headers: authHeader(),
  });
}
