import { report } from "./errorReport";

export const request = (
  input: RequestInfo,
  init?: RequestInit | undefined,
  expect?: string
) => {
  return fetch(input, init)
    .then(async (res) => {
      const clone = res.clone();
      const data = await res.json();
      const dataPrototype = Object.prototype.toString
        .call(data.data)
        .split("[object")[1]
        .split("]")[0]
        .trim();

      if (dataPrototype === expect) {
        const resErrotString = `期待的数据类型是${expect}但是返回的是${dataPrototype}`;
        report({
          type: "fetch",
          input,
          method: init?.method || "GET",
          body: init?.body || "",
          stack: resErrotString,
        });
      }
      return clone.json();
    })
    .catch((error) => {
      console.error(error);
      report({
        type: "fetch",
        input,
        method: init?.method || "GET",
        body: init?.body || "",
        stack: error.stack,
      });
    });
};
