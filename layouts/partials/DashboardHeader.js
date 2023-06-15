import React from "react";
import styles from "../../styles/DashboardHeader.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";

const DashboardHeader = () => {
  //   const selectedCategory = useSelector((state) => state.sidebar);
  const allReportLists = useSelector((state) => state?.report);

  return (
    <>
      <div
        className={`d-flex justify-content-between align-items-center ${styles.header}`}
      >
        <div className={styles.header_name_a}>
          {allReportLists.selected_category}
        </div>
        <div className={styles.header_name_b}>
          Subsidy <IoIosArrowForward />
          {allReportLists.selected_category}
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
