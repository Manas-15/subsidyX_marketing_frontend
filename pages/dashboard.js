import Base from "@layouts/Baseof";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoIosArrowDropright } from "react-icons/io";
import EligibleSubsidy from "@layouts/components/eligibleSubsidy";
import { eligibleSubsidyAction } from "redux/Actions/eligibleSubsidyAction";
import { useDispatch, useSelector } from "react-redux";
import { CongratulationsModal } from "@layouts/components/Modal";

const Dashboard = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [next, setNext] = useState(false);
  const [selectedRadioButton, setSelectedRadioButton] = useState(0);
  const [gstNumber, setGSTNumber] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [gstData, setGstData] = useState(false);
  const [type, setType] = useState("");
  const [validateAadhar, setValidateAadhar] = useState();
  const { edit } = router?.query;

  const gstNumberData = useSelector(
    (state) => state?.eligibleSubsidy?.gst_number_data
  );
  const eligibleSubsidy = useSelector(
    (state) => state?.eligibleSubsidy?.eligible_subsidy
  );

  useEffect(() => {
    const data = {
      user_info: {
        mobile_number: 9784596522,
        state_id:
          gstNumberData?.state_id !== undefined ? gstNumberData?.state_id : 0,
        industry_category_id:
          gstNumberData?.industry_id > 0 ? gstNumberData?.industry_id?.[0] : 0,
        industry_sector_id:
          gstNumberData?.industry_sector_id !== undefined
            ? gstNumberData?.industry_sector_id
            : 0,
      },
    };
    if (gstData && data) {
      console.log("GET ELIGIBLE");
      dispatch(eligibleSubsidyAction.getEligible(data));
      dispatch(eligibleSubsidyAction.selectedDataForEligibleSubsidy(data));
      setModalShow(true);
      setType("gst");
    }
  }, [gstNumberData?.state_id, gstData]);

  const handleRadioClick = (e) => {
    setSelectedRadioButton(e.target.value);
  };

  const goToNext = () => {
    setNext(true);
    console.log(gstNumber);
    if (gstNumber !== "") {
      setGstData(true);
      dispatch(eligibleSubsidyAction.getDetailsOfGST(gstNumber));
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const udaymName = value.split("-")[0];
    console.log(udaymName);
    let regex = new RegExp(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    );
    const str = value;

    if (udaymName === "UDYAM") {
      setGSTNumber(value);
    } else if (regex.test(str) == true) {
      // setValidateAadhar(false);
      setGSTNumber(value);
    } else {
      console.log("error");
      // setValidateAadhar(true);
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
                action={eligibleSubsidy}
                show={modalShow}
                setModalShow={setModalShow}
                onHide={() => setModalShow(false)}
                setNext={setNext}
                setGstData={setGstData}
                setGSTNumber={setGSTNumber}
                setSelectedRadioButton={setSelectedRadioButton}
              />
            )}
            {next && selectedRadioButton === "1" ? (
              <>
                <div className="col-12 inner-section ">
                  <div className="d-flex justify-content-center mt-5 mb-5">
                    <h2 style={{ fontSize: "25px" }}>
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
                          value={gstNumber}
                          onChange={(e) => handleChange(e)}
                        />
                        {validateAadhar === false && (
                          <p className="text-success mt-1">
                            GST number verified
                          </p>
                        )}
                        {validateAadhar === true && (
                          <p className="text-danger mt-1">
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
                  <h2 style={{ fontSize: "25px" }}>
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
                        width: "20px",
                        height: "25px",
                        marginRight: "10px",
                      }}
                      onChange={(e) => handleRadioClick(e)}
                    />
                    <h3 style={{ fontSize: "19px" }}>YES</h3>
                  </div>

                  <div className="d-flex justify-content-center">
                    <input
                      type="radio"
                      name="udyamAadhar"
                      value="2"
                      // checked={false}
                      style={{
                        width: "20px",
                        height: "25px",
                        marginRight: "10px",
                      }}
                      onChange={(e) => handleRadioClick(e)}
                    />
                    <h3 style={{ fontSize: "19px" }}>NO</h3>
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
