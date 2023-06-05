import React from "react";
import { Spin } from "antd";

const Loader = () => (
  <div className="example">
    <Spin size="large" tip="Loading..." />
  </div>
);

export default Loader;
