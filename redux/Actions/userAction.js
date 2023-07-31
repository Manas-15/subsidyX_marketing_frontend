import { userConstants } from "redux/Constants/userConstant";
import { userService } from "redux/Services/userService";
import { alertActions } from "./alertAction";

export const userActions = {
  signup,
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
        console.log(res);
        const result = JSON.stringify(res?.data?.token?.access_token);
        localStorage.setItem("accessToken", result);
        dispatch(alertActions.success("User Signup successfully"));
      },
      (error) => {
        console.log("SIGNupppppppppppppppppppppp", error.toString());
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
        console.log(res);
        if (res?.data?.detail) {
          dispatch(
            alertActions.error(res?.data?.detail?.error_msg?.toString())
          );
        } else {
          const result = JSON.stringify(res?.data?.access_token);
          localStorage.setItem("accessToken", result);
          dispatch(alertActions.success("User loggedin successfully"));
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
        const result = JSON.stringify(res?.data?.access_token);
        localStorage.setItem("accessToken", result);
        dispatch(alertActions.success("User loggedin successfully"));
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
