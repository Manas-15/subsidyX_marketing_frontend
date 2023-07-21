import Base from "@layouts/Baseof";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "redux/Actions/userAction";
import { useMemo } from "react";
import jwt from "jsonwebtoken";
import { IoIosArrowDropright } from "react-icons/io";
import { GiRotaryPhone } from "react-icons/gi";

const PhoneNumberLogin = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState({ phone_number: "" });
  const [phoneError, setPhoneError] = useState(false);
  const user = useSelector((state) => state?.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
    setCredential({ ...credential, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(userActions.login(credential));
  };

  useEffect(() => {
    dispatch(userActions.clearOTP());
  }, []);

  console.log();
  useEffect(() => {
    if (user?.user_otp?.detail?.error_msg === "User does not exist") {
      router.push("/signup");
    } else if (user?.user_otp !== undefined && user?.user_otp !== "") {
      router.push("/otp");
    } else {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.user_otp]);

  const goToNext = () => {
    if (credential?.number === "") {
      setPhoneError(true);
    } else {
      setPhoneError(false);
      dispatch(userActions.generateOTP(credential));
    }
  };

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
              <div>
                <Form onSubmit={(e) => handleLogin(e)}>
                  <div className="d-flex justify-content-center mt-5 mb-5">
                    <h2 className="fw-bold text-white">
                      Great!! Enter your phone number to log in
                    </h2>
                  </div>
                  <div style={{ margin: "auto", width: "300px" }}>
                    <div
                      className="form-floating mb-3"
                      //   style={{ position: "relative" }}
                    >
                      {/* <GiRotaryPhone
                        style={{
                          //   position: "absolute",
                          fontSize: "30px",
                          color: "#fa6130",
                          cursor: "pointer",
                        }}
                      /> */}
                      <input
                        type="number"
                        name="phone_number"
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        id="floatingInput"
                        placeholder="Phone Number"
                      />
                    </div>
                    {phoneError && (
                      <span style={{ color: "red", fontSize: "15px" }}>
                        Please enter phone number
                      </span>
                    )}
                  </div>
                  <span className="mt-5 d-flex justify-content-center">
                    <IoIosArrowDropright
                      style={{
                        fontSize: "50px",
                        color: "#fa6130",
                        cursor: "pointer",
                      }}
                      onClick={(e) => goToNext(e)}
                    />
                  </span>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default PhoneNumberLogin;
