import { sectorConstant } from "redux/Constants/sectorConstant";

export function industrySector(state = {}, action) {
  switch (action.type) {
    case sectorConstant.GET_SECTOR_REQUEST:
      return {
        ...state,
      };
    case sectorConstant.GET_SECTOR_SUCCESS:
      return {
        ...state,
        sector: action?.data?.data,
      };
    case sectorConstant.GET_SECTOR_FAILURE:
      return { ...state };

    default:
      return state;
  }
}
