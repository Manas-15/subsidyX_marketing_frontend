import { authHeader } from "redux/authHeader";
import api from "../api";

export const eligibleSubsidyService = {
  getEligible,
};

async function getEligible(data) {
  return await api.post(`subsidy/eligible_subsidies`, data, {
    headers: authHeader(),
  });
}
