import React from "react";
import { Spin } from "antd";

export const Loader = () => (
  // <div className="example">
  //   <Spin size="large" tip="Loading..." />
  // </div>
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: "999999",
      background: "rgba(0,0,0,0.2)",
      height: "100vh",
      width: "100vw",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "35%",
        left: "48%",
        transform: 'translate("-50%","-50%")',
      }}
    >
      <Spin
        size="large"
        tip="Loading..."
        style={{
          color: "#fa6130",
          height: "4rem",
          width: "4rem",
          borderWidth: "12px",
        }}
        animation="border"
      />
      {/* <Spinner
        size="lg"
        style={{
          color: "#fa6130",
          height: "4rem",
          width: "4rem",
          borderWidth: "12px",
        }}
        animation="border"
      /> */}
    </div>
  </div>
);

export const DotLoading = ({
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
        disabled
      >
        <span
          className="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        ></span>
        <span className="sr-only">{name}</span>
      </button>
    </>
  );
};
