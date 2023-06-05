import Base from "@layouts/Baseof";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { useRouter } from "next/router";
import { Form } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { eligibleSubsidyAction } from "redux/Actions/eligibleSubsidyAction";

const QuestionAfterEligible = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const multiselectRef = useRef();

  const [checkedValue, setCheckedValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const subsidyData = useSelector((state) => state?.eligibleSubsidy);
  const questionData = subsidyData?.eligible_subsidy;
  const subsidiesList = subsidyData?.eligible_subsidy?.subsidies;
  console.log(selectedOptions);
  console.log(inputValue);

  const handleRadioClick = (e) => {
    setCheckedValue(e.target.value);
  };

  const goToPrev = () => {
    dispatch(eligibleSubsidyAction.clearEligible());
    router.push("/dashboard");
  };

  const goToNext = () => {
    console.log(
      selectedOptions?.[0]?.option,
      selectedOptions?.[0]?.id,
      "LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL"
    );
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
    console.log(datas);
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
                    <IoIosArrowDropleft
                      style={{ fontSize: "50px", color: "#fa6130" }}
                      onClick={(e) => goToPrev(e)}
                    />
                    <IoIosArrowDropright
                      style={{ fontSize: "50px", color: "#fa6130" }}
                      onClick={(e) => goToNext(e)}
                    />
                  </div>
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mt-5">
                  {subsidiesList?.map((sub, index) => {
                    return (
                      <div key={index} className="d-flex">
                        {index + 1}{" "}
                        <p style={{ marginLeft: "15px" }}>{sub.scheme}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default QuestionAfterEligible;
