import React, { FunctionComponent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
var fundebug = require("fundebug-javascript");
fundebug.init({
  apikey: "0fd4875f0a7ea38114050d80e3c3cf5ef442105bd5306852af6ba1dda1a1ee18",
});
// import "./utils/errorReport";

import Router from "./router";

ReactDOM.render(<Router />, document.querySelector("#react-root"));
