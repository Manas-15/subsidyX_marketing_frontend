import { alertConstant } from "redux/Constants/alertConstant";

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstant.SUCCESS:
      return {
        ...state,
        type: "success",
        message: action.message,
      };
    case alertConstant.ERROR:
      return {
        ...state,
        type: "error",
        message: action.message,
      };
    case alertConstant.CLEAR:
      return {};
    default:
      return state;
  }
}
