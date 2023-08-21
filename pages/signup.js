import Base from "@layouts/Baseof";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "redux/Actions/userAction";
import Link from "next/link";
import { useMemo } from "react";
import jwt from "jsonwebtoken";
import { SignupSchema } from "@layouts/components/Validation";
import { useFormik } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import { CustomButton } from "@layouts/components/CustomButton";

const Signup = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);

  useEffect(() => {
    if (
      user?.sign_up_user?.detail?.error_msg ===
      "Email or phone_number already exist"
    ) {
      router.push("/signup");
    } else if (user?.sign_up_user) {
      router.push("/login");
    } else {
      router.push("/signup");
    }
  }, [user?.sign_up_user]);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      // console.log(values);
      const signupData = values;
      dispatch(userActions.signup(signupData));
    },
  });

  return (
    <Base
      title={"title"}
      description={"dgfdfsdfsffsfd"}
      meta_title={"meta_title"}
      image={"image"}
      noindex={"noindex"}
      canonical={"canonical"}
    >
      <section
        className="section bg-inner"
        style={{
          backgroundColor: "#262555",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div className="container">
          <div className="section row pb-0">
            <div className="col-12 signup-section">
              <Form onSubmit={formik.handleSubmit}>
                <h2 className="fw-bold text-white">
                  Please provide your Details
                </h2>
                <div>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="first_name">
                        <Form.Control
                          style={{
                            padding: "0.5rem",
                            border: "2px solid rgba(0,0,0,0.2)",
                            borderRadius: "10px",
                          }}
                          placeholder="First Name"
                          type="text"
                          name="first_name"
                          value={formik.values.first_name}
                          onChange={formik.handleChange}
                          isInvalid={
                            formik.touched.first_name &&
                            formik.errors.first_name
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.first_name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group className="mb-3" controlId="last_name">
                        <Form.Control
                          style={{
                            padding: "0.5rem",
                            border: "2px solid rgba(0,0,0,0.2)",
                            borderRadius: "10px",
                          }}
                          placeholder="Last Name"
                          type="text"
                          name="last_name"
                          value={formik.values.last_name}
                          onChange={formik.handleChange}
                          isInvalid={
                            formik.touched.last_name && formik.errors.last_name
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.last_name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Control
                          style={{
                            padding: "0.5rem",
                            border: "2px solid rgba(0,0,0,0.2)",
                            borderRadius: "10px",
                          }}
                          placeholder="Email"
                          type="email"
                          name="email"
                          value={formik?.values?.email}
                          onChange={formik.handleChange}
                          isInvalid={
                            formik.touched.email && formik.errors.email
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="phone_number">
                        <Form.Control
                          style={{
                            padding: "0.5rem",
                            border: "2px solid rgba(0,0,0,0.2)",
                            borderRadius: "10px",
                          }}
                          placeholder="Contact Number"
                          type="number"
                          name="phone_number"
                          maxLength={10}
                          value={formik.values.phone_number}
                          onChange={formik.handleChange}
                          isInvalid={
                            formik.touched.phone_number &&
                            formik.errors.phone_number
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.phone_number}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-end">
                    <CustomButton
                      name="Submit"
                      color="#FFFFFF"
                      bgColor="#FA6130"
                      type="submit"
                    />
                    <CustomButton
                      name="Cancel"
                      color="#000000"
                      bgColor="#FFFFFF"
                      border="1px solid #000000"
                      type={"button"}
                      onClick={() => {
                        // router.push("/clients/client_management");
                      }}
                    />
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
