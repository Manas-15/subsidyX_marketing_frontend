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
import { districtManagementAction } from "../redux/Actions/districtManagementAction";
import { talukaManagementAction } from "../redux/Actions/talukaManagementAction";
import { reportManagementAction } from "redux/Actions/reportManagementAction";
import { CongratulationsModal } from "@layouts/components/Modal";

const catData = [{ 1: [11, 12, 13] }, { 2: [14, 15, 16] }, { 3: [17, 18, 1] }];

const QuestionAfterEligible = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [checkedValue, setCheckedValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({
    name: "",
    value: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [reportID, setReportID] = useState(null);
  const [next, setNext] = useState(false);
  const [isCompanyPage, setIsCompanyPage] = useState(true);
  const [districtTalukaID, setDistrictTalukaID] = useState({
    district: 0,
    taluka: 0,
  });
  const [districtTalukaName, setDistrictTalukaName] = useState({
    district: "",
    taluka: "",
  });
  const [subsidyItems, setSubsidyItems] = useState();

  const allDistricts = useSelector((state) => state?.district);
  const allTalukas = useSelector((state) => state?.taluka);
  const subsidyData = useSelector((state) => state?.eligibleSubsidy);
  const questionData = subsidyData?.eligible_subsidy;
  const subsidiesList = subsidyData?.eligible_subsidy?.subsidies;

  // console.log(Object.keys(questionData?.question).length === true);

  useEffect(() => {
    if (subsidyData?.selected_data?.user_info?.state_id) {
      dispatch(
        districtManagementAction?.getDistricts(
          subsidyData?.selected_data?.user_info?.state_id
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const questionCount =
      Object.keys(questionData?.question) !== undefined ||
      Object.keys(questionData?.question) !== null
        ? Object.keys(questionData?.question)?.length
        : null;
    console.log(questionCount);
    if (questionCount === 0) {
      // setModalShow(true);
      setType("noQuestion");
      dispatch(
        reportManagementAction?.getReportByID(
          subsidyData?.eligible_subsidy?.report_id
        )
      );
      console.log("Go to confirm report screen");
      router.push("/report/confirm-report");
      // setReportID(subsidyData?.eligible_subsidy?.report_id);
    }
    if (questionData?.status === 205 && subsidiesList?.length === 0) {
      setModalShow(true);
      setType("warn");
      setReportID(subsidyData?.eligible_subsidy?.report_id);
      console.log("When subsidies is not available");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subsidiesList]);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    const selectedOption = e.target.options[e.target.selectedIndex];
    // console.log(selectedOption?.value);
    // console.log(selectedOption?.text);
    setDistrictTalukaName({
      ...districtTalukaName,
      [name]: selectedOption?.text,
    });
    setDistrictTalukaID({ ...districtTalukaID, [name]: parseInt(value) });

    if (name === "district") {
      dispatch(talukaManagementAction?.getTalukas(value));
    }
  };

  const handleRadioClick = (e) => {
    setCheckedValue(e.target.value);
  };

  const handleNext = () => {
    dispatch(talukaManagementAction.selectedData(districtTalukaID));
    setNext(true);
  };

  //377
  const goToNext = () => {
    if (questionData?.question?.field_type_id === 3) {
      setSelectedOptions({ name: "", value: "" });
    }
    const user_info = subsidyData?.selected_data?.user_info;
    const datas = {
      user_info,
      response: {
        question_id: questionData?.question?.id,
        option_id:
          selectedOptions?.value !== "" ? parseInt(selectedOptions?.name) : 0,
        response:
          selectedOptions?.value !== ""
            ? selectedOptions?.value
            : inputValue !== ""
            ? inputValue
            : checkedValue !== ""
            ? checkedValue
            : "",
        subscheme_id: questionData?.question?.subscheme_id,
        subsidy_id: questionData?.question?.subsidy_id,
        taluka_id: allTalukas?.selected_data?.taluka,
        district_id: allTalukas?.selected_data?.district,
      },
      report_id: questionData?.report_id,
    };
    dispatch(eligibleSubsidyAction.getEligible(datas));
    setInputValue("");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectAnswer = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setSelectedOptions({
      name: e.target.value,
      value: selectedOption?.text,
    });
  };

  const clickId = districtTalukaName?.taluka;

  useEffect(() => {
    // Find the category that contains the clickId
    const matchedCategory = catData.find((categoryObj) => {
      const categoryValues = Object.values(categoryObj)[0];
      return categoryValues.includes(parseInt(clickId));
    });

    if (matchedCategory) {
      const categoryName = Object.keys(matchedCategory)[0];

      setDistrictTalukaName((prevSelectedName) => ({
        ...prevSelectedName,
        category: categoryName,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickId]);

  // Group the subsidies by subsidy_name start
  useEffect(() => {
    //groupby subsidies list using same subsidy name
    if (subsidiesList !== undefined) {
      const groupedSubsidies = subsidiesList?.reduce((acc, subsidy) => {
        if (!acc[subsidy.subsidy_name]) {
          acc[subsidy.subsidy_name] = [];
        }
        acc[subsidy.subsidy_name].push(subsidy.scheme);
        return acc;
      }, {});

      const data = Object.entries(groupedSubsidies).map(
        ([subsidyName, schemes]) => (
          <div key={subsidyName}>
            <p>{subsidyName}</p>
            <ol>
              {schemes.map((scheme, index) => (
                <li key={index}>
                  <p style={{ fontSize: "15px" }}>{scheme}</p>
                </li>
              ))}
            </ol>
          </div>
        )
      );
      setSubsidyItems(data);
    }
  }, [subsidiesList]);

  console.log(questionData);
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
        <section className="section">
          <div className="container">
            <div className="section pb-0">
              <div className="row inner-section">
                <div className="col-sm-12">
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
                        <select
                          className="form-control"
                          onChange={(e) => handleSelectAnswer(e)}
                          value={selectedOptions.name}
                        >
                          <option value="none">Please Select</option>
                          {questionData?.question?.options?.map(
                            (opt, index) => (
                              <option key={index} value={opt.id}>
                                {opt.option}
                              </option>
                            )
                          )}
                        </select>
                      )}
                    </div>

                    <div className="mt-4 d-flex justify-content-center">
                      {/* <IoIosArrowDropleft
                      style={{ fontSize: "50px", color: "#fa6130" }}
                      onClick={(e) => goToPrev(e)}
                    /> */}
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
                </div>

                {/* <div className="col-sm-4">
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
                  <div className="d-flex my-5">
                    <h4
                      style={{ textDecoration: "underline", fontWeight: "500" }}
                    >
                      Displaying eligible subsidies
                    </h4>
                  </div>
                  <div className="mt-5">
                    <div className="d-flex">
                      <p style={{ marginLeft: "15px" }}>{subsidyItems}</p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      ) : (
        // isCompanyPage ? (
        //   <div className="col-12 inner-section ">
        //     {/* {isLoading && <Loader />} */}

        //     <div className="d-flex justify-content-center mt-5 mb-5">
        //       <h2 className="fw-bold text-dark">
        //         Enter your Company Name and Owner Name
        //       </h2>
        //     </div>
        //     <div style={{ margin: "auto" }}>
        //       <div className="d-flex justify-content-center">
        //         <select
        //           className="form-control mb-3 w-25"
        //           name="district"
        //           onChange={(e) => handleSelectChange(e)}
        //         >
        //           <option value="none">Select District</option>
        //           {allDistricts?.districtManagementData?.district?.map(
        //             (district, index) => (
        //               <option
        //                 key={index}
        //                 className="form-control"
        //                 value={district?.id}
        //               >
        //                 {district?.name}
        //               </option>
        //             )
        //           )}
        //         </select>
        //       </div>

        //       <div className="d-flex justify-content-center mt-3">
        //         <select
        //           className="form-control mb-3 w-25 mx-3"
        //           name="taluka"
        //           onChange={(e) => handleSelectChange(e)}
        //         >
        //           <option value="none">Select Taluka</option>
        //           {allTalukas?.talukaManagementData?.talukas?.map(
        //             (taluka, index) => (
        //               <option
        //                 key={index}
        //                 className="form-control"
        //                 value={taluka?.id}
        //               >
        //                 {taluka?.name}
        //               </option>
        //             )
        //           )}
        //         </select>
        //       </div>
        //       <div className="mt-5 d-flex justify-content-center">
        //         {/* <IoIosArrowDropleft
        //         style={{ fontSize: "50px", color: "#fa6130" }}
        //         onClick={(e) => goToNext(e)}
        //       /> */}
        //         <IoIosArrowDropright
        //           style={{
        //             fontSize: "50px",
        //             color: "#fa6130",
        //             cursor: "pointer",
        //           }}
        //           onClick={(e) => handleNext(e)}
        //         />
        //       </div>
        //     </div>
        //   </div>
        // ) :

        <div className="col-12 inner-section ">
          {/* {isLoading && <Loader />} */}

          <div className="d-flex justify-content-center mt-5 mb-5">
            <h2 className="fw-bold text-dark">
              Select your District and Taluka
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
                style={{
                  fontSize: "50px",
                  color: "#fa6130",
                  cursor: "pointer",
                }}
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
