module.exports = {
  entry: "./index.js",
  output: {
    path: __dirname + "/../public/javascripts",
    filename: "index.js"
  },
  externals: {
    "openlayers": "ol"
  }
};
