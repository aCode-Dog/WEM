import React from "react";

const ErrorPage = () => {
  setTimeout(() => {
    throw new Error("js-runtime error");
  }, 1000);
  return <div>前端异常代码</div>;
};

export default ErrorPage;
