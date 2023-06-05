import { categoryService } from "redux/Services/categoryService";
import { alertActions } from "./alertAction";
import { categoryConstant } from "redux/Constants/categoryConstant";
import { sectorService } from "redux/Services/sectorService";
import { sectorConstant } from "redux/Constants/sectorConstant";

export const sectorAction = {
  getSectorList,
};

function getSectorList() {
  return (dispatch) => {
    dispatch(request());
    sectorService.getSectorList().then(
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
    return { type: sectorConstant.GET_SECTOR_REQUEST, data };
  }
  function success(data) {
    return { type: sectorConstant.GET_SECTOR_SUCCESS, data };
  }
  function failure(error) {
    return { type: sectorConstant.GET_SECTOR_FAILURE, error };
  }
}
