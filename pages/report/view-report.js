import styles from "../../styles/Report.module.css";
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

function ViewReport({ data, setModalShow }) {
  console.log(data);
  const router = useRouter();
  // const router = useRouter();
  // const dispatch = useDispatch();

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const subsidyReports = useSelector((state) => state?.eligibleSubsidy);
  const district_taluka_name = useSelector((state) => state?.taluka);
  const viewReport = useSelector((state) => state?.report?.get_report);

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

  const goBack = () => {
    setModalShow(false);
  };

  const handlePayNow = () => {
    router.push("/report/final-report");
  };
  return (
    <>
      {/* {modalShow && (
        <IndustryCategoryModal
          type={type}
          action={action}
          show={modalShow}
          setModalShow={setModalShow}
          onHide={() => setModalShow(false)}
        />
      )} */}
      <Base
        title={"title"}
        description={"dgfdfsdfsffsfd"}
        meta_title={"meta_title"}
        image={"image"}
        noindex={"noindex"}
        canonical={"canonical"}
      >
        <div className={styles.report_tablee}>
          <div>
            <div className="d-flex justify-content-between mx-5 mt-3">
              <h4>General Information</h4>
            </div>
            <div className="row mt-4 mx-5">
              <div className="col-sm-3 d-flex flex-column">
                <h6>InquireID</h6>
                <p>#{viewReport?.info?.report_id}</p>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Category</h6>
                <p>{viewReport?.info?.industry_category_name}</p>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Sector</h6>
                <p>{viewReport?.info?.industry_sector_name}</p>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Created Date</h6>
                <p>{formattedDate}</p>
              </div>
            </div>
            <div className="row mt-4 mx-5">
              <div className="col-sm-3 d-flex flex-column">
                <h6>State</h6>
                <p>{viewReport?.info?.state_name}</p>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Taluka</h6>
                <p>{viewReport?.info?.taluka_name}</p>
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
            </div>
            <div className="row mt-4 mx-5">
              {viewReport?.result?.map((question, idx) => {
                return (
                  <div key={idx} className="col-sm-3 d-flex flex-column">
                    <h6>
                      {question?.question_display_name
                        ? question?.question_display_name
                        : question?.question_name}
                    </h6>
                    <p>{question?.answer}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {viewReport?.info?.is_paid === false && (
          <div
            className="d-flex justify-content-end mb-5"
            style={{ marginRight: "20px" }}
          >
            <CustomButton
              name="Pay Now"
              color="#FFFFFF"
              height="50px"
              width="200px"
              bgColor="#FA6130"
              onClick={(e) => handlePayNow(e)}
            />
          </div>
        )}
      </Base>
    </>
  );
}

export default ViewReport;
