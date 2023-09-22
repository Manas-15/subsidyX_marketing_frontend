import { combineReducers } from "redux";
import { userConstants } from "./Constants/userConstant";
import { user } from "./Reducers/userReducer";
import { alert } from "./Reducers/alertReducer";
import { state } from "./Reducers/stateReducer";
import { industryCategory } from "./Reducers/categoryReducer";
import { industrySector } from "./Reducers/sectorReducer";
import { eligibleSubsidy } from "./Reducers/eligibleSubsidyReducer";
import { district } from "./Reducers/districtManagementReducer";
import { taluka } from "./Reducers/talukaManagementReducer";
import { report } from "./Reducers/reportManagementReducer";

const MainReducer = combineReducers({
  user,
  alert,
  state,
  industryCategory,
  industrySector,
  eligibleSubsidy,
  district,
  taluka,
  report,
});

const rootReducer = (state, action) => {
  if (action.type === userConstants?.LOGOUT) {
    state.user.user = {};
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("state");

    state = undefined;
  }
  return MainReducer(state, action);
};

export default rootReducer;
