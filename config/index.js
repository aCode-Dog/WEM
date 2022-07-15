const path = require("path");

const fs = require("fs-extra");

const SOURCE_MAP_PATH = path.resolve(__dirname, "./../dist");
const UPLOAD_PATH = path.resolve(__dirname, "./../server/.maps/source.js.map");

fs.move(`${SOURCE_MAP_PATH}/main.js.map`, `${UPLOAD_PATH}`)
  .then(() => {
    console.info("打包完毕。");
  })
  .catch((error) => {
    console.info("打包失败", error);
  });
