import Base from "@layouts/Baseof";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { eligibleSubsidyAction } from "redux/Actions/eligibleSubsidyAction";
import { useFormik } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import { ContactUsSchema } from "@layouts/components/Validation";
import { CustomButton } from "@layouts/components/CustomButton";
import { contactUsAction } from "redux/Actions/contactUsAction";

const Contact = ({ data }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const extraData = {
      next: false,
      path: "",
    };
    dispatch(eligibleSubsidyAction.benefitsData(extraData));
    dispatch(eligibleSubsidyAction.clearEligible());
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_number: "",
      message: "",
    },
    validationSchema: ContactUsSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      dispatch(contactUsAction?.createContact(values));
      resetForm();
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
      <section className="section bg-inner">
        <div className="container">
          <div className="section row pb-0">
            <div className="col-12 inner-section">
              <div className="row">
                <div className="col-md-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3777315.094822953!2d68.68432052415811!3d22.399488637279987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959051f5f0ef795%3A0x861bd887ed54522e!2sGujarat!5e0!3m2!1sen!2sin!4v1684931772798!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="col-md-6">
                  <Form onSubmit={formik.handleSubmit}>
                    <h2 className="fw-bold text-dark d-flex justify-content-center">
                      Please provide your Details
                    </h2>
                    <div className="mt-5">
                      <Row>
                        <Col>
                          <Form.Group className="mb-3" controlId="name">
                            <Form.Control
                              style={{
                                padding: "0.5rem",
                                border: "2px solid rgba(0,0,0,0.2)",
                                borderRadius: "10px",
                              }}
                              placeholder="Name"
                              type="text"
                              name="name"
                              value={formik.values.name}
                              onChange={formik.handleChange}
                              isInvalid={
                                formik.touched.name && formik.errors.name
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.name}
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
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3" controlId="phone_number">
                            <Form.Control
                              style={{
                                padding: "0.5rem",
                                border: "2px solid rgba(0,0,0,0.2)",
                                borderRadius: "10px",
                              }}
                              placeholder="Phone Number"
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
                      <Row>
                        <Col>
                          <Form.Group className="mb-3" controlId="message">
                            <Form.Control
                              as="textarea"
                              style={{
                                padding: "0.5rem",
                                border: "2px solid rgba(0,0,0,0.2)",
                                borderRadius: "10px",
                              }}
                              placeholder="Enter your message"
                              type="text"
                              name="message"
                              value={formik.values.message}
                              onChange={formik.handleChange}
                              isInvalid={
                                formik.touched.message && formik.errors.message
                              }
                              rows={4}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.message}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <div className=" d-flex justify-content-end">
                        <CustomButton
                          name="Send Message"
                          type="submit"
                          color="#FFFFFF"
                          bgColor="#FA6130"
                        />
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            <div className="content col-12 md:col-6 lg:col-5"></div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Contact;
