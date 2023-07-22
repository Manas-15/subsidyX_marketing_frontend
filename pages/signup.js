import Base from "@layouts/Baseof";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "redux/Actions/userAction";
import Link from "next/link";
import { useMemo } from "react";
import jwt from "jsonwebtoken";

const Signup = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [credential, setCredential] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    password: "",
  });

  const user = useSelector((state) => state?.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName") {
      if (value === "") {
        setFirstNameError(true);
      } else {
        setFirstNameError(false);
      }
    } else if (name === "lastName") {
      if (value === "") {
        setLastNameError(true);
      } else {
        setLastNameError(false);
      }
    } else if (name === "email") {
      if (value === "") {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    } else if (name === "number") {
      if (value === "") {
        setNumberError(true);
      } else {
        setNumberError(false);
      }
    } else {
      if (value === "") {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
    setCredential({ ...credential, [name]: value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (
      credential?.firstName === "" ||
      credential?.lastName === "" ||
      credential?.email === "" ||
      credential?.number === "" ||
      credential?.password === ""
    ) {
      setFirstNameError(true);
      setLastNameError(true);
      setEmailError(true);
      setNumberError(true);
      setPasswordError(true);
    } else {
      const signupData = {
        first_name: credential?.firstName,
        last_name: credential?.lastName,
        email: credential?.email,
        phone_number: credential?.number,
        password: credential?.password,
      };
      dispatch(userActions.signup(signupData));
    }

    setCredential({
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      password: "",
    });
  };

  const accessToken = useMemo(
    () => user?.user?.access_token,
    [user?.user?.access_token]
  );

  useEffect(() => {
    if (accessToken !== undefined) {
      try {
        const decodedToken = jwt.decode(accessToken);
        // if (decodedToken?.report_count > 0) {
        //   dispatch(userActions?.userReportCount(decodedToken));
        //   router.push("/report/all-report-list");
        // } else {
        dispatch(userActions?.userReportCount(decodedToken));
        router.push("/login");
        // }
      } catch (error) {
        console.log("Error decoding access token:", error);
        return null;
      }
    } else {
      router.push("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.user?.access_token]);

  return (
    <Base
      title={"title"}
      description={"dgfdfsdfsffsfd"}
      meta_title={"meta_title"}
      image={"image"}
      noindex={"noindex"}
      canonical={"canonical"}
    >
      <section className="section bg-inner">
        <div className="container">
          <div className="section row pb-0">
            <div className="col-12 inner-section">
              <Form onSubmit={(e) => handleSignup(e)}>
                <div className="d-flex justify-content-center mt-5 mb-5">
                  <h2 className="fw-bold text-white">
                    Please provide your Details
                  </h2>
                </div>
                <div style={{ margin: "auto", width: "500px" }}>
                  <div className="row">
                    <div className="form-floating mb-3 col-sm-6">
                      <input
                        type="text"
                        name="firstName"
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        placeholder="First Name"
                      />
                      {firstNameError && (
                        <span style={{ color: "red", fontSize: "15px" }}>
                          Please enter first name
                        </span>
                      )}
                    </div>
                    <div className="form-floating mb-3  col-sm-6">
                      <input
                        type="text"
                        name="lastName"
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        placeholder="Last Name"
                      />
                      {lastNameError && (
                        <span style={{ color: "red", fontSize: "15px" }}>
                          Please enter last name
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-floating mb-3 col-sm-6">
                      <input
                        type="email"
                        name="email"
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        placeholder="Email"
                      />
                      {emailError && (
                        <span style={{ color: "red", fontSize: "15px" }}>
                          Please enter your email
                        </span>
                      )}
                    </div>
                    <div className="form-floating mb-3 col-sm-6">
                      <input
                        type="number"
                        name="number"
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        placeholder="Phone Number"
                      />
                      {numberError && (
                        <span style={{ color: "red", fontSize: "15px" }}>
                          Please enter phone number
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-floating mb-3 col-sm-12">
                      <input
                        type="password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        placeholder="Password"
                      />
                      {passwordError && (
                        <span style={{ color: "red", fontSize: "15px" }}>
                          Please enter password
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="my-3 d-flex justify-content-center">
                    <input
                      type="checkbox"
                      onChange={(e) => console.log(e.target.checked)}
                    />
                    <Link
                      href="https://www.lipsum.com/"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-white mx-2"
                    >
                      I agree with terms & conditions
                    </Link>
                  </div>

                  <div className=" d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary log_btn"
                      title="signup"
                    >
                      SUBMIT
                    </button>
                  </div>
                  <div className="text-white d-flex justify-content-center mt-3">
                    Already have an account ? &nbsp;
                    <Link href="/login" className="text-primary">
                      {" "}
                      Log In{" "}
                    </Link>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Signup;
