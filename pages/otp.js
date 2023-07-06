import Base from "@layouts/Baseof";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "redux/Actions/userAction";
import OtpInput from "react-otp-input";

const Otp = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [code, setCode] = useState("");

  const user = useSelector((state) => state?.user);

  const handleChange = (code) => setCode(code);

  function handleSignup(e) {
    e.preventDefault();
    setSubmitted(true);
    {
      (() => {
        if (code.length === 6 && user?.user_type === 3) {
          return dispatch(
            employeeActions.validateOtp({
              userId: user.user_id,
              otp: code,
              validOtp: user.otp,
            })
          );
        } else if (code.length === 6 && user?.user_type === 4) {
          return dispatch(
            employeeActions.validateOtp({
              userId: user.user_id,
              otp: code,
              validOtp: user.otp,
            })
          );
        }
        return null;
      })();
    }
  }

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
              {/* <Form> */}
              <div className="d-flex justify-content-center mt-5 mb-5">
                <h2 className="fw-bold text-white">
                  Enter OTP sent on your phone
                </h2>
              </div>
              <div style={{ margin: "auto", width: "300px" }}>
                <div className="form-floating mb-3">
                  <form name="form" onSubmit={(e) => handleSignup(e)}>
                    <div className="d-inline-block mb-4">
                      <OtpInput
                        value={code}
                        onChange={handleChange}
                        numInputs={6}
                        separator={<span style={{ width: "8px" }}></span>}
                        isInputNum={true}
                        shouldAutoFocus={true}
                        inputStyle={{
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          width: "54px",
                          height: "54px",
                          fontSize: "20px",
                          color: "#000",
                          fontWeight: "400",
                          caretColor: "blue",
                        }}
                        focusStyle={{
                          border: "1px solid #CFD3DB",
                          outline: "none",
                        }}
                      />
                    </div>
                    <div className="row text-center offset-md-4">
                      <div className="col-md-6">
                        <button
                          type="button"
                          className="btn btn-custom btn-block"
                          disabled={code.length < 6}
                        >
                          Validate
                        </button>
                      </div>
                    </div>
                  </form>
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
              </div>
              {/* </Form> */}
            </div>
            <div className="content col-12 md:col-6 lg:col-5"></div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Otp;
