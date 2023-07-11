import { userConstants } from "redux/Constants/userConstant";

export function user(state = {}, action) {
  switch (action.type) {
    case userConstants.USER_LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case userConstants.USER_LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action?.data?.data,
      };
    case userConstants.USER_LOGIN_FAILURE:
      return { loggingIn: false };

    case userConstants.USER_SIGNUP_REQUEST:
      return {
        loggingIn: true,
      };
    case userConstants.USER_SIGNUP_SUCCESS:
      return {
        loggedIn: true,
        user: action?.data?.data?.token,
      };
    case userConstants.USER_SIGNUP_FAILURE:
      return { loggingIn: false };

    case userConstants.USER_REPORT_COUNT_SUCCESS:
      console.log(action?.data);
      return { ...state, loggedIn: true, user_report_count: action?.data };

    default:
      return state;
  }
}
