import { eligibleSubsidyConstant } from "redux/Constants/eligibleSubsidyConstant";
export function eligibleSubsidy(state = {}, action) {
  switch (action.type) {
    case eligibleSubsidyConstant.GET_ELIGIBLE_SUBSIDY_REQUEST:
      return {
        ...state,
      };
    case eligibleSubsidyConstant.GET_ELIGIBLE_SUBSIDY_SUCCESS:
      return {
        ...state,
        eligible_subsidy: action?.data?.data,
      };
    case eligibleSubsidyConstant.GET_ELIGIBLE_SUBSIDY_FAILURE:
      return { ...state };

    case eligibleSubsidyConstant.CLEAR_ELIGIBLE_SUBSIDY_SUCCESS:
      return { ...state, eligible_subsidy: {} };

    case eligibleSubsidyConstant.SELECTED_DATA_FOR_ELIGIBLE_SUBSIDY_SUCCESS:
      return { ...state, selected_data: action?.data };

    case eligibleSubsidyConstant.SELECTED_INFORMATION_FOR_ELIGIBLE_SUBSIDY_SUCCESS:
      return { ...state, selected_information: action?.data };

    case eligibleSubsidyConstant.SAVED_AADHAR_NUMBER_REQUEST:
      return {
        ...state,
      };
    case eligibleSubsidyConstant.SAVED_AADHAR_NUMBER_SUCCESS:
      return {
        ...state,
        gst_number_data: action?.data?.data,
      };

    case eligibleSubsidyConstant.SAVED_AADHAR_NUMBER_FAILURE:
      return { ...state };

    case eligibleSubsidyConstant.BENEFITS_DATA_SUCCESS:
      return {
        ...state,
        benefits_data: action?.data,
      };

    default:
      return state;
  }
}
