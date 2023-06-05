
import { alertActions } from "./alertAction";
import { questionConstant } from "redux/Constants/questionConstant";
import { questionService } from "redux/Services/questionService";

export const questionAction = {
  getQuestion,
};

function getQuestion() {
  return (dispatch) => {
    dispatch(request());
    questionService.getQuestion().then(
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
    return { type: questionConstant.GET_QUESTION_REQUEST, data };
  }
  function success(data) {
    return { type: questionConstant.GET_QUESTION_SUCCESS, data };
  }
  function failure(error) {
    return { type: questionConstant.GET_QUESTION_FAILURE, error };
  }
}
