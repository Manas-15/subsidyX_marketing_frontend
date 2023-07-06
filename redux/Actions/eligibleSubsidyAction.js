import { eligibleSubsidyConstant } from "redux/Constants/eligibleSubsidyConstant";
import { alertActions } from "./alertAction";
import { eligibleSubsidyService } from "redux/Services/eligibleSubsidyService";

export const eligibleSubsidyAction = {
  getEligible,
  clearEligible,
  selectedDataForEligibleSubsidy,
  selectedInformationForEligibleSubsidy,
  savedAadharNumber,
};

function getEligible(data) {
  return (dispatch) => {
    dispatch(request(data));
    eligibleSubsidyService.getEligible(data).then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request(data) {
    return { type: eligibleSubsidyConstant.GET_ELIGIBLE_SUBSIDY_REQUEST, data };
  }
  function success(data) {
    return { type: eligibleSubsidyConstant.GET_ELIGIBLE_SUBSIDY_SUCCESS, data };
  }
  function failure(error) {
    return {
      type: eligibleSubsidyConstant.GET_ELIGIBLE_SUBSIDY_FAILURE,
      error,
    };
  }
}

function clearEligible() {
  return (dispatch) => {
    dispatch(clear());
  };

  function clear() {
    return {
      type: eligibleSubsidyConstant.CLEAR_ELIGIBLE_SUBSIDY_SUCCESS,
    };
  }
}

function selectedDataForEligibleSubsidy(data) {
  return (dispatch) => {
    dispatch(selectedDataForEligibleSubsidy(data));
  };

  function selectedDataForEligibleSubsidy(data) {
    return {
      type: eligibleSubsidyConstant.SELECTED_DATA_FOR_ELIGIBLE_SUBSIDY_SUCCESS,
      data,
    };
  }
}

function selectedInformationForEligibleSubsidy(data) {
  return (dispatch) => {
    dispatch(selectedInformationForEligibleSubsidy(data));
  };

  function selectedInformationForEligibleSubsidy(data) {
    return {
      type: eligibleSubsidyConstant.SELECTED_INFORMATION_FOR_ELIGIBLE_SUBSIDY_SUCCESS,
      data,
    };
  }
}

function savedAadharNumber(data) {
  return (dispatch) => {
    dispatch(savedAadharNumber(data));
  };

  function savedAadharNumber(data) {
    return {
      type: eligibleSubsidyConstant.SAVED_AADHAR_NUMBER_SUCCESS,
      data,
    };
  }
}


