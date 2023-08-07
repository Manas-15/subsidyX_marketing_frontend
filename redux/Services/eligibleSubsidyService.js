import { authHeader } from "redux/authHeader";
import api from "../api";

export const eligibleSubsidyService = {
  getEligible,
  getDetailsOfGST,
};

async function getEligible(data) {
  return await api.post(`subsidy/eligible_subsidies`, data, {
    headers: authHeader(),
  });
}

async function getDetailsOfGST(gstNumber) {
  return await api.get(`subsidy/gstn_details/${gstNumber}`, {
    headers: authHeader(),
  });
}
