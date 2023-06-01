import React from "react";
// import styles from "../../styles/Home.module.css";
// import { TfiExport } from "react-icons/tfi";
// import { BiFilter } from "react-icons/bi";
// import Dropdown from "react-bootstrap/Dropdown";

export const CustomButton = ({
  name,
  type,
  bgColor,
  color,
  width,
  height,
  onClick,
  border,
}) => {
  return (
    <>
      <button
        type={type}
        style={{
          color: color,
          backgroundColor: bgColor,
          width: width,
          height: height,
          border: border,
        }}
        onClick={onClick}
        className={`btn mx-2`}
      >
        {name}
      </button>
    </>
  );
};
