const fs = require("fs");
const path = require("path");
const { SourceMapConsumer } = require("source-map-js");
const runShell = require("../until/runshell");
const Fs = require("fs-extra");

const sourceReg = /(?<=.*client).*/g;
const developerReg = /(?<=\().*\d{4}-\d{2}-\d{2} \d+:\d+:\d+/g;

const JS_TYPE_LIST = ["js", "promise"];

const { readFileSync } = fs;

const originalPositionFor = async (errorMsg, sourceFilePath) => {
  try {
    if (!errorMsg) return;
    const { lineno, colno } = errorMsg;
    mapfilepath = path.resolve(__dirname, `../.maps/source.js.map`);

    rawSourceMap = readFileSync(mapfilepath, "utf-8");
    const consumer = await new SourceMapConsumer(JSON.parse(rawSourceMap));
    const pos = lineno
      ? consumer.originalPositionFor({
          line: lineno,
          column: colno,
        })
      : null;
    const sourceIndex = consumer.sources.findIndex(
      (item) => item === pos.source
    );
    const sourceContent = consumer.sourcesContent[sourceIndex];
    if (!sourceContent) return pos;
    const contentRowArr = sourceContent.split("\n");

    const errorText = contentRowArr[pos.line - 1];
    pos.errorText = errorText;
    return pos;
  } catch (error) {
    console.error(`error:source-map-path: ${sourceFilePath}`, error);
  }
};
const findDeveloper = ({ source, line }) => {
  if (!source || !line) {
    return;
  }

  const cuSource = source.match(sourceReg);
  return runShell(
    `git blame ../client${cuSource && cuSource[0]} -L ${line},${line}`
  )
    .then((res) => {
      const data = res.match(developerReg)[0]?.split(" ");
      return {
        developer: data[0],
        time: `${data[1]} ${data[2]}`,
      };
    })
    .catch((e) => {
      console.log(e, "定位开发者错误");
    });
};

module.exports = {
  originalPositionFor,
  findDeveloper,
  JS_TYPE_LIST,
};
