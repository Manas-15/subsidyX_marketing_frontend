import styles from "../../styles/Report.module.css";
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
import Base from "@layouts/Baseof";
// import { eligibleSubsidyAction } from "../redux/Actions/eligibleSubsidyAction";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoIosArrowDropleft } from "react-icons/io";
import { reportManagementAction } from "redux/Actions/reportManagementAction";
import ViewReport from "./view-report";

const actions = [
  // { icon: BsShareFill },
  { icon: HiEye },
  { icon: RiDeleteBin5Fill },
];

const AllReportLists = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [action, setAction] = useState({});

  const allReportLists = useSelector((state) => state?.report);

  useEffect(() => {
    if (allReportLists?.allReports?.result?.length === 0) {
      router.push("/dashboard");
    }
  }, [allReportLists]);

  useEffect(() => {
    dispatch(reportManagementAction.getAllReportBasedOnUser());
  }, []);

  const addNewReports = () => {
    router.push("/dashboard");
  };

  const handleClick = (e, item, idx) => {
    // if (idx === 0) {
    //   setModalShow(true);
    //   setType("share");
    //   setAction(item);
    // } else
    if (idx === 0) {
      setModalShow(true);
      setType("view");
      setAction(item);
      dispatch(reportManagementAction.getReportByID(item?.id));
      dispatch(reportManagementAction.selectedCategory("View Report"));
      router.push("/report/view-report");
    } else {
      setModalShow(true);
      setType("delete");
      setAction(item?.id);
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
      <div className={styles.container}>
        {/* {modalShow ? (
        <ViewReport data={action} setModalShow={setModalShow} />
      ) : ( */}
        <>
          <div className={styles.tablee}>
            <div
              className={`d-flex justify-content-between align-items-center ${styles.tableHeader}`}
            >
              <div className="d-flex justify-content-evenly ">
                {/* <div className={`mx-2 ${styles.search_box}`}>
              <div className={styles.search_icon}>
                <CiSearch />
              </div>
              <input
                type="text"
                className={styles.search_bar}
                placeholder="Search Reports"
              />
            </div> */}

                {/* <FilterButton name="Filter" /> */}
              </div>
              <div className="d-flex">
                <div className={styles.add_new_btn}>
                  <CustomButton
                    name="Add New Reports"
                    bgColor="#4682E3"
                    color="#FFFFFF"
                    onClick={addNewReports}
                  />
                </div>

                {/* <ExportButton name="Export List" /> */}
              </div>
            </div>
            <div className={styles.tableBody}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Report ID.</th>
                    <th scope="col">Company Name</th>
                    <th scope="col">Company Owner Name</th>
                    <th scope="col">Created date</th>
                    <th colSpan="2">Category</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allReportLists?.allReports?.result?.map((data, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">#{data?.id}</th>
                        <td> - </td>
                        <td> - </td>
                        <td>{formattedDate}</td>
                        <td colSpan="2"> {data?.industry_category_name} </td>
                        <td>
                          <ul className="d-flex justify-content-between">
                            {actions?.map(({ icon: Icon }, idx) => {
                              return (
                                <li
                                  key={idx}
                                  onClick={(e) => handleClick(e, data, idx)}
                                >
                                  <Icon
                                    style={{
                                      fontSize: "18px",
                                      color: "#fa6130",
                                      cursor: "pointer",
                                    }}
                                  />
                                </li>
                              );
                            })}
                          </ul>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
        {/* )} */}
      </div>
    </Base>
  );
};

export default AllReportLists;
