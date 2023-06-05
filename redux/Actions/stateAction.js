import { userConstants } from "redux/Constants/userConstant";
import { alertActions } from "./alertAction";
import { stateConstant } from "redux/Constants/stateConstant";
import { stateService } from "redux/Services/stateService";

export const stateAction = {
  getStateList,
};

function getStateList() {
  return (dispatch) => {
    dispatch(request());
    stateService.getStateList().then(
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
    return { type: stateConstant.GET_STATE_REQUEST, data };
  }
  function success(data) {
    return { type: stateConstant.GET_STATE_SUCCESS, data };
  }
  function failure(error) {
    return { type: stateConstant.GET_STATE_FAILURE, error };
  }
}
