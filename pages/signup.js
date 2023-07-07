import Base from "@layouts/Baseof";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "redux/Actions/userAction";
import Link from "next/link";

const Signup = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
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
    setCredential({ ...credential, [name]: value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const signupData = {
      first_name: credential?.firstName,
      last_name: credential?.lastName,
      email: credential?.email,
      phone_number: credential?.number,
      password: credential?.password,
    };
    console.log(credential);
    dispatch(userActions.signup(signupData));
    router.push("/login");
    setCredential({
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      password: "",
    });
  };

  //   useEffect(() => {
  //     if (user?.user?.access_token !== undefined) {
  //       // router.push("/questions");
  //       router.push("/report/all-report-list");
  //     } else {
  //       router.push("/login");
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [user?.user?.access_token]);

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
                    Great!! Enter your details to sign up
                  </h2>
                </div>
                <div style={{ margin: "auto", width: "300px" }}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      name="firstName"
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                      id="floatingInput"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      name="lastName"
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                      id="floatingInput"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      name="email"
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                      id="floatingInput"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      name="number"
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                      id="floatingInput"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      name="password"
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                      id="floatingInput"
                      placeholder="Password"
                    />
                  </div>

                  <div className="mt-5 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary log_btn"
                      title="signup"
                    >
                      SIGN UP
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
            <div className="content col-12 md:col-6 lg:col-5"></div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Signup;
