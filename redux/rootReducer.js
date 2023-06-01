import { combineReducers } from "redux";
import { user } from "./Reducers/userReducer";
import { alert } from "./Reducers/alertReducer";
import { userConstants } from "./Constants/userConstant";
import { state } from "./Reducers/stateReducer";

const MainReducer = combineReducers({
  user,
  alert,
  state,
});

const rootReducer = (state, action) => {
  if (action.type === userConstants.LOGOUT) {
    state = undefined;
  }
  return MainReducer(state, action);
};

export default rootReducer;
