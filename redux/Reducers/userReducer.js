import { userConstants } from "redux/Constants/userConstant";

export function user(state = {}, action) {
  switch (action.type) {
    case userConstants.USER_LOGIN_REQUEST:
      return { ...state, loggingIn: true };
    case userConstants.USER_LOGIN_SUCCESS:
      return { ...state, loggedIn: true, user: action?.data?.data };
    case userConstants.USER_LOGIN_FAILURE:
      return { ...state, loggingIn: false };

    case userConstants.USER_SIGNUP_REQUEST:
      return { ...state };
    case userConstants.USER_SIGNUP_SUCCESS:
      return { ...state, sign_up_user: action?.data?.data };

    case userConstants.USER_SIGNUP_FAILURE:
      return { ...state };

    case userConstants.CLEAR_SIGN_UP:
      return { ...state, sign_up_user: "" };

    case userConstants.USER_OTP_SAVED_SUCCESS:
      return {
        ...state,
        user: action?.data?.data?.token,
        user_otp: action?.data,
      };

    case userConstants.USER_OTP_REMOVED_SUCCESS:
      return {
        ...state,
        user: action?.data?.data?.token,
        user_otp: "",
      };

    case userConstants.USER_VALIDATE_OTP_REQUEST:
      return {
        ...state,
      };
    case userConstants.USER_VALIDATE_OTP_SUCCESS:
      return {
        ...state,
        user: action?.data?.data,
      };
    case userConstants.USER_VALIDATE_OTP_FAILURE:
      return { ...state };

    case userConstants.USER_REPORT_COUNT_SUCCESS:
      return { ...state, loggedIn: true, user_details: action?.data };

    default:
      return state;
  }
}
