import React, { FunctionComponent, useEffect, useState } from "react";
import MultiCheck from "./MultiCheck/MultiCheck";
import { useSelectedOptionsChange } from "./effect";
import { useHistory } from "react-router-dom";
const Components: FunctionComponent = (): JSX.Element => {
  const history = useHistory();
  const { selectedValues, onSelectedOptionsChange, options } =
    useSelectedOptionsChange();
  return (
    <div>
      <div style={{ display: "flex", marginBottom: "100px" }}>
        <div
          style={{ marginRight: "100px" }}
          onClick={() => [history.push({ pathname: "/table" })]}
        >
          跳转到table页
        </div>
        <div
          style={{ marginRight: "100px" }}
          onClick={() => [history.push({ pathname: "/errorPage" })]}
        >
          检测一下异步报错
        </div>
        <div
          style={{ marginRight: "100px" }}
          onClick={() => [history.push({ pathname: "/staticError" })]}
        >
          检测一下静态资源报错
        </div>
        <div
          style={{ marginRight: "100px" }}
          onClick={() => [history.push({ pathname: "/PerformanceTest" })]}
        >
          性能检测
        </div>
      </div>
      <MultiCheck
        label="你想了解的板块是?"
        options={options}
        onChange={onSelectedOptionsChange}
        values={selectedValues}
        columns={4}
      />
    </div>
  );
};
export default Components;
