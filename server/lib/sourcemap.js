const fs = require("fs");
const path = require("path");
const { SourceMapConsumer } = require("source-map-js");

const Fs = require("fs-extra");
const devpathReg = /(?<=.*\d{4}\/).*/g;
const errorReg = /(?<=.*:)\d+:\d+/g;
const stackPathReg = /(?<=.*\d{4}\/).*(?=:\d+:\d+)/g;
const sourceReg = /(?<=.*client).*/g;
const developerReg = /(?<=\().*\d{4}-\d{2}-\d{2} \d+:\d+:\d+/g;

const JS_TYPE_LIST = ["js", "promise"];

const { readFileSync } = fs;

const originalPositionFor = async (errorMsg, sourceFilePath) => {
  try {
    const { lineno, colno } = errorMsg;
    mapfilepath = path.resolve(__dirname, `../.maps/source.js.map`);
    rawSourceMap = readFileSync(mapfilepath, "utf-8");
    const consumer = new SourceMapConsumer(JSON.parse(rawSourceMap));
    console.log(lineno, colno);
    const pos = lineno
      ? consumer.originalPositionFor({
          line: lineno,
          column: colno,
        })
      : null;
    console.log(pos, "位置");
    return pos;
  } catch (error) {
    console.error(`error:source-map-path: ${sourceFilePath}`, error);
  }
};
// const findDeveloper = ({ source, line }) => {
//   if (!source || !line) {
//     return;
//   }
//   const cuSource = source.match(sourceReg);
//   return runShell(
//     `git blame ./client${cuSource && cuSource[0]} -L ${line},${line}`
//   ).then((res) => {
//     const data = res.match(developerReg)[0]?.split(" ");
//     return {
//       developer: data[0],
//       time: `${data[1]} ${data[2]}`,
//     };
//   });
// };

module.exports = {
  originalPositionFor,
  // findDeveloper,
  JS_TYPE_LIST,
};
