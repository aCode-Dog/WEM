import React from "react";
import { request } from "../utils/request";

const PerformanceTest = () => {
  const fetchClick = () => {
    request("https://www.ag-grid.com/example-assets/olympic-winners.json");
  };
  return (
    <div onClick={fetchClick}>
      前端性能检测
      <img
        src="https://ts4.cn.mm.bing.net/th?id=OIP-C.BF65ipuWVUGGZIkQJRe7OAHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"
        alt=""
      />
      ;
    </div>
  );
};

export default PerformanceTest;
