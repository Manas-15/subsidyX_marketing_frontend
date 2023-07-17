import Base from "@layouts/Baseof";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoIosArrowDropright } from "react-icons/io";
import EligibleSubsidy from "@layouts/components/eligibleSubsidy";
import { CongratulationsModal } from "@layouts/components/Modal";
import { eligibleSubsidyAction } from "redux/Actions/eligibleSubsidyAction";
import { useDispatch } from "react-redux";

const Dashboard = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [next, setNext] = useState(false);
  const [selectedRadioButton, setSelectedRadioButton] = useState(0);
  const [aadharNumber, setAadharNumber] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [validateAadhar, setValidateAadhar] = useState();
  const { edit } = router?.query;
  console.log(edit);
  const handleRadioClick = (e) => {
    setSelectedRadioButton(e.target.value);
  };

  const goToNext = () => {
    setNext(true);
    if (aadharNumber !== "") {
      setModalShow(true);
      setType("success");
      dispatch(eligibleSubsidyAction.savedAadharNumber(aadharNumber));
    }
  };

  const handleChange = (e) => {
    let regex = new RegExp(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    );
    const str = e.target.value;
    if (regex.test(str) == true) {
      setValidateAadhar(false);
      setAadharNumber(e.target.value);
    } else {
      setValidateAadhar(true);
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
      <section className="section">
        <div className="container">
          <div className="section row pb-0">
          
            {modalShow && selectedRadioButton === "1" && next && (
              <CongratulationsModal
                type={type}
                setType={setType}
                // action={eligibleSubsidy}
                show={modalShow}
                setModalShow={setModalShow}
                onHide={() => setModalShow(false)}
                setNext={setNext}
                setAadharNumber={setAadharNumber}
                setSelectedRadioButton={setSelectedRadioButton}
              />
            )}
            {next && selectedRadioButton === "1" ? (
              <>
                <div className="col-12 inner-section ">
                  <div className="d-flex justify-content-center mt-5 mb-5">
                    <h2 className="fw-bold text-dark">
                      Please provide Udyam Registration Number or GST Number?
                    </h2>
                  </div>
                  <div className="d-flex justify-content-center">
                    <Form>
                      <Form.Group
                        className="mb-3 "
                        // controlId="formBasicPassword"
                      >
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="UDYAM AADHAR NUMBER / GST NUMBER"
                          autoFocus
                          // value={inputValue}
                          onChange={(e) => handleChange(e)}
                        />
                        {validateAadhar === false && (
                          <p className="text-success">GST number verified</p>
                        )}
                        {validateAadhar === true && (
                          <p className="text-danger">
                            Please enter valid GST Number
                          </p>
                        )}
                      </Form.Group>
                    </Form>
                  </div>
                  <div className="mt-5 d-flex justify-content-center">
                    <IoIosArrowDropright
                      style={{
                        fontSize: "50px",
                        color: "#fa6130",
                        cursor: "pointer",
                      }}
                      onClick={(e) => goToNext(e)}
                    />
                  </div>
                </div>
              </>
            ) : next && selectedRadioButton === "2" ? (
              <EligibleSubsidy
                edit={edit}
                setNext={setNext}
                setSelectedRadioButton={setSelectedRadioButton}
              />
            ) : (
              <div className="col-12 inner-section ">
                <div className="d-flex justify-content-center mt-5 mb-5">
                  <h2 className="fw-bold text-dark">
                    Hey!! Do you have Udyam Aadhar Number or GST Number?
                  </h2>
                </div>
                <div style={{ margin: "auto" }}>
                  <div className="d-flex justify-content-center">
                    <input
                      type="radio"
                      name="udyamAadhar"
                      value="1"
                      // checked={true}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "10px",
                      }}
                      onChange={(e) => handleRadioClick(e)}
                    />
                    <h3 className="text-dark">YES</h3>
                  </div>

                  <div className="d-flex justify-content-center">
                    <input
                      type="radio"
                      name="udyamAadhar"
                      value="2"
                      // checked={false}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "10px",
                      }}
                      onChange={(e) => handleRadioClick(e)}
                    />
                    <h3 className="fw-bold text-dark">NO</h3>
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
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Dashboard;
