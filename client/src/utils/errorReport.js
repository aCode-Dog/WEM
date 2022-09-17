export const report = (content) =>
  fetch("http://localhost:3002/api/report", {
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
        pageURL: window.location.href,
        timeStamp: event.timeStamp.toFixed("1"),
      });
    } else {
      // js runtime 异常上报
      const { message, source, lineno, colno, error } = event;
      const errorMsg = { message, source, lineno, colno, error };
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

window.addEventListener(
  "load",
  function () {
    const resources = performance.getEntriesByType("resource");
    console.log(resources);
    const rourceErrorData =
      resources &&
      resources.filter((value) => {
        const { name, duration, initiatorType: type, transferSize } = value;

        /**
         * 监控资源error，响应时间超过20秒，SDK自身文件除外的所有资源error
         * @date 2021-11-28
         * @param {boolean} (Object.prototype.hasOwnProperty.call(resourceError, type) 监控资源
         * @param {date}  duration 资源加载时间
         * @param {date}  transferSize 资源大小
         * @returns {boolean}
         */

        if (duration > 200 || transferSize === 0) {
          return value;
        }
      });

    // 最终上报数据
    const data = rourceErrorData.map((value) => {
      const { initiatorType: resourceType, name: url, duration } = value;
      return {
        url,
        type: "static_src",
        subType: "resource",
        timeStamp: duration.toFixed(1),
        resourceType,
        pageURL: window.location.href,
      };
    });
    data.map((item) => {
      if (item.resourceType == "img") {
        report(item);
      }
    });
  },
  false
);
