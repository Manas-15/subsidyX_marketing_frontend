import { stateConstant } from "redux/Constants/stateConstant";

export function state(state = {}, action) {
  switch (action.type) {
    case stateConstant.GET_STATE_REQUEST:
      return {
        ...state,
      };
    case stateConstant.GET_STATE_SUCCESS:
      return {
        ...state,
        state: action?.data?.data,
      };
    case stateConstant.GET_STATE_FAILURE:
      return { ...state };

    default:
      return state;
  }
}
