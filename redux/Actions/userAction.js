import { userConstants } from "redux/Constants/userConstant";
import { userService } from "redux/Services/userService";
import { alertActions } from "./alertAction";
import { showToast } from "@layouts/components/ToastNotification";

export const userActions = {
  signup,
  clearSignup,
  login,
  logout,
  userReportCount,
  generateOTP,
  saveOTP,
  validateOtp,
  clearOTP,
};

function signup(data) {
  return (dispatch) => {
    dispatch(request({ data }));
    userService.signup(data).then(
      (res) => {
        dispatch(success(res));
        if (res?.data?.detail?.error_msg) {
          showToast(res?.data?.detail?.error_msg?.toString(), "error");
        } else {
          showToast("User Signup successfully", "success");
        }
        // const result = JSON.stringify(res?.data?.token?.access_token);
        // localStorage.setItem("accessToken", result);
      },
      (error) => {
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
        showToast(error.toString(), "error");
      }
    );
  };
  function request(data) {
    return { type: userConstants.USER_SIGNUP_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.USER_SIGNUP_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.USER_SIGNUP_FAILURE, error };
  }
}

function clearSignup() {
  return { type: userConstants.CLEAR_SIGN_UP };
}

function generateOTP(credential) {
  return (dispatch) => {
    dispatch(request(credential));
    userService.generateOTP(credential).then(
      (res) => {
        dispatch(success(res));
        if (res?.data?.detail?.error_msg) {
          dispatch(userActions?.saveOTP(res?.data));
          showToast(res?.data?.detail?.error_msg?.toString(), "error");
        } else {
          dispatch(userActions?.saveOTP(res?.data));
          showToast("OTP sent successfully", "success");
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
        showToast(error.toString(), "error");
      }
    );
  };
  function request(data) {
    return { type: userConstants.USER_GENERATE_OTP_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.USER_GENERATE_OTP_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.USER_GENERATE_OTP_FAILURE, error };
  }
}

function saveOTP(data) {
  return (dispatch) => {
    dispatch(success(data));
  };

  function success(data) {
    return { type: userConstants.USER_OTP_SAVED_SUCCESS, data };
  }
}
function clearOTP(data) {
  return (dispatch) => {
    dispatch(success(data));
  };

  function success() {
    return { type: userConstants.USER_OTP_REMOVED_SUCCESS };
  }
}

function validateOtp(data) {
  return (dispatch) => {
    dispatch(request(data));
    userService.validateOtp(data).then(
      (res) => {
        dispatch(success(res));
        if (res?.data?.detail?.error_msg) {
          showToast(res?.data?.detail?.error_msg?.toString(), "error");
        } else {
          showToast("User loggedin successfully", "success");
          const result = JSON.stringify(res?.data?.access_token);
          const refreshToken = JSON.stringify(res?.data?.refresh_token);

          localStorage.setItem("accessToken", result);
          localStorage.setItem("refreshToken", refreshToken);
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
        showToast(error.toString(), "error");
      }
    );
  };
  function request(data) {
    return { type: userConstants.USER_VALIDATE_OTP_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.USER_VALIDATE_OTP_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.USER_VALIDATE_OTP_FAILURE, error };
  }
}

function login(data) {
  return (dispatch) => {
    dispatch(request({ data }));
    userService.login(data).then(
      (res) => {
        dispatch(success(res));
        showToast("User loggedin successfully", "success");
        const result = JSON.stringify(res?.data?.access_token);
        const refreshToken = JSON.stringify(res?.data?.refresh_token);

        localStorage.setItem("accessToken", result);
        localStorage.setItem("refreshToken", refreshToken);
      },
      (error) => {
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
        showToast(error.toString(), "error");
      }
    );
  };
  function request(data) {
    return { type: userConstants.USER_LOGIN_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.USER_LOGIN_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.USER_LOGIN_FAILURE, error };
  }
}

function logout() {
  return (dispatch) => {
    dispatch(logout());
    showToast("User logged out successfully", "success");
  };

  function logout() {
    return { type: userConstants.LOGOUT };
  }
}

function userReportCount(data) {
  return (dispatch) => {
    dispatch(success(data));
  };

  function success(data) {
    return { type: userConstants.USER_REPORT_COUNT_SUCCESS, data };
  }
}
