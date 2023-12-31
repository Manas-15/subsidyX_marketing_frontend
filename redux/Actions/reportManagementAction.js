import { reportManagementConstants } from "redux/Constants/reportManagementConstants";
import { alertActions } from "./alertAction";
import { reportManagementService } from "redux/Services/reportManagementService";
import { showToast } from "@layouts/components/ToastNotification";

export const reportManagementAction = {
  getAllReportBasedOnUser,
  selectedCategory,
  getReportByID,
  deleteReport,
  downloadPDF,
  clearPDF,
  savedPageData,
};
function getAllReportBasedOnUser(pageData) {
  return (dispatch) => {
    dispatch(request(pageData));
    reportManagementService.getAllReportBasedOnUser(pageData).then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
        showToast(error.toString(), "error");
      }
    );
  };
  function request() {
    return {
      type: reportManagementConstants.GET_REPORTS_BASED_ON_USER_REQUEST,
    };
  }
  function success(data) {
    return {
      type: reportManagementConstants.GET_REPORTS_BASED_ON_USER_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: reportManagementConstants.GET_REPORTS_BASED_ON_USER_FAILURE,
      error,
    };
  }
}

function selectedCategory(data) {
  return (dispatch) => {
    dispatch(success(data));
  };

  function success(data) {
    return {
      type: reportManagementConstants.SELECTED_CATEGORY_SUCCESS,
      data,
    };
  }
}

function getReportByID(id) {
  return (dispatch) => {
    dispatch(request(id));
    reportManagementService.getReportByID(id).then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
        showToast(error.toString(), "error");
      }
    );
  };
  function request() {
    return {
      type: reportManagementConstants.GET_REPORT_BY_REPORT_ID_REQUEST,
    };
  }
  function success(data) {
    return {
      type: reportManagementConstants.GET_REPORT_BY_REPORT_ID_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: reportManagementConstants.GET_REPORT_BY_REPORT_ID_FAILURE,
      error,
    };
  }
}

function deleteReport(id) {
  return (dispatch) => {
    dispatch(request(id));
    reportManagementService.deleteReport(id).then(
      (res) => {
        dispatch(success(res));
        showToast("Report Deleted", "success");
        dispatch(reportManagementAction.getAllReportBasedOnUser());
      },
      (error) => {
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
        showToast(error.toString(), "error");
      }
    );
  };
  function request() {
    return {
      type: reportManagementConstants.DELETE_REPORT_REQUEST,
    };
  }
  function success(data) {
    return {
      type: reportManagementConstants.DELETE_REPORT_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: reportManagementConstants.DELETE_REPORT_FAILURE,
      error,
    };
  }
}

function downloadPDF(id) {
  return (dispatch) => {
    dispatch(request(id));
    reportManagementService.downloadPDF(id).then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
        showToast(error.toString(), "error");
      }
    );
  };
  function request() {
    return {
      type: reportManagementConstants.GENERATE_PDF_BASED_ON_REPORT_ID_REQUEST,
    };
  }
  function success(data) {
    return {
      type: reportManagementConstants.GENERATE_PDF_BASED_ON_REPORT_ID_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: reportManagementConstants.GENERATE_PDF_BASED_ON_REPORT_ID_FAILURE,
      error,
    };
  }
}

function clearPDF() {
  return (dispatch) => {
    dispatch(success());
  };

  function success() {
    return {
      type: reportManagementConstants.CLEAR_PDF_SUCCESS,
    };
  }
}

function savedPageData(data) {
  return (dispatch) => {
    dispatch(success(data));
  };

  function success(data) {
    return {
      type: reportManagementConstants.SAVED_PAGE_DATA_SUCCESS,
      data,
    };
  }
}
