import Base from "@layouts/Baseof";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "redux/Actions/userAction";
import OtpInput from "react-otp-input";
import { IoIosArrowDropright } from "react-icons/io";

const Otp = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const user = useSelector((state) => state?.user);

  const accessToken = useMemo(
    () => user?.user?.access_token,
    [user?.user?.access_token]
  );

  useEffect(() => {
    if (accessToken !== undefined) {
      try {
        const decodedToken = jwt.decode(accessToken);
        if (decodedToken?.report_count > 0) {
          dispatch(userActions?.userReportCount(decodedToken));
          router.push("/report/all-report-list");
        } else {
          dispatch(userActions?.userReportCount(decodedToken));
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

  const handleChange = (code) => setCode(code);

  function goToNext(e) {
    e.preventDefault();
    // router.push("/report/all-report-list");
    const data = {
      phone_number: "9777814998",
      otp: code,
    };
    if (code?.length === 6) {
      dispatch(userActions.validateOtp(data));
    } else {
      console.log("error");
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
              <div className="d-flex justify-content-center mt-5 ">
                <h2 className="fw-bold text-white">
                  Enter OTP sent on your phone
                </h2>
              </div>
              <div className="d-flex justify-content-center mt-3 mb-3">
                <h2 className="fw-bold text-white">{user?.user_otp?.otp}</h2>
              </div>
              <div className="d-flex justify-content-center mt-3 mb-4">
                <div className="form-floating mb-3">
                  <form name="form">
                    <div className="d-inline-block mb-4">
                      <OtpInput
                        value={code}
                        onChange={handleChange}
                        numInputs={6}
                        renderSeparator={
                          <span style={{ width: "10px" }}> </span>
                        }
                        renderInput={(props) => <input {...props} />}
                        // isInputNum={true}
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
                      {/* <OtpInput
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
                      /> */}
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

                {/* <div className="mt-5 d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary log_btn"
                    title="signup"
                  >
                    SIGN UP
                  </button>
                </div> */}
              </div>
              <span className="mt-4 d-flex justify-content-center">
                <IoIosArrowDropright
                  style={{
                    fontSize: "50px",
                    color: "#fa6130",
                    cursor: "pointer",
                  }}
                  onClick={(e) => goToNext(e)}
                />
              </span>
              {/* </Form> */}
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Otp;
