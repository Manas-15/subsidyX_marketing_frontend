import styles from "../styles/Report.module.css";
import { CiSearch } from "react-icons/ci";
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
import reports from "../config/report.json";
import Base from "@layouts/Baseof";
import { eligibleSubsidyAction } from "../redux/Actions/eligibleSubsidyAction";
import { useRouter } from "next/router";

function IndustryCategory() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [action, setAction] = useState(0);
  const [capitalSubsidy, setCapitalSubsidy] = useState(0);

  console.log(reports);

  const subsidyReports = useSelector((state) => state?.eligibleSubsidy);
  const district_taluka_name = useSelector((state) => state?.taluka);

  const capitalSubsidyData =
    subsidyReports?.eligible_subsidy?.subsidies?.filter(
      (sub, idx) => sub?.id === 1
    );
  console.log(capitalSubsidyData?.[0]?.id === 1);
  console.log(district_taluka_name?.selected_data?.category === "1");
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
  const restartSession = () => {
    dispatch(eligibleSubsidyAction.clearEligible());
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
        <div className={styles.tablee}>
          {/* <div
            className={`d-flex justify-content-between align-items-center ${styles.tableHeader}`}
          >
            <div className="d-flex justify-content-evenly ">
              <div className={`mx-2 ${styles.search_box}`}>
                <div className={styles.search_icon}>
                  <CiSearch />
                </div>
                <input
                  type="text"
                  className={styles.search_bar}
                  placeholder="Search Reports"
                />
              </div>

              <FilterButton name="Filter" />
            </div>
            <div className="d-flex">
              <div className={styles.add_new_btn}>
                <CustomButton
                  name="Add New Reports"
                  bgColor="#4682E3"
                  color="#FFFFFF"
                  onClick={addNewIndustryCategory}
                />
              </div>

              <ExportButton name="Export List" />
            </div>
          </div> */}
          <div className={styles.tableBody}>
            <div className="d-flex justify-content-between">
              <div style={{ margin: "15px" }}>
                {" "}
                <p>
                  <span style={{ fontWeight: "bold" }}> Subsidy name :</span>{" "}
                  {subsidyReports?.eligible_subsidy?.subsidies?.[0]
                    ?.subsidy_name !== ""
                    ? subsidyReports?.eligible_subsidy?.subsidies?.[0]
                        ?.subsidy_name
                    : "N/A"}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}> Sub-scheme name :</span>{" "}
                  {subsidyReports?.eligible_subsidy?.subsidies?.[0]?.scheme !==
                  ""
                    ? subsidyReports?.eligible_subsidy?.subsidies?.[0]?.scheme
                    : "N/A"}
                </p>
              </div>
              <div style={{ margin: "15px", visibility: "hidden" }}>
                <CustomButton
                  name="Restart Session"
                  color="#FFFFFF"
                  width="200px"
                  bgColor="#FA6130"
                  onClick={(e) => restartSession(e)}
                  className="position-relative"
                />
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div style={{ margin: "15px" }}>
                {" "}
                <p>
                  <span style={{ fontWeight: "bold" }}> State name :</span>{" "}
                  {subsidyReports?.selected_information?.stateID}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}> District name :</span>{" "}
                  {district_taluka_name?.selected_data?.district}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Taluka name :</span>{" "}
                  {district_taluka_name?.selected_data?.taluka}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Category :</span>{" "}
                  {district_taluka_name?.selected_data?.category}
                </p>
                {capitalSubsidyData?.[0]?.id === 1 && district_taluka_name?.selected_data?.category ===
                  "1" && (
                  <p>
                    <span style={{ fontWeight: "bold" }}>
                      Eligible Capital Subsidy :
                    </span>{" "}
                    {capitalSubsidy}
                  </p>
                )}
              </div>
              <div style={{ margin: "15px" }}>
                <p>
                  <span style={{ fontWeight: "bold" }}>Category name :</span>{" "}
                  {subsidyReports?.selected_information?.industryCategoryID}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Sector name :</span>{" "}
                  {subsidyReports?.selected_information?.industrySectorID}
                </p>
              </div>
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">SI No.</th>
                  <th scope="col">Question</th>
                  <th scope="col">Options</th>
                  <th scope="col">User Input</th>
                  <th scope="col"></th>
                  {/* <th scope="col">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {subsidyReports?.subsidy_report?.result?.map((data, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{data?.question_name}</td>
                      <td>
                        {data?.options?.length > 0
                          ? data?.options
                              ?.map((opt, ind) => {
                                return opt?.option;
                              })
                              .toString()
                          : "N/A"}
                      </td>
                      <td>{data?.answer}</td>
                      <td></td>
                      {/* <td>
                        <ul className="d-flex justify-content-between">
                          {actions?.map(({ icon: Icon }, idx) => {
                            return (
                              <li
                                key={idx}
                                onClick={() => handleClick(data, idx)}
                              >
                                <Icon color="#FA6130" size="18px" />
                              </li>
                            );
                          })}
                        </ul>
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default IndustryCategory;
