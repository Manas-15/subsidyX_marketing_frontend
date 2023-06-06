import React from "react";
// import styles from "../../styles/Home.module.css";
// import { TfiExport } from "react-icons/tfi";
// import { BiFilter } from "react-icons/bi";
// import Dropdown from "react-bootstrap/Dropdown";
import { VscDebugRestart } from "react-icons/vsc";

export const CustomButton = ({
  name,
  type,
  bgColor,
  color,
  width,
  height,
  onClick,
  border,
  className,
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
        className={`btn mx-2 ${className}`}
      >
        {name === "Restart Session" && (
          <VscDebugRestart
            size="25px"
            style={{ position: "absolute", left: "7px", top: "5px" }}
          />
        )}
        {name}
      </button>
    </>
  );
};
