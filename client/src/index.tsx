import React, { FunctionComponent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Redirect, HashRouter, Route, Switch } from "react-router-dom";
import "./utils/errorReport";

import MultiCheck from "./MultiCheck/MultiCheck";
import { useSelectedOptionsChange } from "./effect";
import Router from "./router";
// setTimeout(() => {
//   throw new Error("js-runtime error");
// }, 1000);

// const App: FunctionComponent = (): JSX.Element => {
//   const { selectedValues, onSelectedOptionsChange, options } =
//     useSelectedOptionsChange();
//   return (
//     <div>
//       <img src="error-url" />
//       {/* <img
//         src="https://ts4.cn.mm.bing.net/th?id=OIP-C.BF65ipuWVUGGZIkQJRe7OAHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"
//         alt=""
//       /> */}

//       <MultiCheck
//         label="你最喜欢的技术是?"
//         options={options}
//         onChange={onSelectedOptionsChange}
//         values={selectedValues}
//         columns={4}
//       />
//       <div  onClick={()=>{
//          window.location.href = 'http://www.baidu.com';
//       }}>表格渲染</div>
//     </div>
//   );
// };

ReactDOM.render(<Router />, document.querySelector("#react-root"));
