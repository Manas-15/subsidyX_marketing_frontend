import Base from "@layouts/Baseof";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { IoIosArrowDropright } from "react-icons/io";
import EligibleSubsidy from "@layouts/components/eligibleSubsidy";

const Dashboard = ({ data }) => {
  const router = useRouter();
  const [next, setNext] = useState(false);

  const goToNext = () => {
    setNext(!next);
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
            {next ? (
              <EligibleSubsidy />
            ) : (
              <div className="col-12 inner-section ">
                <div className="d-flex justify-content-center mt-5 mb-5">
                  <h2 className="fw-bold text-dark">
                    Hey!! Are you planning for new project or expansion in
                    existing project
                  </h2>
                </div>
                <div style={{ margin: "auto" }}>
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
                      // onChange={(e) => handleRadioClick(e)}
                    />
                    <h3 className="text-dark">NEW PROJECT</h3>
                  </div>

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
                      // onChange={(e) => handleRadioClick(e)}
                    />
                    <h3 className="fw-bold text-dark">
                      EXPANSION IN EXISTING PROJECT
                    </h3>
                  </div>
                  <div className="mt-5 d-flex justify-content-center">
                    <IoIosArrowDropright
                      style={{ fontSize: "50px", color: "#fa6130" }}
                      onClick={(e) => goToNext(e)}
                    />
                  </div>
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
