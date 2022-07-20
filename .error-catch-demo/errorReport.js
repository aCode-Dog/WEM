window.addEventListener(
  "error",
  (event) => {
    const { target, filename } = event;
    console.log(event);
    let isElementTarget =
      target instanceof HTMLScriptElement ||
      target instanceof HTMLLinkElement ||
      target instanceof HTMLImageElement;
    if (isElementTarget) {
      // 静态资源加载异常上报
      const url = target.src;
      console.log("静态资源加载错误:", url);
      // report...
    } else {
      // js runtime 异常上报
      const { stack } = event.error || {};
      // report...
      console.log("js runtime错误:", stack);
    }
  },
  true
);
if (window.PromiseRejectionEvent) {
  window.addEventListener("unhandledrejection", (event) => {
    //promise异常，report...
    console.log("Promise错误:", event.reason.stack);
  });
}
window.addEventListener(
  "load",
  function () {
    const resources = performance.getEntriesByType("resource");
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

        if (duration > 500 || transferSize === 0) {
          return value;
        }
      });

    // 最终上报数据
    const data = rourceErrorData.map((value) => {
      const { initiatorType: resourceType, name: resUrl, startTime } = value;
      return {
        resUrl,
        type: "error",
        subType: "resource",
        startTime,
        resourceType,
        pageURL: window.location.href,
      };
    });
    report(data);
  },
  false
);
