export const report = (content) =>
  fetch("http://localhost:3001/api/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(content),
  }).catch(() => {});

window.addEventListener(
  "error",
  (event) => {
    const { target, filename } = event;
    let isElementTarget =
      target instanceof HTMLScriptElement ||
      target instanceof HTMLLinkElement ||
      target instanceof HTMLImageElement;
    if (isElementTarget) {
      // 静态资源加载异常上报
      const url = target?.src;
      // console.log("静态资源加载错误:", url);
      // report...
      report({
        type: "static_src",
        url,
      });
    } else {
      // js runtime 异常上报

      const { message, source, lineno, colno, error } = event;
      const errorMsg = { message, source, lineno, colno, error };
      console.log(
        message,
        "错误信息",
        source,
        "报错脚本的 url 地址",
        lineno,
        "行号",
        colno,
        "列号",
        error,
        "错误对象",
        event
      );
      // report...
      // console.log("js runtime错误:", stack);
      report({
        type: "js",
        errorMsg,
        filename,
      });
    }
  },
  true
);
if (window.PromiseRejectionEvent) {
  window.addEventListener("unhandledrejection", (event) => {
    //promise异常，report...
    // console.log("Promise错误:", event.reason.stack);
    report({
      type: "promise",
      stack: event.reason.stack,
      filename: event.filename,
    });
  });
}
