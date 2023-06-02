import Base from "@layouts/Baseof";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { useRouter } from "next/router";
import questilonList from "../config/questions.json";
import { Form } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";

const QuestionAfterEligible = ({ data }) => {
  const router = useRouter();
  const [question, setQuestion] = useState();
  const [queNum, setQueNum] = useState(0);
  const [answer, setAnswer] = useState("");

  console.log(questilonList);

  const handleRadioClick = (e) => {
    setAnswer(e.target.value);
  };

  useEffect(() => {
    const data = questilonList[queNum];
    setQuestion(data);
  }, [queNum]);

  const goToPrev = () => {
    if (queNum > 0) {
      setQueNum(queNum - 1);
    }
  };
  const goToNext = () => {
    setQueNum(queNum + 1);
    if (question?.field_type_id === 3) {
      multiselectRef.current.resetSelectedValues();
    }
  };
  const handleMultiValueSelect = (val, event) => {
    console.log(val, event);
  };

  const handleMultiValueRemove = (val, event) => {
    console.log(val, event);
  };
  const multiselectRef = useRef();
  const resetSelectedValues = (e) => {
    console.log("called");
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
              <div className="d-flex justify-content-center mt-5 mb-5">
                <h2 className="fw-bold">{question?.label}</h2>
              </div>
              <div style={{ margin: "auto", width: "300px" }}>
                <div className="d-flex justify-content-center flex-column">
                  {question?.field_type_id === 1 && (
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Control type="text" placeholder="Enter Amount" />
                      </Form.Group>
                    </Form>
                  )}

                  {question?.field_type_id === 2 && (
                    <>
                      <div className="d-flex justify-content-center">
                        <input
                          type="radio"
                          name="subsidy"
                          value="1"
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
                          value="1"
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
                  {question?.field_type_id === 3 && (
                    <Multiselect
                      showCheckbox
                      placeholder="Please Select"
                      options={question?.options}
                      ref={multiselectRef}
                      className="text-dark"
                      onSelect={(event) => {
                        handleMultiValueSelect(name, event);
                      }}
                      onRemove={(event) => handleMultiValueRemove(name, event)}
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
          </div>
        </div>
      </section>
    </Base>
  );
};

export default QuestionAfterEligible;
