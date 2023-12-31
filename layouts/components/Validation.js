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
      "Phone number must not start with 0 and must be 10 digits."
    )
    .test(
      "len",
      "Phone number must be exactly 10 digits",
      (val) => val.length === 10
    ),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  // password: Yup.string()
  //   .required("Password is required")
  //   .min(10, "Password must be 10 characters at minimum")
  //   .required("Password is required"),
});

export const ContactUsSchema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  phone_number: Yup.string()
    .required("Contact number is required!")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number must not start with 0 and must be 10 digits."
    )
    .test(
      "len",
      "Phone number must be exactly 10 digits",
      (val) => val.length === 10
    ),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string().required("Message is required!"),
});

export const SubscribeSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string().required("Message is required!"),
});
