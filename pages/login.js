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

const Login = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState({ email: "", password: "" });

  const user = useSelector((state) => state?.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(userActions.login(credential));
  };

  const accessToken = useMemo(
    () => user?.user?.access_token,
    [user?.user?.access_token]
  );

  useEffect(() => {
    if (accessToken !== undefined) {
      try {
        const decodedToken = jwt.decode(accessToken);
        console.log(decodedToken);
        if (decodedToken?.report_count > 0) {
          dispatch(userActions?.userReportCount(decodedToken?.report_count));
          router.push("/report/all-report-list");
        } else {
          dispatch(userActions?.userReportCount(decodedToken?.report_count));
          router.push("/dashboard");
        }
      } catch (error) {
        console.log("Error decoding access token:", error);
        return null;
      }
    } else {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

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
              <Form onSubmit={(e) => handleLogin(e)}>
                <div className="d-flex justify-content-center mt-5 mb-5">
                  <h2 className="fw-bold text-white">
                    Great!! Enter your email and password to log in
                  </h2>
                </div>
                <div style={{ margin: "auto", width: "300px" }}>
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

                  <div className="form-floating">
                    <input
                      type="password"
                      name="password"
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                  </div>
                  <div className="mt-5 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary log_btn"
                      title="login"
                    >
                      LOG IN
                    </button>
                  </div>
                  <div className="text-white d-flex justify-content-center mt-3">
                    Don't have an account ? &nbsp;
                    <Link href="/signup" className="text-primary">
                      {" "}
                      Sign Up{" "}
                    </Link>
                  </div>
                </div>
              </Form>
            </div>
            <div className="text-white"></div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Login;
