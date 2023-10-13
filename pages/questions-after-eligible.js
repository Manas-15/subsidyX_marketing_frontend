import Base from "@layouts/Baseof";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { useRouter } from "next/router";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { eligibleSubsidyAction } from "../redux/Actions/eligibleSubsidyAction";
import { districtManagementAction } from "../redux/Actions/districtManagementAction";
import { talukaManagementAction } from "../redux/Actions/talukaManagementAction";
import { reportManagementAction } from "redux/Actions/reportManagementAction";
import { BenefitsModal, CongratulationsModal } from "@layouts/components/Modal";
import withAuth from "@layouts/partials/withAuth";
import { Loader } from "@layouts/components/Loader";

const catData = [{ 1: [11, 12, 13] }, { 2: [14, 15, 16] }, { 3: [17, 18, 1] }];

const QuestionAfterEligible = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const subsidyData = useSelector((state) => state?.eligibleSubsidy);
  const subsidiesList = subsidyData?.eligible_subsidy?.subsidies;
  const question = subsidyData?.eligible_subsidy;
  const benefitsData = useSelector(
    (state) => state?.eligibleSubsidy?.benefits_data?.next
  );
  const benefitsNextData = benefitsData !== undefined ? benefitsData : false;

  const [checkedValue, setCheckedValue] = useState({
    name: "",
    value: "",
  });
  const [selectedOptions, setSelectedOptions] = useState({
    name: "",
    value: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [benefitsModalShow, setBenefitsModalShow] = useState(false);
  const [type, setType] = useState("");
  const [reportID, setReportID] = useState(null);
  const [next, setNext] = useState(benefitsNextData);
  const [allDataID, setAllDataID] = useState({
    district: 0,
    taluka: 0,
  });
  const [allData, setAllData] = useState({
    company_name: "",
    owner_name: "",
    district: "",
    taluka: "",
  });
  const [subsidyItems, setSubsidyItems] = useState();
  const [questionData, setQuestionData] = useState();
  // const [userInputError, setUserInputError] = useState(false);
  const allDistricts = useSelector((state) => state?.district);
  const allTalukas = useSelector((state) => state?.taluka);
  const [prevQueCount, setPrevQueCount] = useState(0);
  const [tempPrevQueStore, setTempPrevQueStore] = useState();
  const [backButtonVisible, setBackButtonVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (benefitsNextData) {
      const user_info = subsidyData?.selected_data?.user_info;
      if (user_info) {
        const data = { user_info };
        console.log(data);
        dispatch(eligibleSubsidyAction.getEligible(data));
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setBenefitsModalShow(true);
        }, 2000);
      }
    }
  }, []);

  useEffect(() => {
    const id = subsidyData?.selected_data?.user_info?.state_id;
    if (id) {
      dispatch(districtManagementAction?.getDistricts({ id: id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setQuestionData(question?.question);
  }, [question]);

  useEffect(() => {
    let questionCount = null;
    if (question?.question !== undefined && question?.question !== null) {
      questionCount = Object.keys(question?.question).length;
    }

    if (question?.previous_question?.length > 0) {
      const queCount = question?.previous_question?.length;
      setPrevQueCount(queCount);
    }

    if (questionCount === 0) {
      setType("noQuestion");
      dispatch(
        reportManagementAction?.getReportByID(
          subsidyData?.eligible_subsidy?.report_id
        )
      );
      console.log(
        "confirm report calling:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
      );
      router.push("/report/confirm-report");
    }
    if (questionData?.status === 205 && subsidiesList?.length === 0) {
      setModalShow(true);
      setType("warn");
      setReportID(subsidyData?.eligible_subsidy?.report_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subsidiesList]);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === "district") {
      const selectedOption = e.target.options[e.target.selectedIndex];
      // console.log(selectedOption?.value);
      // console.log(selectedOption?.text);
      setAllData({
        ...allData,
        [name]: selectedOption?.text,
      });
      setAllDataID({ ...allDataID, [name]: parseInt(value) });
      dispatch(talukaManagementAction?.getTalukas(value));
    } else if (name === "taluka") {
      const selectedOption = e.target.options[e.target.selectedIndex];
      setAllData({
        ...allData,
        [name]: selectedOption?.text,
      });
      setAllDataID({ ...allDataID, [name]: parseInt(value) });
    } else {
      setAllData({
        ...allData,
        [name]: value,
      });
      setAllDataID({ ...allDataID, [name]: value });
    }
  };

  const handleRadioClick = (e) => {
    const selectedOption = questionData?.options.find(
      (option) => option.id === parseInt(e.target.value)
    );
    if (selectedOption) {
      setCheckedValue({
        name: selectedOption.option,
        value: parseInt(e.target.value),
      });
    } else {
      // setUserInputError(true);
    }
  };
  const handleSelectAnswer = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    if (selectedOption?.text) {
      // setUserInputError(false);
      setSelectedOptions({
        name: selectedOption?.text,
        value: parseInt(e.target.value),
      });
    } else {
      // setUserInputError(true);
    }
  };

  const handleNext = () => {
    dispatch(talukaManagementAction.selectedData(allDataID));
    setNext(true);
  };

  useEffect(() => {
    setTempPrevQueStore(question?.previous_question);
  }, [question?.previous_question]);

  const goToPrev = () => {
    if (tempPrevQueStore?.length > 0) {
      setBackButtonVisible(true);
      let currentIndex = tempPrevQueStore?.length - 1;
      if (currentIndex === 0) {
        setBackButtonVisible(false);
      }
      if (currentIndex >= 0) {
        const currentItem = question?.previous_question[currentIndex]; //2 index ra value
        setQuestionData(currentItem);
        tempPrevQueStore?.splice(currentIndex, 1);
        setTempPrevQueStore(tempPrevQueStore);
      } else {
        console.log("Reached the beginning of the data array.");
      }
    }
  };

  const goToNext = () => {
    const user_info = subsidyData?.selected_data?.user_info;
    const datas = {
      user_info,
      response: {
        question_id: questionData?.id,
        option_id:
          selectedOptions?.value !== "" && selectedOptions?.value !== undefined
            ? parseInt(selectedOptions?.value)
            : checkedValue?.value !== "" && checkedValue?.value !== undefined
            ? checkedValue?.value
            : 0,
        response:
          selectedOptions?.name !== "" && selectedOptions?.name !== undefined
            ? selectedOptions?.name
            : inputValue !== ""
            ? inputValue
            : checkedValue?.name !== "" && checkedValue?.name !== undefined
            ? checkedValue?.name
            : "",
        subscheme_id: questionData?.subscheme_id,
        subsidy_id: questionData?.subsidy_id,
        taluka_id: allTalukas?.selected_data?.taluka,
        district_id: allTalukas?.selected_data?.district,
        company_name: allTalukas?.selected_data?.company_name,
        owner_name: allTalukas?.selected_data?.owner_name,
      },
      report_id: question?.report_id,
    };
    dispatch(eligibleSubsidyAction.getEligible(datas));
    if (questionData?.field_type_id === 3) {
      setSelectedOptions({ name: "", value: "" });
    } else if (questionData?.field_type_id === 2) {
      setCheckedValue({
        name: "",
        value: "",
      });
    }
    setInputValue("");
    setBackButtonVisible(true);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    if (questionData?.field_type_id === 1) {
      setInputValue(questionData?.response);
      setCheckedValue({
        name: "",
        value: "",
      });
      setSelectedOptions({
        name: "",
        value: "",
      });
    } else if (questionData?.field_type_id === 2) {
      setInputValue("");
      setCheckedValue({
        name: questionData?.response,
        value: questionData?.option_id,
      });
      setSelectedOptions({
        name: "",
        value: "",
      });
    } else {
      setInputValue("");
      setCheckedValue({
        name: "",
        value: "",
      });
      setSelectedOptions({
        name: questionData?.response,
        value: questionData?.option_id,
      });
    }
  }, [questionData?.response]);

  const clickId = allData?.taluka;

  useEffect(() => {
    // Find the category that contains the clickId
    const matchedCategory = catData.find((categoryObj) => {
      const categoryValues = Object.values(categoryObj)[0];
      return categoryValues.includes(parseInt(clickId));
    });

    if (matchedCategory) {
      const categoryName = Object.keys(matchedCategory)[0];

      setAllData((prevSelectedName) => ({
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

      const totalSubsidyNames = Object.keys(groupedSubsidies).length;
      let totalSchemeCount = 0;
      for (const key in groupedSubsidies) {
        totalSchemeCount += groupedSubsidies[key].length;
      }

      const data = (
        <div
          style={{
            marginTop: "10px",
            border: "1px solid black",
            borderRadius: "10px",
            backgroundColor: "#04032B",
            color: "white",
          }}
        >
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "220px",
              height: "180px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ fontSize: "14px" }}>Applicable Subsidies</span>
            <span style={{ fontSize: "30px", marginTop: "5px" }}>
              {questionData?.scheme_counter}
            </span>
          </div>
          {/* <p>Total Schemes: {totalSchemeCount}</p> */}
        </div>
      );

      // const data = Object.entries(groupedSubsidies).map(
      //   ([subsidyName, schemes]) => (
      //     <div key={subsidyName}>
      //       <p>{subsidyName}</p>
      //       <ol>
      //         {schemes.map((scheme, index) => (
      //           <li key={index}>
      //             <p style={{ fontSize: "15px" }}>{scheme}</p>
      //           </li>
      //         ))}
      //       </ol>
      //     </div>
      //   )
      // );

      setSubsidyItems(data);
    }
  }, [subsidiesList, questionData]);

  return (
    <Base
      title={"title"}
      description={"dgfdfsdfsffsfd"}
      meta_title={"meta_title"}
      image={"image"}
      noindex={"noindex"}
      canonical={"canonical"}
    >
      {benefitsModalShow && (
        <BenefitsModal
          action={question}
          show={benefitsModalShow}
          setModalShow={setBenefitsModalShow}
          onHide={() => setBenefitsModalShow(false)}
        />
      )}

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
          {loading && <Loader />}
          <div className="container">
            <div className="section pb-0">
              <div className="row inner-section">
                <div className="col-sm-10">
                  <div className="d-flex justify-content-center m-5">
                    <h3 style={{ fontSize: "23px" }}>
                      {questionData?.name
                        ? questionData?.name
                        : "No question available"}
                    </h3>
                  </div>
                  <div style={{ margin: "auto", width: "300px" }}>
                    <div className="d-flex justify-content-center flex-column">
                      {questionData?.field_type_id === 1 && (
                        <Form>
                          <Form.Group
                            className="mb-3"
                            // controlId="formBasicPassword"
                          >
                            <Form.Control
                              type="text"
                              name="name"
                              placeholder=" "
                              autoFocus
                              value={inputValue}
                              onChange={(e) => handleChange(e)}
                            />
                            {/* {userInputError === true && (
                              <p className="text-danger mt-1">
                                Please enter amount
                              </p>
                            )} */}
                          </Form.Group>
                        </Form>
                      )}

                      {questionData?.field_type_id === 2 && (
                        <>
                          {questionData?.options?.map((option, idx) => (
                            <div className="d-flex justify-content-center">
                              <input
                                type="radio"
                                name="subsidy"
                                value={option?.id}
                                checked={checkedValue?.value === option?.id}
                                style={{
                                  width: "20px",
                                  height: "24px",
                                  marginRight: "10px",
                                }}
                                onChange={(e) => handleRadioClick(e)}
                              />
                              <h3 style={{ fontSize: "20px" }}>
                                {option?.option}
                              </h3>
                            </div>
                          ))}
                        </>
                      )}

                      {questionData?.field_type_id === 3 && (
                        <>
                          <select
                            className="form-control"
                            onChange={(e) => handleSelectAnswer(e)}
                            value={selectedOptions?.value}
                          >
                            <option value="none">Please Select</option>
                            {questionData?.options?.map((opt, index) => (
                              <option key={index} value={opt.id}>
                                {opt.option}
                              </option>
                            ))}
                          </select>

                          {/* {userInputError === true && (
                            <p className="text-danger mt-1">
                              Please select user reponse
                            </p>
                          )} */}
                        </>
                      )}
                    </div>
                    <div className="mt-4 d-flex justify-content-center">
                      {/* prevQueCount !== 0 */}
                      {backButtonVisible && (
                        <IoIosArrowDropleft
                          style={{ fontSize: "50px", color: "#fa6130" }}
                          onClick={(e) => goToPrev(e)}
                          disabled={true}
                        />
                      )}
                      <IoIosArrowDropright
                        style={{
                          fontSize: "50px",
                          color: "#fa6130",
                          cursor: "pointer",
                        }}
                        onClick={(e) => goToNext(e)}
                      />
                    </div>

                    {questionData?.tooltip !== null &&
                      questionData?.tooltip !== undefined &&
                      questionData?.tooltip !== "" && (
                        <div className="mt-5 d-flex justify-content-center">
                          <div
                            style={{
                              marginTop: "100px",
                              border: "1px solid black",
                              borderRadius: "10px",
                              backgroundColor: "rgba(255, 190, 157, 0.3)",
                              color: "black",
                            }}
                          >
                            <div
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: "710px",
                                height: "87px",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "15px",
                                  width: "710px",
                                  overflowX: "scroll",
                                  padding: "15px 15px 0 15px",
                                }}
                              >
                                {questionData?.tooltip}
                              </span>
                            </div>
                            {/* <p>Total Schemes: {totalSchemeCount}</p> */}
                          </div>
                        </div>
                      )}
                  </div>
                </div>

                <div className="col-sm-2">
                  {/* <div className="d-flex justify-content-end">
                    <CustomButton
                      name="Restart Session"
                      color="#FFFFFF"
                      width="200px"
                      bgColor="#FA6130"
                      onClick={(e) => restartSession(e)}
                      className="position-relative"
                    />
                  </div> */}
                  {/* <div className="d-flex my-5">
                    <h4
                      style={{
                        textDecoration: "underline",
                        fontWeight: "500",
                        visibility: "hidden",
                      }}
                    >
                      Displaying eligible subsidies
                    </h4>
                  </div> */}
                  <div className="mt-5">
                    <div className="d-flex">
                      <p style={{ marginLeft: "15px" }}>{subsidyItems}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="col-12 inner-section ">
          {/* {isLoading && <Loader />} */}

          <>
            <div className="d-flex justify-content-center mt-5 mb-5">
              <h2 className="fw-bold text-dark">
                Enter your Organization Name, User Name, District and Taluka
              </h2>
            </div>
            <div style={{ margin: "auto" }}>
              <div className="d-flex justify-content-center">
                <input
                  name="company_name"
                  type="text"
                  onChange={(e) => handleSelectChange(e)}
                  className="form-control mb-3 w-25"
                  placeholder="Enter Organization Name"
                />
              </div>

              <div className="d-flex justify-content-center">
                <input
                  name="owner_name"
                  type="text"
                  onChange={(e) => handleSelectChange(e)}
                  className="form-control mb-3 w-25"
                  placeholder="Enter User Name"
                />
              </div>
              {/* <div className="mt-5 d-flex justify-content-center">
               
                <IoIosArrowDropright
                  style={{
                    fontSize: "50px",
                    color: "#fa6130",
                    cursor: "pointer",
                  }}
                  onClick={(e) => handleNext(e)}
                />
              </div> */}
            </div>
          </>
          <>
            {/* <div className="d-flex justify-content-center mt-5 mb-5">
              <h2 className="fw-bold text-dark">
               
              </h2>
            </div> */}
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

              <div className="d-flex justify-content-center mt-1">
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
          </>
        </div>
      )}
    </Base>
  );
};

export default withAuth(QuestionAfterEligible);
