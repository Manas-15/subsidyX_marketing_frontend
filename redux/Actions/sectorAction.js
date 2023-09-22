import { alertActions } from "./alertAction";
import { sectorService } from "redux/Services/sectorService";
import { sectorConstant } from "redux/Constants/sectorConstant";
import { showToast } from "@layouts/components/ToastNotification";

export const sectorAction = {
  getSectorList,
};

function getSectorList(pageData) {
  return (dispatch) => {
    dispatch(request(pageData));
    sectorService.getSectorList(pageData).then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
        showToast(error.toString(), "error");
      }
    );
  };
  function request(data) {
    return { type: sectorConstant.GET_SECTOR_REQUEST, data };
  }
  function success(data) {
    return { type: sectorConstant.GET_SECTOR_SUCCESS, data };
  }
  function failure(error) {
    return { type: sectorConstant.GET_SECTOR_FAILURE, error };
  }
}
