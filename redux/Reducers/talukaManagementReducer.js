import { talukaManagementConstants } from "../Constants/talukaManagementConstants";

export function taluka(
  state = { isSuccess: false, talukaManagementData: [] },
  action
) {
  switch (action.type) {
    case talukaManagementConstants.GET_TALUKA_REQUEST:
      return {
        ...state,
        isSuccess: false,
      };
    case talukaManagementConstants.GET_TALUKA_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        talukaManagementData: action?.data?.data,
      };
    case talukaManagementConstants.GET_TALUKA_FAILURE:
      return { ...state, isSuccess: false };

    case talukaManagementConstants.SELECTED_DATA_FOR_TALUKA_SUCCESS:
      return {
        ...state,
        selected_data: action?.data,
      };

    default:
      return state;
  }
}
