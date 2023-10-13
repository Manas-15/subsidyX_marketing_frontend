import { reportManagementConstants } from "redux/Constants/reportManagementConstants";

const initialState = {
  isSuccess: false,
  allReports: [],
  question_answer: [],
  selected_category: "Report Management",
};

export function report(state = initialState, action) {
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

    case reportManagementConstants.SELECTED_CATEGORY_SUCCESS:
      return {
        ...state,
        selected_category: action?.data,
      };

    case reportManagementConstants.GET_REPORT_BY_REPORT_ID_REQUEST:
      return { ...state, isSuccess: false };
    case reportManagementConstants.GET_REPORT_BY_REPORT_ID_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        get_report: action?.data?.data,
      };
    case reportManagementConstants.GET_REPORT_BY_REPORT_ID_FAILURE:
      return { ...state, isSuccess: false };

    case reportManagementConstants.GENERATE_PDF_BASED_ON_REPORT_ID_REQUEST:
      return { ...state, isSuccess: false };
    case reportManagementConstants.GENERATE_PDF_BASED_ON_REPORT_ID_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        generate_pdf: action?.data?.data,
      };
    case reportManagementConstants.GENERATE_PDF_BASED_ON_REPORT_ID_FAILURE:
      return { ...state, isSuccess: false };

    case reportManagementConstants.SAVED_PAGE_DATA_SUCCESS:
      return {
        ...state,
        saved_page_date: action?.data,
      };

    case reportManagementConstants.CLEAR_PDF_SUCCESS:
      return {
        ...state,
        generate_pdf: {},
      };
    default:
      return state;
  }
}
