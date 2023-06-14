import { reportManagementConstants } from "redux/Constants/reportManagementConstants";
import { districtManagementConstants } from "../Constants/districtManagementConstants";

export function report(
  state = { isSuccess: false, allReports: [], question_answer: [] },
  action
) {
  switch (action.type) {
    case reportManagementConstants.GET_REPORTS_BASED_ON_USER_REQUEST:
      return { ...state, isSuccess: false };
    case reportManagementConstants.GET_REPORTS_BASED_ON_USER_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        allReports: action?.data?.data,
      };
    case reportManagementConstants.GET_REPORTS_BASED_ON_USER_FAILURE:
      return { ...state, isSuccess: false };

    default:
      return state;
  }
}
