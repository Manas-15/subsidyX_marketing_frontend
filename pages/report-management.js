import styles from "../styles/Report.module.css";
// import { CiSearch } from "react-icons/ci";
import { HiEye } from "react-icons/hi";
import { BsShareFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CustomButton,
  ExportButton,
  FilterButton,
} from "@layouts/components/CustomButton";
import Base from "@layouts/Baseof";
// import { eligibleSubsidyAction } from "../redux/Actions/eligibleSubsidyAction";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoIosArrowDropleft } from "react-icons/io";

function ReportManagement() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [action, setAction] = useState(0);
  const [capitalSubsidy, setCapitalSubsidy] = useState(0);

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const subsidyReports = useSelector((state) => state?.eligibleSubsidy);
  const district_taluka_name = useSelector((state) => state?.taluka);

  const capitalSubsidyData =
    subsidyReports?.eligible_subsidy?.subsidies?.filter(
      (sub, idx) => sub?.id === 1
    );

  useEffect(() => {
    if (capitalSubsidyData?.[0]?.id === 1) {
      if (district_taluka_name?.selected_data?.category === "1") {
        const termLoanData = subsidyReports?.subsidy_report?.result?.filter(
          (que, ind) => que?.question_id === 60
        );

        var percent = 25;
        var userInputValue = parseInt(termLoanData?.[0]?.answer);
        var capital_subsidy = (percent / 100) * userInputValue;
        let amount = 0;

        if (capital_subsidy >= 3500000) {
          amount = 3500000;
        } else {
          amount = capital_subsidy;
        }
        setCapitalSubsidy(amount);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subsidyReports]);

  const actions = [
    { icon: BsShareFill },
    { icon: HiEye },
    { icon: MdModeEdit },
    { icon: RiDeleteBin5Fill },
  ];

  //   const addNewIndustryCategory = () => {
  //     setModalShow(true);
  //     setType("add");
  //   };

  //   useEffect(() => {
  //     dispatch(industryCategoryActions?.getCategories());
  //   }, [dispatch]);

  //   const handleClick = (item, idx) => {
  //     console.log(item, idx);
  //     if (idx === 0) {
  //       console.log("Shared");
  //     } else if (idx === 1) {
  //       console.log("viewed");
  //     } else if (idx === 2) {
  //       setModalShow(true);
  //       setType("edit");
  //       setAction(item);
  //     } else {
  //       setModalShow(true);
  //       setType("delete");
  //       setAction(item?.id);
  //     }
  //   };
  // const restartSession = () => {
  //   dispatch(eligibleSubsidyAction.clearEligible());
  //   router.push("/dashboard");
  // };

  return (
    <Base
      title={"title"}
      description={"dgfdfsdfsffsfd"}
      meta_title={"meta_title"}
      image={"image"}
      noindex={"noindex"}
      canonical={"canonical"}
    >
      <div className={styles.container}>
        {/* {modalShow && (
        <IndustryCategoryModal
          type={type}
          action={action}
          show={modalShow}
          setModalShow={setModalShow}
          onHide={() => setModalShow(false)}
        />
      )} */}
        <div className={styles.report_tablee}>
          <div>
            <div className="d-flex justify-content-between mx-5 mt-3">
              <h4>General Information</h4>
              <Link href="/dashboard">Edit</Link>
            </div>
            <div className="row mt-4 mx-5">
              <div className="col-sm-3 d-flex flex-column">
                <h6>InquireID</h6>
                <p>#{subsidyReports?.eligible_subsidy?.report_id}</p>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Category</h6>
                <p>
                  {subsidyReports?.selected_information?.industryCategoryID}
                </p>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Sector</h6>
                <p>{subsidyReports?.selected_information?.industrySectorID}</p>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Created Date</h6>
                <p>{formattedDate}</p>
              </div>
            </div>
            <div className="row mt-4 mx-5">
              <div className="col-sm-3 d-flex flex-column">
                <h6>State</h6>
                <p>{subsidyReports?.selected_information?.stateID}</p>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Taluka</h6>
                <p>{district_taluka_name?.selected_data?.taluka}</p>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Company Name</h6>
                <p>ABC</p>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Created By</h6>
                <p>super admin</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.report_tablee}>
          <div className="py-3">
            <div className="d-flex justify-content-between mx-5 ">
              <h4>Information based on Service and Large Industry</h4>
              <Link href="/dashboard">Edit</Link>
            </div>
            <div className="row mt-4 mx-5">
              <div className="col-sm-3 d-flex flex-column">
                <h6>Subsidy Amount</h6>
                <p>&#8377;0.0</p>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Fixed Capital Investment</h6>
                <p>&#8377;10,00,000.00</p>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Team Loan Amount</h6>
                <p>&#8377;0.0</p>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Rate Of Interest</h6>
                <p>&#8377;0.0</p>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between mx-5 pb-5">
          <IoIosArrowDropleft
            style={{ fontSize: "50px", color: "#fa6130" }}
            // onClick={(e) => goToNext(e)}
          />
          <CustomButton
            name="Submit"
            color="#FFFFFF"
            width="100px"
            bgColor="#FA6130"
            // onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </Base>
  );
}

export default ReportManagement;
