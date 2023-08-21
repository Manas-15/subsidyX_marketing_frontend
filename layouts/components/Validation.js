import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password must be 5 characters at minimum")
    .required("Password is required"),
});
export const SignupSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required!"),
  last_name: Yup.string().required("Last name is required!"),
  phone_number: Yup.string()
    .required("Contact number is required!")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Invalid Phone number! Phone number must not start with 0 and must be 10 digits."
    )
    .test(
      "len",
      "Phone number must be exactly 10 digits",
      (val) => val.length === 10
    ),
  // .min(10, "Phone number must be 10 digits")
  // .max(10, "Phone number must be 10 digits"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  // password: Yup.string()
  //   .required("Password is required")
  //   .min(10, "Password must be 10 characters at minimum")
  //   .required("Password is required"),
});
