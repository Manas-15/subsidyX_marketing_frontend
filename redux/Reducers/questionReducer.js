import { categoryConstant } from "redux/Constants/categoryConstant";

export function questions(state = {}, action) {
  switch (action.type) {
    case categoryConstant.GET_QUESTION_REQUEST:
      return {
        ...state,
      };
    case categoryConstant.GET_QUESTION_SUCCESS:
      return {
        ...state,
        category: action?.data?.data,
      };
    case categoryConstant.GET_QUESTION_FAILURE:
      return { ...state };

    default:
      return state;
  }
}
