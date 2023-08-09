import { toast } from "react-toastify";

export function showToast(message, type) {
  toast(message, {
    hideProgressBar: true,
    autoClose: 3000,
    type: type,
  });
}
