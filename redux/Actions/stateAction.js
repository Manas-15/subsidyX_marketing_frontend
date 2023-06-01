import { alertActions } from "./alertAction";
import { stateConstant } from "redux/Constants/stateConstant";
import { stateService } from "redux/Services/stateService";

export const stateAction = {
  getStateList,
};

function getStateList(data, from) {
  return (dispatch) => {
    dispatch(request({ data }));
    stateService.getStateList(data).then(
      (res) => {
        console.log(res);
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
