import { alertActions } from "./alertAction";
import { stateConstant } from "redux/Constants/stateConstant";
import { stateService } from "redux/Services/stateService";
import { showToast } from "@layouts/components/ToastNotification";

export const stateAction = {
  getStateList,
};

function getStateList(pageData) {
  return (dispatch) => {
    dispatch(request(pageData));
    stateService.getStateList(pageData).then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure(error.toString()));
        showToast(error.toString(), "error");
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
