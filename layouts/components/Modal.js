import Modal from "react-bootstrap/Modal";
import { CustomButton } from "./CustomButton";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { eligibleSubsidyAction } from "redux/Actions/eligibleSubsidyAction";

export const CongratulationsModal = (props) => {
  console.log(props);
  const subsidies = props?.action?.subsidies;
  const dispatch = useDispatch();
  const router = useRouter();

  const submitModal = () => {
    props.setModalShow(false);
    router.push("/questions-after-eligible");
  };

  const cancelModal = () => {
    props.setModalShow(false);
    dispatch(eligibleSubsidyAction.clearEligible());
  };

  const restartQuestion = () => {
    props.setModalShow(false);
    router.push("/dashboard");
    dispatch(eligibleSubsidyAction.clearEligible());
  };
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="d-flex justify-content-center fw-bold text-white mt-5">
              {props?.type === "warn" ? (
                <h3> Warning!! </h3>
              ) : (
                <h3> Congratulations!! </h3>
              )}
            </div>
            <div
              style={{
                fontSize: "17px",
                marginLeft: "60px",
                marginTop: "15px",
              }}
            >
              {props?.type === "warn" ? (
                <span className="text-white">
                  Currently, there is no scheme available according to your
                  answers.
                </span>
              ) : (
                <span className="text-white">
                  Based on information provided there are{" "}
                  {
                    subsidies?.filter(
                      (subsidy, ind) => subsidy.is_central === true
                    ).length
                  }{" "}
                  subsidies applicable to you <br />
                  from Central Government and{" "}
                  {
                    subsidies?.filter(
                      (subsidy, ind) => subsidy.is_central === false
                    ).length
                  }
                  <br />
                  Subsidies from Government of Gujurat.
                </span>
              )}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ paddingLeft: "69px", paddingRight: " 50px" }}>
            {props?.type === "warn" ? (
              <h5 style={{ color: "#4682E3", visibility: "hidden" }}>
                Please go back to the Questionnairesdxc
                xvvvvvvvvvvvvvvv 
              </h5>
            ) : (
              <h5 style={{ color: "#4682E3" }}>
                For more details would you like to proceed further?
              </h5>
            )}
          </div>

          <div className="d-flex justify-content-center mt-4">
            {props?.type === "warn" ? (
              <CustomButton
                name="OK"
                color="#FFFFFF"
                width="100px"
                bgColor="#FA6130"
                onClick={() => restartQuestion()}
              />
            ) : (
              <>
                <CustomButton
                  name="YES"
                  color="#FFFFFF"
                  width="100px"
                  bgColor="#FA6130"
                  onClick={() => submitModal()}
                />
                <CustomButton
                  name="NO"
                  color="#000000"
                  width="100px"
                  bgColor="#FFFFFF"
                  border="1px solid #000000"
                  onClick={() => cancelModal()}
                />
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
