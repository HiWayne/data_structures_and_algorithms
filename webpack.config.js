const path = require("path");
const glob = require("glob");

function getEntry() {
  const files = glob.sync("packages/**/src/**/*ts");
  const reg = /\/[a-zA-Z\d_\-]+\.(js|ts)$/i;
  return files.reduce((entry, filePath) => {
    const pathDir = filePath.replace(reg, "");
    entry[pathDir] = filePath;
    return entry;
  }, {});
}

module.exports = {
  entry: {
    circle: path.resolve(
      __dirname,
      "./packages/linked_list/src/circle/circle.ts"
    ),
    testCase: path.resolve(__dirname, "./packages/share/src/testCase/index.ts"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    chunkFilename: "[name].js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts/,
        exclude: /node_modules/,
        use: "typescript",
      },
    ],
  },
  node: {
    fs: "empty",
  },
};
