import Base from "@layouts/Baseof";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { useRouter } from "next/router";
import { Form } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { eligibleSubsidyAction } from "../redux/Actions/eligibleSubsidyAction";
import { CustomButton } from "@layouts/components/CustomButton";
import { CongratulationsModal } from "@layouts/components/Modal";
import { districtManagementAction } from "../redux/Actions/districtManagementAction";
import { talukaManagementAction } from "../redux/Actions/talukaManagementAction";

const QuestionAfterEligible = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const multiselectRef = useRef();

  const [checkedValue, setCheckedValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [reportID, setReportID] = useState(null);
  const [next, setNext] = useState(false);
  const [talukaCategoryName, setTalukaCategoryName] = useState("");
  const [districtData, setDistrictData] = useState({
    district: 0,
    taluka: 0,
  });
  const [allSelectedName, setAllSelectedName] = useState({
    district: "",
    taluka: "",
  });

  const allDistricts = useSelector((state) => state?.district);
  const allTalukas = useSelector((state) => state?.taluka);
  const subsidyData = useSelector((state) => state?.eligibleSubsidy);
  const questionData = subsidyData?.eligible_subsidy;
  const subsidiesList = subsidyData?.eligible_subsidy?.subsidies;

  // console.log(Object.keys(questionData?.question).length === 0);

  useEffect(() => {
    if (subsidyData?.selected_data?.user_info?.state_id) {
      dispatch(
        districtManagementAction?.getDistricts(
          subsidyData?.selected_data?.user_info?.state_id
        )
      );
    }
  }, []);

  useEffect(() => {
    if (questionData?.status === 408) {
      setModalShow(true);
      setType("noQuestion");
      setReportID(subsidyData?.eligible_subsidy?.report_id);
    }
    if (questionData?.status === 408 && subsidiesList?.length === 0) {
      setModalShow(true);
      setType("warn");
      setReportID(subsidyData?.eligible_subsidy?.report_id);
    }
  }, [subsidiesList]);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    const selectedOption = e.target.options[e.target.selectedIndex];
    // console.log(selectedOption?.value);
    // console.log(selectedOption?.text);
    setAllSelectedName({ ...allSelectedName, [name]: selectedOption?.text });

    setDistrictData({ ...districtData, [name]: value });
    if (name === "district") {
      dispatch(talukaManagementAction?.getTalukas(value));
    }
  };

  const handleRadioClick = (e) => {
    setCheckedValue(e.target.value);
  };

  const restartSession = () => {
    dispatch(eligibleSubsidyAction.clearEligible());
    router.push("/dashboard");
  };

  const handleNext = () => {
    dispatch(talukaManagementAction.selectedData(allSelectedName));
    setNext(true);
  };

  const goToNext = () => {
    const user_info = subsidyData?.selected_data?.user_info;
    const datas = {
      user_info,
      response: {
        question_id: questionData?.question?.id,
        option_id: selectedOptions?.[0]?.id ? selectedOptions?.[0]?.id : 0,
        response: selectedOptions?.[0]?.option
          ? selectedOptions?.[0]?.option
          : inputValue !== ""
          ? inputValue
          : checkedValue !== ""
          ? checkedValue
          : "",
        subscheme_id: questionData?.question?.subscheme_id,
        subsidy_id: questionData?.question?.subsidy_id,
      },
      report_id: questionData?.report_id,
    };
    dispatch(eligibleSubsidyAction.getEligible(datas));

    if (questionData?.question?.field_type_id === 3) {
      multiselectRef.current.resetSelectedValues();
      setSelectedOptions([]);
    }
    setInputValue("");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleMultiValueSelect = (event) => {
    setSelectedOptions(event);
  };

  const handleMultiValueRemove = (event) => {
    setSelectedOptions(event);
  };

  const catData = [
    { 1: [11, 12, 13] },
    { 2: [14, 15, 16] },
    { 3: [17, 18, 1] },
  ];

  const clickId = districtData?.taluka;
  // console.log(districtData?.taluka, clickId);

  useEffect(() => {
    // Find the category that contains the clickId
    const matchedCategory = catData.find((categoryObj) => {
      const categoryValues = Object.values(categoryObj)[0];
      return categoryValues.includes(parseInt(clickId));
    });

    if (matchedCategory) {
      const categoryName = Object.keys(matchedCategory)[0];
      console.log(categoryName);
      // setTalukaCategoryName(categoryName);
      setAllSelectedName((prevSelectedName) => ({
        ...prevSelectedName,
        category: categoryName,
      }));
    }
  }, [clickId]);

  return (
    <Base
      title={"title"}
      description={"dgfdfsdfsffsfd"}
      meta_title={"meta_title"}
      image={"image"}
      noindex={"noindex"}
      canonical={"canonical"}
    >
      {modalShow && (
        <CongratulationsModal
          type={type}
          action={reportID}
          show={modalShow}
          setModalShow={setModalShow}
          onHide={() => setModalShow(false)}
        />
      )}
      {next ? (
        <section className="section bg-inner">
          <div className="container">
            <div className="section pb-0">
              <div className="row inner-section">
                <div className="col-sm-8">
                  <div className="d-flex justify-content-center m-5">
                    <h3 className="fw-bold">
                      {questionData?.question?.name
                        ? questionData?.question?.name
                        : "No question available"}
                    </h3>
                  </div>
                  <div style={{ margin: "auto", width: "300px" }}>
                    <div className="d-flex justify-content-center flex-column">
                      {questionData?.question?.field_type_id === 1 && (
                        <Form>
                          <Form.Group
                            className="mb-3"
                            // controlId="formBasicPassword"
                          >
                            <Form.Control
                              type="text"
                              name="name"
                              placeholder="Enter Amount"
                              autoFocus
                              value={inputValue}
                              onChange={(e) => handleChange(e)}
                            />
                          </Form.Group>
                        </Form>
                      )}

                      {questionData?.question?.field_type_id === 2 && (
                        <>
                          <div className="d-flex justify-content-center">
                            <input
                              type="radio"
                              name="subsidy"
                              value="Yes"
                              // checked={false}
                              style={{
                                width: "30px",
                                height: "30px",
                                marginRight: "10px",
                              }}
                              onChange={(e) => handleRadioClick(e)}
                            />
                            <h3>Yes</h3>
                          </div>

                          <div className="d-flex justify-content-center">
                            <input
                              type="radio"
                              name="subsidy"
                              value="No"
                              // checked={true}
                              style={{
                                width: "30px",
                                height: "30px",
                                marginRight: "10px",
                              }}
                              onChange={(e) => handleRadioClick(e)}
                            />
                            <h3>No</h3>
                          </div>
                        </>
                      )}
                      {questionData?.question?.field_type_id === 3 && (
                        <Multiselect
                          showCheckbox
                          placeholder="Please Select"
                          options={questionData?.question?.options}
                          ref={multiselectRef}
                          // closeOnSelect="true"
                          className="text-dark"
                          onSelect={(event) => {
                            handleMultiValueSelect(event);
                          }}
                          onRemove={(event) => handleMultiValueRemove(event)}
                          displayValue="option"
                        />
                      )}
                    </div>

                    <div className="mt-4 d-flex justify-content-center">
                      {/* <IoIosArrowDropleft
                      style={{ fontSize: "50px", color: "#fa6130" }}
                      onClick={(e) => goToPrev(e)}
                    /> */}
                      <IoIosArrowDropright
                        style={{ fontSize: "50px", color: "#fa6130" }}
                        onClick={(e) => goToNext(e)}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="d-flex justify-content-end">
                    <CustomButton
                      name="Restart Session"
                      color="#FFFFFF"
                      width="200px"
                      bgColor="#FA6130"
                      onClick={(e) => restartSession(e)}
                      className="position-relative"
                    />
                  </div>
                  <div className="d-flex  mb-5 mt-3">
                    <h4
                      style={{ textDecoration: "underline", fontWeight: "500" }}
                    >
                      Displaying eligible subsidies
                    </h4>
                  </div>
                  <div className="mt-5">
                    <div className="d-flex">
                      <p style={{ marginLeft: "15px" }}>
                        {subsidiesList?.[0]?.subsidy_name}
                      </p>
                    </div>
                    {/* {subsidiesList?.map((sub, index) => {
                      return (
                        <div key={index} className="d-flex">
                          {index + 1}{" "}
                          <p style={{ marginLeft: "15px" }}>
                            {sub?.subsidy_name}
                          </p>
                        </div>
                      );
                    })} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="col-12 inner-section ">
          {/* {isLoading && <Loader />} */}

          <div className="d-flex justify-content-center mt-5 mb-5">
            <h2 className="fw-bold text-dark">
              Hey!! Do you have Udyam Aadhar Number or GST Number?
            </h2>
          </div>
          <div style={{ margin: "auto" }}>
            <div className="d-flex justify-content-center">
              <select
                className="form-control mb-3 w-25"
                name="district"
                onChange={(e) => handleSelectChange(e)}
              >
                <option value="none">Select District</option>
                {allDistricts?.districtManagementData?.district?.map(
                  (district, index) => (
                    <option
                      key={index}
                      className="form-control"
                      value={district?.id}
                    >
                      {district?.name}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="d-flex justify-content-center mt-3">
              <select
                className="form-control mb-3 w-25 mx-3"
                name="taluka"
                onChange={(e) => handleSelectChange(e)}
              >
                <option value="none">Select Taluka</option>
                {allTalukas?.talukaManagementData?.talukas?.map(
                  (taluka, index) => (
                    <option
                      key={index}
                      className="form-control"
                      value={taluka?.id}
                    >
                      {taluka?.name}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="mt-5 d-flex justify-content-center">
              {/* <IoIosArrowDropleft
              style={{ fontSize: "50px", color: "#fa6130" }}
              onClick={(e) => goToNext(e)}
            /> */}
              <IoIosArrowDropright
                style={{ fontSize: "50px", color: "#fa6130" }}
                onClick={(e) => handleNext(e)}
              />
            </div>
          </div>
        </div>
      )}
    </Base>
  );
};

export default QuestionAfterEligible;
