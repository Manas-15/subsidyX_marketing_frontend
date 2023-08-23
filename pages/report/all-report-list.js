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
import { ReportManagementModal } from "@layouts/components/Modal";
import Pagination from "../../layouts/components/Pagination";
import { Button, Form, InputGroup } from "react-bootstrap";
import withAuth from "@layouts/partials/withAuth";
import { eligibleSubsidyAction } from "redux/Actions/eligibleSubsidyAction";

const actions = [
  // { icon: BsShareFill },
  { icon: HiEye },
  { icon: RiDeleteBin5Fill },
];

const AllReportLists = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const allReportLists = useSelector((state) => state?.report);
  const defaultPage = allReportLists?.saved_page_date?.page
    ? allReportLists?.saved_page_date?.page
    : 1;
  const defaultPageSize = allReportLists?.saved_page_date?.pageSize
    ? allReportLists?.saved_page_date?.pageSize
    : 20;

  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [action, setAction] = useState({});
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [page, setPage] = useState(defaultPage);
  const [search, setSearch] = useState("");
  // const [sortHeader, setSortHeader] = useState("name");

  useEffect(() => {
    const extraData = {
      next: false,
      path: "",
    };
    dispatch(eligibleSubsidyAction.benefitsData(extraData));
    dispatch(eligibleSubsidyAction.clearEligible());
  }, []);

  useEffect(() => {
    if (allReportLists?.allReports?.result?.length === 0) {
      router.push("/dashboard");
    }
  }, [allReportLists]);

  useEffect(() => {
    dispatch(
      reportManagementAction.getAllReportBasedOnUser({
        pagination: { page, pageSize },
      })
    );
    const data = { page, pageSize };
    dispatch(reportManagementAction.savedPageData(data));
  }, [page, pageSize]);

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
        {modalShow && (
          <ReportManagementModal
            type={type}
            setType={setType}
            action={action}
            setAction={setAction}
            setModalShow={setModalShow}
          />
        )}
        <div className={styles.tablee}>
          <div
            className={`d-flex justify-content-between align-items-center ${styles.tableHeader}`}
          >
            <div className="d-flex justify-content-evenly ">
              <div className={`mx-2 ${styles.search_box}`}>
                <Form.Group className="mb-3" controlId="search">
                  <InputGroup>
                    <Button
                      disabled
                      style={{
                        color: "black",
                        background: "white",
                        borderColor: "white",
                        borderTopLeftRadius: "10px",
                        borderBottomLeftRadius: "10px",
                        border: "2px solid rgba(0,0,0,0.2)",
                        borderRight: "none",
                      }}
                    >
                      {<CiSearch />}
                    </Button>
                    <Form.Control
                      autoComplete="off"
                      style={{
                        padding: "0.5rem",
                        border: "2px solid rgba(0,0,0,0.2)",
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                        borderTopLeftRadius: "0px",
                        borderBottomLeftRadius: "0px",
                        borderLeft: "none",
                      }}
                      placeholder="Search by ID..."
                      type={"text"}
                      name="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </div>

              {/* <FilterButton name="Filter" /> */}
            </div>
            <div className="d-flex">
              <div className={styles.add_new_btn}>
                <CustomButton
                  name="Add New Reports"
                  bgColor="#F0EAFF"
                  color="#000000"
                  onClick={addNewReports}
                  border="1px solid #F0EAFF"
                />
              </div>

              {/* <ExportButton name="Export List" /> */}
            </div>
          </div>
          <div className={styles.tableBody}>
            <table className="table table-hover">
              <thead>
                <tr className="text-center">
                  <th className="p-4" scope="col">
                    Report ID.
                  </th>
                  <th className="p-4" scope="col">
                    Company Name
                  </th>
                  <th className="p-4" scope="col">
                    Company Owner Name
                  </th>
                  <th className="p-4" scope="col">
                    Created date
                  </th>
                  <th className="p-4" scope="col">
                    Created by
                  </th>
                  <th className="p-4" scope="col">
                    Category
                  </th>
                  <th className="p-4" scope="col">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {allReportLists?.allReports?.result
                  ?.filter((x) =>
                    x?.id !== null
                      ? x?.id?.toString()?.includes(search.toLowerCase())
                      : true
                  )
                  .map((data, index) => {
                    return (
                      <tr className="text-center" key={index}>
                        <th scope="col">#{data?.id}</th>
                        <td scope="col">
                          {data?.company_name !== null
                            ? data?.company_name
                            : "-"}
                        </td>
                        <td scope="col">
                          {data?.owner_name !== null ? data?.owner_name : "-"}
                        </td>
                        <td scope="col">
                          {new Date(data?.dt_created)
                            ?.toLocaleDateString("en-GB")
                            .replace(/\//g, "-")}
                        </td>
                        <td scope="col">{data?.user_username}</td>
                        <td scope="col">
                          {data?.industry_category_name !== null
                            ? data?.industry_category_name
                            : "-"}
                        </td>
                        <td scope="col">
                          <ul className="d-flex justify-content-center">
                            {actions?.map(({ icon: Icon }, idx) => {
                              return (
                                <li
                                  key={idx}
                                  onClick={(e) => handleClick(e, data, idx)}
                                >
                                  <Icon
                                    color="#FA6130"
                                    size="18px"
                                    className="action_icon m-2"
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
        <Pagination
          pageSizeOptions={[5, 10, 20, 50]}
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          setPage={setPage}
          totalItems={allReportLists?.allReports?.total_items}
        />
      </div>
    </Base>
  );
};

export default withAuth(AllReportLists);
