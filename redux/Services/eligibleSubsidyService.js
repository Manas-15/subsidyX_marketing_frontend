import { authHeader } from "redux/authHeader";
import api from "../api";

export const eligibleSubsidyService = {
  getEligible,
  getReport,
};

async function getEligible(data) {
  return await api.post(`subsidy/eligible_subsidies`, data, {
    headers: authHeader(),
  });
}

async function getReport(id) {
  return await api.get(`subsidy/fetch_answered_question ?report_id=${id}`, {
    headers: authHeader(),
  });
}
