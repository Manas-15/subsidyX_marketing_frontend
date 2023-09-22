import { showToast } from "@layouts/components/ToastNotification";
import { contactUsConstant } from "redux/Constants/contactUsConstant";
import { contactUsService } from "redux/Services/contactUsService";

export const contactUsAction = {
  createSubscribe,
  createContact,
};

function createSubscribe(data) {
  return (dispatch) => {
    dispatch(request(data));
    contactUsService.createSubscribe(data).then(
      (res) => {
        dispatch(success(res));
        if (res?.data?.detail?.error_msg) {
          console.log(res?.data?.detail?.error_msg);
          showToast(res?.data?.detail?.error_msg?.toString(), "error");
        } else {
          showToast("You have been successfully subscribed", "success");
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        showToast(error.toString(), "error");
      }
    );
  };
  function request(data) {
    return { type: contactUsConstant.CREATE_SUBSCRIBE_REQUEST, data };
  }
  function success(data) {
    return { type: contactUsConstant.CREATE_SUBSCRIBE_SUCCESS, data };
  }
  function failure(error) {
    return { type: contactUsConstant.CREATE_SUBSCRIBE_FAILURE, error };
  }
}

function createContact(data) {
  return (dispatch) => {
    dispatch(request(data));
    contactUsService.createContact(data).then(
      (res) => {
        dispatch(success(res));
        if (res?.data?.detail?.error_msg) {
          showToast(res?.data?.detail?.error_msg?.toString(), "error");
        } else {
          showToast(
            "Thanks for contacting us! We will be in touch with you shortly.",
            "success"
          );
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        showToast(error.toString(), "error");
      }
    );
  };
  function request(data) {
    return { type: contactUsConstant.CREATE_CONTACT_REQUEST, data };
  }
  function success(data) {
    return { type: contactUsConstant.CREATE_CONTACT_SUCCESS, data };
  }
  function failure(error) {
    return { type: contactUsConstant.CREATE_CONTACT_FAILURE, error };
  }
}
