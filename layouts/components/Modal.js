import styles from "../../styles/Modal.module.css";
import { CustomButton } from "./CustomButton";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { eligibleSubsidyAction } from "redux/Actions/eligibleSubsidyAction";
import { reportManagementAction } from "redux/Actions/reportManagementAction";

export const CongratulationsModal = (props) => {
  console.log(props);
  const subsidies = props?.action?.subsidies;
  const dispatch = useDispatch();
  const router = useRouter();
  const isCentral = subsidies?.filter(
    (subsidy, ind) => subsidy.is_central === true
  ).length;
  const isState = subsidies?.filter(
    (subsidy, ind) => subsidy.is_central === false
  ).length;

  console.log(isCentral, isState);
  const submitModal = () => {
    props.setModalShow(false);
    router.push("/questions-after-eligible");
  };

  const cancelModal = () => {
    props.setModalShow(false);
    dispatch(eligibleSubsidyAction.clearEligible());
  };

  const handleOK = () => {
    props.setModalShow(false);
    if (props?.type === "gst") {
      props.setGSTNumber("");
    }
    props.setNext(false);
    props.setSelectedRadioButton(0);
    router.push("/dashboard");
    dispatch(eligibleSubsidyAction.clearEligible());
  };

  const handleNO = () => {
    props.setModalShow(false);
    props.setNext(true);
    props.setSelectedRadioButton("2");
    router.push("/dashboard");
    dispatch(eligibleSubsidyAction.clearEligible());
  };

  const handleGstNO = () => {
    props.setModalShow(false);
    if (props?.type === "gst") {
      props.setGSTNumber("");
    }
    props.setGstData(false);
    props.setNext(true);
    props.setSelectedRadioButton("1");
    router.push("/dashboard");
    dispatch(eligibleSubsidyAction.clearEligible());
  };
  const handleCancel = () => {
    props.setModalShow(false);
    router.push("/dashboard");
    dispatch(eligibleSubsidyAction.clearEligible());
  };

  const generateReport = () => {
    console.log("111111111111111111111111");
  };
  return (
    <>
      <div className={styles.modalWrapper}>
        <div
          className={styles.modalContainer}
          style={{
            backgroundImage: `url(
            "../../images/popupbg.png"
          )`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "100% 100%",
            color: "#FFFFFF",
          }}
        >
          <div className={styles.h2}>
            {props?.type === "noQuestion" ? (
              <h3> Success!! </h3>
            ) : props?.type === "warn" ? (
              <h3> Warning!! </h3>
            ) : props?.type === "success" ? (
              <h3> Success!! </h3>
            ) : isCentral === undefined && isState === undefined ? (
              <h3> Warning!! </h3>
            ) : (
              <h3> Congratulations!! </h3>
            )}
          </div>
          <div className={styles.p}>
            {props?.type === "warn" ? (
              <span className="text-white">
                Currently, Based on your input there is no scheme available!
              </span>
            ) : props?.type === "noQuestion" ? (
              <span className="text-white">
                Based on your input there is 1 scheme available.
              </span>
            ) : props?.type === "success" ? (
              <span className="text-white">
                There is no data available in your GST Number
              </span>
            ) : (
              <span className="text-white">
                {isCentral > 0 && isState > 0 ? (
                  <>
                    Based on information provided there are {isCentral}{" "}
                    subsidies applicable to you <br />
                    from Central Government and {isState} subsidies applicable
                    to you <br />
                    from Government of Gujurat.
                  </>
                ) : isCentral > 0 ? (
                  <>
                    Based on information provided there are {isCentral}{" "}
                    subsidies applicable to you <br />
                    from Central Government.
                  </>
                ) : isState > 0 ? (
                  <>
                    Based on information provided there are {isState} subsidies
                    applicable to you <br />
                    from Government of Gujurat.
                  </>
                ) : (
                  <>No Subsidy matched based on your inputs</>
                )}
              </span>
            )}
          </div>

          <div className={styles.modalFooter}>
            <>
              {props?.type === "warn" || props?.type === "noQuestion" ? (
                <>
                  <CustomButton
                    name="Generate Report"
                    color="#FFFFFF"
                    width="200px"
                    bgColor="#FA6130"
                    onClick={() => generateReport()}
                  />
                  <CustomButton
                    name="Cancel"
                    color="#000000"
                    width="100px"
                    bgColor="#FFFFFF"
                    border="1px solid #000000"
                    onClick={() => handleCancel()}
                  />
                </>
              ) : props?.type === "success" ? (
                <CustomButton
                  name="OK"
                  color="#FFFFFF"
                  width="200px"
                  bgColor="#FA6130"
                  onClick={() => handleOK()}
                />
              ) : isCentral === undefined && isState === undefined ? (
                <>
                  {" "}
                  <CustomButton
                    name="Cancel"
                    color="#000000"
                    width="100px"
                    bgColor="#FFFFFF"
                    border="1px solid #000000"
                    onClick={() => handleGstNO()}
                  />
                </>
              ) : (
                <>
                  <CustomButton
                    name="YES"
                    color="#FFFFFF"
                    width="100px"
                    bgColor="#FA6130"
                    onClick={() => submitModal()}
                  />
                  {props?.type === "gst" ? (
                    <CustomButton
                      name="NO"
                      color="#000000"
                      width="100px"
                      bgColor="#FFFFFF"
                      border="1px solid #000000"
                      onClick={() => handleGstNO()}
                    />
                  ) : (
                    <CustomButton
                      name="NO"
                      color="#000000"
                      width="100px"
                      bgColor="#FFFFFF"
                      border="1px solid #000000"
                      onClick={() => handleNO()}
                    />
                  )}
                </>
              )}
              {/* <CustomButton
                name="Submit"
                color="#FFFFFF"
                width="100px"
                bgColor="#FA6130"
              />
              <CustomButton
                name="Cancel"
                color="#FFFFFF"
                width="100px"
                bgColor="#FA6130"
                onClick={() => setShowModal(false)}
              /> */}
            </>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export const ReportManagementModal = (props) => {
  const dispatch = useDispatch();
  console.log(props);

  const deleteReport = () => {
    console.log(props.action);
    dispatch(reportManagementAction.deleteReport(props.action));
    props.setModalShow(false);
    props.setType("");
    props.setAction({});
  };

  const cancelReport = () => {
    props.setModalShow(false);
    props.setType("");
    props.setAction({});
  };

  return (
    <>
      <div className={styles.modalWrapper}>
        <div
          className={styles.modalContainer}
          style={{
            backgroundImage: `url(
            "../../images/popupbg.png"
          )`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "100% 100%",
            color: "#FFFFFF",
          }}
        >
          <div className={styles.h2}>Delete Report</div>
          <div className={styles.p}>
            Do you want to delete this report , this can't be undone, report
            will removed from list.
          </div>

          <div className={styles.modalFooter}>
            <>
              <>
                <CustomButton
                  name="DELETE"
                  color="#FFFFFF"
                  width="100px"
                  bgColor="#FA6130"
                  onClick={() => deleteReport()}
                />
                <CustomButton
                  name="CANCEL"
                  color="#000000"
                  width="100px"
                  bgColor="#FFFFFF"
                  border="1px solid #000000"
                  onClick={() => cancelReport()}
                />
              </>
            </>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};
