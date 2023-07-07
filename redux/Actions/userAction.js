import { userConstants } from "redux/Constants/userConstant";
import { userService } from "redux/Services/userService";
import { alertActions } from "./alertAction";

export const userActions = {
  signup,
  login,
  logout,
};

function signup(data) {
  return (dispatch) => {
    dispatch(request({ data }));
    userService.signup(data).then(
      (res) => {
        dispatch(success(res));
        console.log("SIGNupppppppppppppppppppppp", res);
        console.log("SIGNupppppppppppppppppppppp", res?.status === 200);
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

function login(data) {
  return (dispatch) => {
    dispatch(request({ data }));
    userService.login(data).then(
      (res) => {
        dispatch(success(res));
        const result = JSON.stringify(res?.data?.access_token);
        localStorage.setItem("accessToken", result);
        // alert("User loggedin successfully");
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
    // alert("User logged out successfully");

    dispatch(alertActions.success("User logged out successfully"));
  };

  function logout() {
    return { type: userConstants.LOGOUT };
  }
}
