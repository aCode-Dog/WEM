import { report } from "./reportError";
export const request = (
  input: RequestInfo,
  init?: RequestInit | undefined,
  expect = "undefined"
) => {
  return fetch(input, init)
    .then(async (res) => {
      const clone = res.clone();
      const data = await res.json();
      const dataPrototype = Object.prototype.toString
        .call(data.data)
        .split("[object")[1]
        .split("]")[0]
        .trim()
        .toLocaleLowerCase();
      if (dataPrototype !== expect.toLocaleLowerCase()) {
        const resErrotString = `The expected data type is "${expect?.toLocaleLowerCase()}" , but what comes back is "${dataPrototype}"`;
        report({
          type: "fetch",
          input,
          method: init?.method || "GET",
          body: init?.body || "",
          stack: resErrotString,
          pageURL: window.location.href,
        });
      }
      return clone.json();
    })
    .catch((error) => {
      report({
        type: "fetch",
        input,
        method: init?.method || "GET",
        body: init?.body || "",
        stack: error.stack,
        pageURL: window.location.href,
      });
    });
};
