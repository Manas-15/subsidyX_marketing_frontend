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
import { useRouter } from "next/router";
import Link from "next/link";
import { IoIosArrowDropleft } from "react-icons/io";
import { reportManagementAction } from "redux/Actions/reportManagementAction";
import withAuth from "@layouts/partials/withAuth";

function ConfirmReport() {
  const router = useRouter();
  const dispatch = useDispatch();

  // const date = new Date();
  // const formattedDate = date.toLocaleDateString("en-US", {
  //   day: "2-digit",
  //   month: "2-digit",
  //   year: "numeric",
  // });
  const date = new Date(); // Replace this with your date variable

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  const subsidyReports = useSelector((state) => state?.eligibleSubsidy);
  const district_taluka_name = useSelector((state) => state?.taluka);
  const getReports = useSelector((state) => state?.report);
  const viewReport = useSelector((state) => state?.report?.get_report);

  const capitalSubsidyData =
    subsidyReports?.eligible_subsidy?.subsidies?.filter(
      (sub, idx) => sub?.id === 1
    );
  const interestSubsidyData =
    subsidyReports?.eligible_subsidy?.subsidies?.filter(
      (sub, idx) => sub?.id === 2
    );

  const handleSubmit = () => {
    dispatch(
      reportManagementAction.getReportByID(
        getReports?.get_report?.info?.report_id
      )
    );
    router.push("/report/final-report");
    // router.push("/payment");
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
      <div
        style={{
          backgroundColor: "#F0EAFF",
          padding: "30px",
          height: "650px",
          overflowY: "auto",
        }}
      >
        <h4 className="mx-5 mt-4 mb-4 blink-text" style={{ fontWeight: "400" }}>
          Based on the information provided by you, we have gathered the
          following data. Kindly verify all the details carefully before
          generation of report.
        </h4>
        <div className="d-flex justify-content-end me-5 mb-2">
          <CustomButton
            name="Edit"
            color="#FFFFFF"
            width="100px"
            bgColor="#FA6130"
            onClick={() => router.push("/dashboard")}
          />
        </div>
        {/* <Link
          href={{
            pathname: "/dashboard",
            query: { edit: "editEligibleSubsidy" },
          }}
          passHref
        >
          Edit
        </Link> */}
        <div className={`mb-4 ${styles.report_tablee}`}>
          <div>
            <div className="d-flex justify-content-between mx-5 mt-3">
              <h4>General Information</h4>
            </div>
            <div className="row mt-4 mx-5">
              <div className="col-sm-3 d-flex flex-column">
                <h6>InquireID</h6>
                <p>#{getReports?.get_report?.info?.report_id}</p>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Category</h6>
                <p>
                  {getReports?.get_report?.info?.industry_category_name !== null
                    ? getReports?.get_report?.info?.industry_category_name
                    : "-"}
                </p>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Sector</h6>
                <p>
                  {getReports?.get_report?.info?.industry_sector_name !== null
                    ? getReports?.get_report?.info?.industry_sector_name
                    : "-"}
                </p>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Created Date</h6>
                <p>
                  {new Date(getReports?.get_report?.info?.dt_created)
                    ?.toLocaleDateString("en-GB")
                    .replace(/\//g, "-")}
                </p>
              </div>
            </div>
            <div className="row mt-4 mx-5">
              <div className="col-sm-3 d-flex flex-column">
                <h6>State</h6>
                <p>
                  {getReports?.get_report?.info?.state_name !== null
                    ? getReports?.get_report?.info?.state_name
                    : "-"}
                </p>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Taluka</h6>
                <p>
                  {getReports?.get_report?.info?.taluka_name !== null
                    ? getReports?.get_report?.info?.taluka_name
                    : "-"}
                </p>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Company Name</h6>
                <p>
                  {getReports?.get_report?.info?.company_name !== null
                    ? getReports?.get_report?.info?.company_name
                    : "-"}
                </p>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Created By</h6>
                <p>
                  {getReports?.get_report?.info?.owner_name !== null
                    ? getReports?.get_report?.info?.owner_name
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {viewReport?.result !== undefined && viewReport?.result?.length > 0 && (
          <div className={`mb-4 ${styles.report_tablee}`}>
            <div className="py-3">
              <div className="d-flex justify-content-between mx-5 ">
                <h4>User Inputs</h4>
              </div>
              <div className="row mt-4 mx-5">
                {viewReport?.result?.map((question, idx) => {
                  return (
                    <>
                      {question?.answer === "Not Applicable" ? (
                        <></>
                      ) : (
                        <div key={idx} className="col-sm-3 d-flex flex-column">
                          <h6>
                            {question?.question_display_name
                              ? question?.question_display_name
                              : question?.question_name}
                          </h6>
                          <p>
                            {question?.answer === "Not Applicable"
                              ? "-"
                              : question?.answer}
                          </p>
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="d-flex justify-content-end mx-5 pb-5">
          {/* <IoIosArrowDropleft
            style={{ fontSize: "50px", color: "#fa6130" }}
            onClick={(e) => goToNext(e)}
          /> */}
          <CustomButton
            name="Submit"
            color="#FFFFFF"
            width="100px"
            bgColor="#FA6130"
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </Base>
  );
}

export default withAuth(ConfirmReport);
