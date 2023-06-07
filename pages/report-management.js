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

function IndustryCategory() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [action, setAction] = useState(0);

  console.log(reports);

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
          <div
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
                {/* <CustomButton
                  name="Add New Reports"
                  bgColor="#4682E3"
                  color="#FFFFFF"
                  onClick={addNewIndustryCategory}
                /> */}
              </div>

              <ExportButton name="Export List" />
            </div>
          </div>
          <div className={styles.tableBody}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">SI No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Options</th>
                  <th scope="col">Answer</th>
                  <th scope="col"></th>
                  {/* <th scope="col">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {reports?.map((data, index) => {
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
