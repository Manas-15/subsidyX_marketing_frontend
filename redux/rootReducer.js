import { combineReducers } from "redux";
import { userConstants } from "./Constants/userConstant";
import { user } from "./Reducers/userReducer";
import { alert } from "./Reducers/alertReducer";
import { state } from "./Reducers/stateReducer";
import { industryCategory } from "./Reducers/categoryReducer";
import { industrySector } from "./Reducers/sectorReducer";
import { eligibleSubsidy } from "./Reducers/eligibleSubsidyReducer";

const MainReducer = combineReducers({
  user,
  alert,
  state,
  industryCategory,
  industrySector,
  eligibleSubsidy,
});

const rootReducer = (state, action) => {
  if (action.type === userConstants.LOGOUT) {
    state = undefined;
  }
  return MainReducer(state, action);
};

export default rootReducer;
