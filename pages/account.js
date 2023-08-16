import Base from "@layouts/Baseof";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { IoIosArrowDropright } from "react-icons/io";

const Account = ({ data }) => {
  const router = useRouter();
  const [selectedRadioButton, setSelectedRadioButton] = useState(0);

  const handleRadioClick = (e) => {
    setSelectedRadioButton(parseInt(e.target.value));
  };

  const goToNext = () => {
    if (selectedRadioButton === 1) {
      router.push("/login");
    } else if (selectedRadioButton === 2) {
      router.push("/signup");
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
      <section
        className="section bg-inner"
        style={{
          backgroundColor: "#262555",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div className="container">
          <div className="section row pb-0">
            <div className="col-12 inner-section">
              <div>
                <div className="d-flex justify-content-center mt-5 mb-5">
                  <h2 style={{ fontSize: "25px", color: "white" }}>
                    Hey!! Do you have a SubsidyX Account?
                  </h2>
                </div>
                <div style={{ margin: "auto" }}>
                  <div className="d-flex justify-content-center">
                    <input
                      type="radio"
                      name="udyamAadhar"
                      value="1"
                      style={{
                        width: "20px",
                        height: "25px",
                        marginRight: "10px",
                      }}
                      onChange={(e) => handleRadioClick(e)}
                    />
                    <h3 style={{ fontSize: "20px", color: "white" }}>YES</h3>
                  </div>

                  <div className="d-flex justify-content-center">
                    <input
                      type="radio"
                      name="udyamAadhar"
                      value="2"
                      style={{
                        width: "20px",
                        height: "25px",
                        marginRight: "10px",
                      }}
                      onChange={(e) => handleRadioClick(e)}
                    />
                    <h3 style={{ fontSize: "20px", color: "white" }}>NO</h3>
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
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Account;
