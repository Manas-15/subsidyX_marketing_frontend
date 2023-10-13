import styles from "../../styles/Report.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CustomButton } from "@layouts/components/CustomButton";
import Base from "@layouts/Baseof";
import { useRouter } from "next/router";
import { reportManagementAction } from "redux/Actions/reportManagementAction";
import Link from "next/link";
import { DotLoading } from "@layouts/components/Loader";
import withAuth from "@layouts/partials/withAuth";

function FinalReport({ data, setModalShow }) {
  const router = useRouter();
  const dispatch = useDispatch();

  // const [stateSubsidiesList, setStateSubsidiesList] = useState();
  // const [centralSubsidiesList, setCentralSubsidiesList] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [stateSubsidyList, setStateSubsidyList] = useState();
  const [centralSubsidyList, setCentralSubsidyList] = useState();

  // const subsidyReports = useSelector((state) => state?.eligibleSubsidy);
  // const district_taluka_name = useSelector((state) => state?.taluka);
  const viewReport = useSelector((state) => state?.report?.get_report);
  const generatePdf = useSelector((state) => state?.report?.generate_pdf);

  // const capitalSubsidyData =
  //   subsidyReports?.eligible_subsidy?.subsidies?.filter(
  //     (sub, idx) => sub?.id === 1
  //   );

  const centralSubsidies = viewReport?.info?.subsidies?.filter(
    (subsidy, index) => subsidy?.is_central === true && subsidy?.category === 1
  );
  const stateSubsidies = viewReport?.info?.subsidies?.filter(
    (subsidy, index) => subsidy?.is_central === false && subsidy?.category === 1
  );

  // Group the subsidies by subsidy_name start
  useEffect(() => {
    //groupby subsidies list using same subsidy name of Gujarat State
    if (stateSubsidies !== undefined) {
      const groupedData = stateSubsidies.reduce((acc, curr) => {
        const parentSubsidyName = curr?.parent_subsidy_name;
        if (!acc[parentSubsidyName]) {
          acc[parentSubsidyName] = [];
        }
        acc[parentSubsidyName].push(curr);
        return acc;
      }, {});

      if (Object.entries(groupedData)?.length > 0) {
        const data = (
          <div className={styles.report_tablee}>
            <div className="pb-5 pt-3">
              <div
                className="d-flex justify-content-center mx-4"
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  backgroundColor: "#F0EAFF",
                }}
              >
                <span className="my-2" style={{ fontWeight: "bold" }}>
                  Gujarat State Government Subsidies
                </span>
              </div>

              {Object.entries(groupedData).map(([subsidyName, schemes]) => (
                <div key={subsidyName} class="container pt-4">
                  <div class="row">
                    <div className="col">
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
                            <p className="final_report_name">
                              {subsidyName !== "null" ? subsidyName : ""}
                            </p>
                          </div>
                          <div className="col-sm-4 d-flex flex-column">
                            <span
                              className="final_report_name"
                              style={{
                                textDecoration: "underline",
                                fontWeight: "bold",
                              }}
                            >
                              Subsidy Amount Estimated
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <ol>
                              {schemes.map((item, index) => (
                                <li key={index} className="d-flex w-100">
                                  <p
                                    style={{
                                      fontSize: "15px",
                                      width: "70%",
                                      paddingRight: "30px",
                                    }}
                                  >
                                    {item?.scheme}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "15px",
                                      width: "30%",
                                      paddingRight: "30px",
                                    }}
                                  >
                                    &#8377;{" "}
                                    {item?.calculated_subsidy !== undefined
                                      ? item?.calculated_subsidy
                                          ?.toLocaleString("en-IN")
                                          .replace(/,/g, ",")
                                      : 0}
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
                              Total Subsidy Amount in{" "}
                              {subsidyName !== "null"
                                ? subsidyName
                                : schemes?.[0]?.scheme}
                            </span>
                          </div>
                          <div className="col-sm-4 d-flex flex-column">
                            <span
                              className="final_report_name mx-4"
                              style={{ fontWeight: "bold" }}
                            >
                              &#8377;{" "}
                              {schemes
                                .reduce(
                                  (acc, scheme) =>
                                    acc + (scheme?.calculated_subsidy || 0),
                                  0
                                )
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
        );
        setStateSubsidyList(data);
      }
    }

    //groupby sibsidies list using parent subsidy name of Central
    if (centralSubsidies !== undefined) {
      const groupedData = centralSubsidies.reduce((acc, curr) => {
        const parentSubsidyName = curr?.parent_subsidy_name;
        if (!acc[parentSubsidyName]) {
          acc[parentSubsidyName] = [];
        }
        acc[parentSubsidyName].push(curr);
        return acc;
      }, {});

      if (Object.entries(groupedData)?.length > 0) {
        const data = (
          <div className={styles.report_tablee}>
            <div className="pb-5 pt-3">
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
              {Object.entries(groupedData).map(([subsidyName, schemes]) => (
                <div key={subsidyName} class="container pt-4">
                  <div class="row">
                    <div className="col">
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
                            <p className="final_report_name">
                              {subsidyName !== "null" ? subsidyName : ""}
                            </p>
                          </div>
                          <div className="col-sm-4 d-flex flex-column">
                            <span
                              className="final_report_name"
                              style={{
                                textDecoration: "underline",
                                fontWeight: "bold",
                              }}
                            >
                              Subsidy Amount Estimated
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <ol>
                              {schemes.map((item, index) => (
                                <li key={index} className="d-flex w-100">
                                  <p style={{ fontSize: "15px", width: "70%" }}>
                                    {item?.scheme}
                                  </p>
                                  <p style={{ fontSize: "15px", width: "30%" }}>
                                    &#8377;{" "}
                                    {item?.calculated_subsidy !== undefined
                                      ? item?.calculated_subsidy
                                          ?.toLocaleString("en-IN")
                                          .replace(/,/g, ",")
                                      : 0}
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
                              Total Subsidy Amount in{" "}
                              {subsidyName !== "null"
                                ? subsidyName
                                : schemes?.[0]?.scheme}
                            </span>
                          </div>
                          <div className="col-sm-4 d-flex flex-column">
                            <span
                              className="final_report_name mx-4"
                              style={{ fontWeight: "bold" }}
                            >
                              &#8377;{" "}
                              {schemes
                                .reduce(
                                  (acc, scheme) =>
                                    acc + (scheme?.calculated_subsidy || 0),
                                  0
                                )
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
        );
        setCentralSubsidyList(data);
      }
    }
  }, []);

  useEffect(() => {
    const id = viewReport?.info?.report_id;
    if (id) {
      dispatch(reportManagementAction?.downloadPDF(id));
    }
  }, [viewReport?.info?.report_id]);

  // useEffect(() => {
  //   //groupby subsidies list using same subsidy name

  //   if (centralSubsidies !== undefined) {
  //     const groupedSubsidies = centralSubsidies?.reduce((acc, subsidy) => {
  //       const { subsidy_name, scheme, calculated_subsidy, is_subscheme } =
  //         subsidy;

  //       // if (is_subscheme) {
  //       if (!acc[subsidy_name]) {
  //         acc[subsidy_name] = {
  //           schemes: [],
  //           total_calculated_subsidy: 0,
  //         };
  //       }
  //       acc[subsidy_name].schemes.push({ scheme, calculated_subsidy });
  //       acc[subsidy_name].total_calculated_subsidy += calculated_subsidy;
  //       // }
  //       return acc;
  //     }, {});

  //     setCentralSubsidiesList(groupedSubsidies);
  //   }
  //   //groupby subsidies list using same subsidy name
  //   if (stateSubsidies !== undefined) {
  //     const groupedSubsidies = stateSubsidies?.reduce((acc, subsidy) => {
  //       const { subsidy_name, scheme, calculated_subsidy, is_subscheme } =
  //         subsidy;

  //       if (is_subscheme) {
  //         if (!acc[subsidy_name]) {
  //           acc[subsidy_name] = {
  //             schemes: [],
  //             total_calculated_subsidy: 0,
  //           };
  //         }
  //         acc[subsidy_name].schemes.push({ scheme, calculated_subsidy });
  //         acc[subsidy_name].total_calculated_subsidy += calculated_subsidy;
  //       }
  //       return acc;
  //     }, {});

  //     setStateSubsidiesList(groupedSubsidies);
  //   }
  // }, []);

  useEffect(() => {
    if (generatePdf?.report_link === undefined) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [generatePdf]);


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
        <div
          style={{
            backgroundColor: "#F0EAFF",
            padding: "30px",
            height: "650px",
            overflowY: "auto",
          }}
        >
          <div className={styles.report_tablee}>
            <div>
              <div className="d-flex justify-content-between mx-5 mt-3">
                <h4>General Information</h4>

                {isLoading ? (
                  <DotLoading
                    name="Loading ..."
                    type="button"
                    bgColor="#FA6130"
                    color="#FFFFFF"
                    height="38px"
                    width="150px"
                  />
                ) : (
                  <div className="generate_pdf">
                    {generatePdf?.report_link !== undefined && (
                      <Link
                        href={generatePdf?.report_link}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-primary"
                      >
                        <CustomButton
                          name="Download PDF"
                          color="#FFFFFF"
                          height="38px"
                          width="150px"
                          bgColor="#FA6130"
                        />
                        {/* <BiSolidFilePdf
                    style={{
                      fontSize: "30px",
                      color: "#fa6130",
                      cursor: "pointer",
                    }}
                    onClick={(e) => downloadPDF(e)}
                  /> */}
                      </Link>
                    )}
                  </div>
                )}
              </div>
              <div className="row mt-4 mx-5">
                <div className="col-sm-3 d-flex flex-column">
                  <h6>InquireID</h6>
                  <p>#{viewReport?.info?.report_id}</p>
                </div>
                <div className="col-sm-3 d-flex flex-column">
                  <h6>Category</h6>
                  <p>
                    {viewReport?.info?.industry_category_name !== null
                      ? viewReport?.info?.industry_category_name
                      : "-"}
                  </p>
                </div>
                <div className="col-sm-3 d-flex flex-column">
                  <h6>Sector</h6>
                  <p>
                    {viewReport?.info?.industry_sector_name !== null
                      ? viewReport?.info?.industry_sector_name
                      : "-"}
                  </p>
                </div>
                <div className="col-sm-3 d-flex flex-column">
                  <h6>Created Date</h6>
                  <p>
                    {new Date(viewReport?.info?.dt_created)
                      ?.toLocaleDateString("en-GB")
                      .replace(/\//g, "-")}
                  </p>
                </div>
              </div>
              <div className="row mt-4 mx-5">
                <div className="col-sm-3 d-flex flex-column">
                  <h6>State</h6>
                  <p>
                    {viewReport?.info?.state_name !== null
                      ? viewReport?.info?.state_name
                      : "-"}
                  </p>
                </div>
                <div className="col-sm-3 d-flex flex-column">
                  <h6>Taluka</h6>
                  <p>
                    {viewReport?.info?.taluka_name !== null
                      ? viewReport?.info?.taluka_name
                      : "-"}
                  </p>
                </div>
                <div className="col-sm-3 d-flex flex-column">
                  <h6>Company Name</h6>
                  <p>
                    {viewReport?.info?.company_name !== null
                      ? viewReport?.info?.company_name
                      : "-"}
                  </p>
                </div>
                <div className="col-sm-3 d-flex flex-column">
                  <h6>Created By</h6>
                  <p>
                    {viewReport?.info?.owner_name !== null
                      ? viewReport?.info?.owner_name
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {viewReport?.result?.length > 0 && (
            <div className={`mt-4 mb-5 ${styles.report_tablee}`}>
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
                          <div
                            key={idx}
                            className="col-sm-3 d-flex flex-column"
                          >
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

          {/* Central Government */}
          <p>{centralSubsidyList}</p>
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
                                    <p
                                      style={{ fontSize: "15px", width: "70%" }}
                                    >
                                      {item?.scheme}
                                    </p>

                                    <p
                                      style={{ fontSize: "15px", width: "30%" }}
                                    >
                                      &#8377;{" "}
                                      {item?.calculated_subsidy !== undefined
                                        ? item?.calculated_subsidy
                                            ?.toLocaleString("en-IN")
                                            .replace(/,/g, ",")
                                        : 0}
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
                            {console.log(subsidyData)}
                            <div className="col-sm-4 d-flex flex-column">
                              <span
                                className="final_report_name mx-4"
                                style={{ fontWeight: "bold" }}
                              >
                                &#8377;{" "}
                                {subsidyData?.total_calculated_subsidy
                                  ?.toLocaleString("en-IN")
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
          )} */}

          {/* Gujarat Government */}
          <p>{stateSubsidyList}</p>
        </div>
      </Base>
    </>
  );
}

export default withAuth(FinalReport);
