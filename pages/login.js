import Base from "@layouts/Baseof";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "redux/Actions/userAction";

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
    dispatch(userActions.login(credential));
  };

  useEffect(() => {
    if (user?.user?.access_token !== undefined) {
      router.push("/questions");
    } else {
      router.push("/login");
    }
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
              <Form>
                <div className="d-flex justify-content-center mt-5 mb-5">
                  <h2 className="fw-bold">
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
                      type="button"
                      className="btn btn-primary log_btn"
                      title="login"
                      onClick={(e) => handleLogin(e)}
                    >
                      LOG IN
                    </button>
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

export default Login;
