const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  originalPositionFor,
  findDeveloper,
  JS_TYPE_LIST,
} = require("./lib/sourcemap");
const ddContrulor = require("./lib/send_dingding");

const port = 3002;

const app = express();

app.use(cors());
app.use(bodyParser.json({ type: "application/json" }));

app.post("/api/report", async function (req, res) {
  const { body } = req;
  if (!body?.type) {
    res.send(
      JSON.stringify({
        seccess: false,
        data: false,
      })
    );
    return;
  }
  console.log(body);
  const userAgent = req.headers["user-agent"];
  let reportContent = {
    ...body,
  };
  console.log(body, "查看类型");
  if (JS_TYPE_LIST.includes(body.type)) {
    // 源码追踪
    const position = await originalPositionFor(body.errorMsg, body.filename);
    if (!position) return;
    console.log(position, "position");
    //开发者追踪;
    const developer = await findDeveloper(position);
    reportContent = {
      ...reportContent,
      ...position,
      ...developer,
      userAgent,
    };
  }

  // 强通知
  await ddContrulor.send2developer(reportContent);
  res.send(
    JSON.stringify({
      seccess: true,
      data: true,
    })
  );
});

// mock-effct
app.post("/api/getMockOptions", function (req, res) {
  res.send(
    JSON.stringify({
      seccess: true,
      data: [
        { label: "BOND", value: "债券" },
        { label: "XSWAP", value: "利率互换" },
        { label: "SBF", value: "标债" },
        { label: "BF", value: "国债" },
      ],
    })
  );
});
// mock-table
app.post("/api/getTableList", function (req, res) {
  res.send(
    JSON.stringify({
      seccess: true,
      data: {},
      // data: [
      //   {
      //     age: 23,
      //     athlete: "Michael Phelps",
      //     bronze: 0,
      //     country: "United States",
      //     date: "24/08/2008",
      //     gold: 8,
      //     silver: 0,
      //     sport: "Swimming",
      //     total: 8,
      //     year: 2008,
      //   },
      //   {
      //     age: 23,
      //     athlete: "Michael Phelps",
      //     bronze: 0,
      //     country: "United States",
      //     date: "24/08/2008",
      //     gold: 8,
      //     silver: 0,
      //     sport: "Swimming",
      //     total: 8,
      //     year: 2008,
      //   },
      //   {
      //     age: 23,
      //     athlete: "Michael Phelps",
      //     bronze: 0,
      //     country: "United States",
      //     date: "24/08/2008",
      //     gold: 8,
      //     silver: 0,
      //     sport: "Swimming",
      //     total: 8,
      //     year: 2008,
      //   },
      //   {
      //     age: 23,
      //     athlete: "Michael Phelps",
      //     bronze: 0,
      //     country: "United States",
      //     date: "24/08/2008",
      //     gold: 8,
      //     silver: 0,
      //     sport: "Swimming",
      //     total: 8,
      //     year: 2008,
      //   },
      //   {
      //     age: 23,
      //     athlete: "Michael Phelps",
      //     bronze: 0,
      //     country: "United States",
      //     date: "24/08/2008",
      //     gold: 8,
      //     silver: 0,
      //     sport: "Swimming",
      //     total: 8,
      //     year: 2008,
      //   },
      //   {
      //     age: 23,
      //     athlete: "Michael Phelps",
      //     bronze: 0,
      //     country: "United States",
      //     date: "24/08/2008",
      //     gold: 8,
      //     silver: 0,
      //     sport: "Swimming",
      //     total: 8,
      //     year: 2008,
      //   },
      // ],
    })
  );
});
app.listen(port, () => {
  console.log(`EOS Server listening at http://localhost:${port}`);
});
