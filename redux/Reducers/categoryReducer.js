import { categoryConstant } from "redux/Constants/categoryConstant";

export function industryCategory(state = {}, action) {
  switch (action.type) {
    case categoryConstant.GET_CATEGORY_REQUEST:
      return {
        ...state,
      };
    case categoryConstant.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action?.data?.data,
      };
    case categoryConstant.GET_CATEGORY_FAILURE:
      return { ...state };

    default:
      return state;
  }
}
