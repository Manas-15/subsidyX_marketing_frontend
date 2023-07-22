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

const centralSubsidies = [
  {
    id: 1,
    is_central: true,
    subsidy_id: 40,
    subsidy_name: "Aatmanirbhar Gujarat Scheme for Assistance to MSMEs",
    is_subscheme: true,
    scheme: "Capital Subsidy (Applicable to Manufacturing Sector Only)",
    calculated_subsidy: 3500000,
  },
  {
    id: 2,
    is_central: true,
    subsidy_id: 40,
    subsidy_name: "Aatmanirbhar Gujarat Scheme for Assistance to MSMEs",
    is_subscheme: true,
    scheme: "Interest Subsidy",
    calculated_subsidy: 1000000,
  },
  {
    id: 3,
    is_central: true,
    subsidy_id: 40,
    subsidy_name: "Aatmanirbhar Gujarat Scheme for Assistance to MSMEs",
    is_subscheme: false,
    scheme: "",
    calculated_subsidy: 3500000,
  },
  {
    id: 4,
    is_central: false,
    subsidy_id: 41,
    subsidy_name: "Pradhan mantri Subsidy",
    is_subscheme: true,
    scheme: "Pradhan Mantri Scheme",
    calculated_subsidy: 1200000,
  },
  {
    id: 5,
    is_central: true,
    subsidy_id: 42,
    subsidy_name: "Kalia Yojana",
    is_subscheme: false,
    scheme: "",
    calculated_subsidy: 2000000,
  },
];

function FinalReport({ data, setModalShow }) {
  console.log(data);
  const router = useRouter();
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [action, setAction] = useState(0);
  const [capitalSubsidy, setCapitalSubsidy] = useState(0);

  const [stateSubsidiesList, setStateSubsidiesList] = useState();
  const [centralSubsidiesList, setCentralSubsidiesList] = useState();

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const subsidyReports = useSelector((state) => state?.eligibleSubsidy);
  const district_taluka_name = useSelector((state) => state?.taluka);
  const viewReport = useSelector((state) => state?.report?.get_report);

  // const capitalSubsidyData =
  //   subsidyReports?.eligible_subsidy?.subsidies?.filter(
  //     (sub, idx) => sub?.id === 1
  //   );

  const centralSubsidies = viewReport?.info?.subsidies?.filter(
    (subsidy, index) => subsidy?.is_central === true
  );
  const stateSubsidies = viewReport?.info?.subsidies?.filter(
    (subsidy, index) => subsidy?.is_central === false
  );

  useEffect(() => {
    //groupby subsidies list using same subsidy name
    console.log(centralSubsidies);
    if (centralSubsidies !== undefined) {
      const groupedSubsidies = centralSubsidies?.reduce((acc, subsidy) => {
        const { subsidy_name, scheme, calculated_subsidy, is_subscheme } =
          subsidy;

        // if (is_subscheme) {
        if (!acc[subsidy_name]) {
          acc[subsidy_name] = {
            schemes: [],
            total_calculated_subsidy: 0,
          };
        }
        acc[subsidy_name].schemes.push({ scheme, calculated_subsidy });
        acc[subsidy_name].total_calculated_subsidy += calculated_subsidy;
        // }
        return acc;
      }, {});

      setCentralSubsidiesList(groupedSubsidies);
    }
    //groupby subsidies list using same subsidy name
    if (stateSubsidies !== undefined) {
      const groupedSubsidies = stateSubsidies?.reduce((acc, subsidy) => {
        const { subsidy_name, scheme, calculated_subsidy, is_subscheme } =
          subsidy;

        if (is_subscheme) {
          if (!acc[subsidy_name]) {
            acc[subsidy_name] = {
              schemes: [],
              total_calculated_subsidy: 0,
            };
          }
          acc[subsidy_name].schemes.push({ scheme, calculated_subsidy });
          acc[subsidy_name].total_calculated_subsidy += calculated_subsidy;
        }
        return acc;
      }, {});

      setStateSubsidiesList(groupedSubsidies);
    }
  }, []);
  console.log(centralSubsidiesList);

  // useEffect(() => {
  //   if (capitalSubsidyData?.[0]?.id === 1) {
  //     if (district_taluka_name?.selected_data?.category === "1") {
  //       const termLoanData = subsidyReports?.subsidy_report?.result?.filter(
  //         (que, ind) => que?.question_id === 60
  //       );

  //       var percent = 25;
  //       var userInputValue = parseInt(termLoanData?.[0]?.answer);
  //       var capital_subsidy = (percent / 100) * userInputValue;
  //       let amount = 0;

  //       if (capital_subsidy >= 3500000) {
  //         amount = 3500000;
  //       } else {
  //         amount = capital_subsidy;
  //       }
  //       setCapitalSubsidy(amount);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [subsidyReports]);

  const goBack = () => {
    setModalShow(false);
  };

  const datas = [
    { name: "data 1", id: 1 },
    { name: "data 2", id: 2 },
    { name: "data 3", id: 2 },
    { name: "data 4", id: 2 },
  ];

  return (
    <>
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

        {/* Central Government */}
        {centralSubsidies?.length > 0 && (
          <div className={styles.report_tablee}>
            <div className="py-3">
              <div
                className="d-flex justify-content-center mx-4"
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  backgroundColor: "#F0EAFF",
                }}
              >
                <span className="my-2" style={{ fontWeight: "bold" }}>
                  Central Government Subsidies
                </span>
              </div>

              {Object.entries(
                centralSubsidiesList !== undefined && centralSubsidiesList
              ).map(([subsidyName, subsidyData]) => (
                <div key={subsidyName} class="container">
                  <div class="row gx-2">
                    <div className="col mt-4">
                      <div
                        className="col p-3"
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                        }}
                      >
                        <div className="row">
                          <div className="col-sm-8 d-flex flex-column">
                            <p
                              className="final_report_name"
                              style={{
                                textDecoration: "underline",
                                fontWeight: "bold",
                              }}
                            >
                              Subsidy Scheme Name
                            </p>
                            <p className="final_report_name">{subsidyName}</p>
                          </div>
                          <div className="col-sm-4 d-flex flex-column">
                            <span
                              className="final_report_name"
                              style={{
                                textDecoration: "underline",
                                fontWeight: "bold",
                              }}
                            >
                              Subsidy Amount
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <ol>
                              {subsidyData?.schemes?.map((item, index) => (
                                <li key={index} className="d-flex w-100">
                                  <p style={{ fontSize: "15px", width: "70%" }}>
                                    {item?.scheme}
                                  </p>
                                  <p style={{ fontSize: "15px", width: "30%" }}>
                                    &#8377;{" "}
                                    {item?.calculated_subsidy
                                      .toLocaleString("en-IN")
                                      .replace(/,/g, ",")}
                                  </p>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-sm-8 d-flex flex-column">
                            <span
                              className="final_report_name"
                              style={{ fontWeight: "bold" }}
                            >
                              Total Subsidy Amount in {subsidyName}
                            </span>
                          </div>
                          <div className="col-sm-4 d-flex flex-column">
                            <span
                              className="final_report_name mx-4"
                              style={{ fontWeight: "bold" }}
                            >
                              &#8377;{" "}
                              {subsidyData.total_calculated_subsidy
                                .toLocaleString("en-IN")
                                .replace(/,/g, ",")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* {centralSubsidies?.length > 0 && (
          <div className={styles.report_tablee}>
            <div className="py-3">
              <div
                className="d-flex justify-content-center mx-4"
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  backgroundColor: "#F0EAFF",
                }}
              >
                <span className="my-2" style={{ fontWeight: "bold" }}>
                  Central Government Subsidies
                </span>
              </div>
              <div class="container p-4">
                <div class="row g-2">
                  <div class="col-6 mb-4">
                    <div
                      className="col p-3"
                      style={{
                        border: "1px solid black",
                        borderRadius: "10px",
                      }}
                    >
                      <div className="row">
                        <div className="col-sm-8 d-flex flex-column">
                          <p className="final_report_name">
                            Subsidy Scheme Name
                          </p>
                          <p className="final_report_name">
                            Pradhan Mantri Mudra Yojna
                          </p>
                        </div>
                        <div className="col-sm-4 d-flex flex-column">
                          <span className="final_report_name">
                            Subsidy Amount
                          </span>
                          <span className="final_report_name">
                            10,00,000.00
                          </span>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-sm-8 d-flex flex-column">
                          <span className="final_report_name">
                            Total Subsidy Amount in Pradhan Mantri Mudra Yojna
                          </span>
                        </div>
                        <div className="col-sm-4 d-flex flex-column">
                          <span className="final_report_name">
                            {" "}
                            10,00,000.00
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}

        {/* Gujurat Government */}
        {stateSubsidies?.length > 0 && (
          <div className={styles.report_tablee}>
            <div className="py-3">
              <div
                className="d-flex justify-content-center mx-4"
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  backgroundColor: "#F0EAFF",
                }}
              >
                <span className="my-2" style={{ fontWeight: "bold" }}>
                  Gujurat State Government Subsidies
                </span>
              </div>

              {Object.entries(
                stateSubsidiesList !== undefined && stateSubsidiesList
              ).map(([subsidyName, subsidyData]) => (
                <div key={subsidyName} class="container p-4">
                  <div class="row gx-2">
                    <div className="col mb-4">
                      <div
                        className="col p-3"
                        style={{
                          border: "1px solid black",
                          borderRadius: "10px",
                        }}
                      >
                        <div className="row">
                          <div className="col-sm-8 d-flex flex-column">
                            <p
                              className="final_report_name"
                              style={{
                                textDecoration: "underline",
                                fontWeight: "bold",
                              }}
                            >
                              Subsidy Scheme Name
                            </p>
                            <p className="final_report_name">{subsidyName}</p>
                          </div>
                          <div className="col-sm-4 d-flex flex-column">
                            <span
                              className="final_report_name"
                              style={{
                                textDecoration: "underline",
                                fontWeight: "bold",
                              }}
                            >
                              Subsidy Amount
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <ol>
                              {subsidyData.schemes.map((item, index) => (
                                <li key={index} className="d-flex w-100">
                                  <p style={{ fontSize: "15px", width: "70%" }}>
                                    {item?.scheme}
                                  </p>
                                  <p style={{ fontSize: "15px", width: "30%" }}>
                                    &#8377;{" "}
                                    {item?.calculated_subsidy
                                      .toLocaleString("en-IN")
                                      .replace(/,/g, ",")}
                                  </p>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-sm-8 d-flex flex-column">
                            <span
                              className="final_report_name"
                              style={{ fontWeight: "bold" }}
                            >
                              Total Subsidy Amount in {subsidyName}
                            </span>
                          </div>
                          <div className="col-sm-4 d-flex flex-column">
                            <span
                              className="final_report_name mx-4"
                              style={{ fontWeight: "bold" }}
                            >
                              &#8377;{" "}
                              {subsidyData.total_calculated_subsidy
                                .toLocaleString("en-IN")
                                .replace(/,/g, ",")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div class="col mb-4">
                    <div
                      className="col p-3"
                      style={{
                        border: "1px solid black",
                        borderRadius: "10px",
                      }}
                    >
                      <div className="row">
                        <div className="col-sm-8 d-flex flex-column">
                          <p className="final_report_name">
                            Subsidy Scheme Name
                          </p>
                          <p className="final_report_name"></p>
                        </div>
                        <div className="col-sm-4 d-flex flex-column">
                          <span className="final_report_name">
                            Subsidy Amount
                          </span>
                          <span className="final_report_name">
                            10,00,000.00
                          </span>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-sm-8 d-flex flex-column">
                          <span
                            className="final_report_name"
                            style={{ fontWeight: "bold" }}
                          >
                            Total Subsidy Amount in Pradhan Mantri Mudra Yojna
                          </span>
                        </div>
                        <div className="col-sm-4 d-flex flex-column">
                          <span
                            className="final_report_name"
                            style={{ fontWeight: "bold" }}
                          >
                            {" "}
                            10,00,000.00
                          </span>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Base>
    </>
  );
}

export default FinalReport;
