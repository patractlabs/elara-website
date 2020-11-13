import React from "react";
import { Spin } from "antd";

export default function PageLoading() {
  return (
    <div className="page-center">
      <Spin size="large" />
    </div>
  );
}
