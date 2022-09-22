export const report = (content) =>
  fetch("http://localhost:3002/api/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(content),
  }).catch(() => {});
