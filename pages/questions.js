import Base from "@layouts/Baseof";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { useRouter } from "next/router";
import questilonList from "../config/questions.json";
import withAuth from "@layouts/partials/withAuth";

const QuestionPage = ({ data }) => {
  const router = useRouter();
  const [isSubsidy, setIsSubsidy] = useState("2");

  console.log(questilonList);

  const handleRadioClick = (e) => {
    setIsSubsidy(e.target.value);
  };

  const goToNext = () => {
    router.push("/dashboard");
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
                <h2 className="fw-bold">
                  Hey!! Do You have a SubsidyX Account?
                </h2>
              </div>
              <div style={{ margin: "auto", width: "300px" }}>
                <div className="d-flex justify-content-center">
                  <input
                    type="radio"
                    name="subsidy"
                    value="1"
                    checked={false}
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
                    checked={true}
                    style={{
                      width: "30px",
                      height: "30px",
                      marginRight: "10px",
                    }}
                    onChange={(e) => handleRadioClick(e)}
                  />
                  <h3>No</h3>
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
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default withAuth(QuestionPage);
