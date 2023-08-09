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
          alert(res?.data?.detail?.error_msg?.toString());
          dispatch(
            alertActions.success(res?.data?.detail?.error_msg?.toString())
          );
        } else {
          dispatch(alertActions.success("User Signup successfully"));
        }
        // const result = JSON.stringify(res?.data?.token?.access_token);
        // localStorage.setItem("accessToken", result);
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
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
        if (res?.data?.detail?.error_msg !== undefined) {
          dispatch(userActions?.saveOTP(res?.data));
          dispatch(
            alertActions.error(res?.data?.detail?.error_msg?.toString())
          );
        } else {
          console.log(res?.data);
          dispatch(userActions?.saveOTP(res?.data));
          dispatch(alertActions.success("OTP sent successfully"));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
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
          dispatch(
            alertActions.error(res?.data?.detail?.error_msg?.toString())
          );
        } else {
          dispatch(alertActions.success("User loggedin successfully"));
          const result = JSON.stringify(res?.data?.access_token);
          const refreshToken = JSON.stringify(res?.data?.refresh_token);

          localStorage.setItem("accessToken", result);
          localStorage.setItem("refreshToken", refreshToken);
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
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
        // dispatch(alertActions.success("User loggedin successfully"));
        showToast("User loggedin successfully", "success");
        const result = JSON.stringify(res?.data?.access_token);
        const refreshToken = JSON.stringify(res?.data?.refresh_token);

        localStorage.setItem("accessToken", result);
        localStorage.setItem("refreshToken", refreshToken);
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
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
    dispatch(alertActions.success("User logged out successfully"));
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
