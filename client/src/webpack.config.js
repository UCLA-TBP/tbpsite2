const path = require("path");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = {
// Other rules like entry, output, devserver....,
plugins: [
    new NodePolyfillPlugin()
]}

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "fs": false,
      "child_process": false,
      "crypto": require.resolve("crypto-browserify"),
      "zlib": require.resolve("react-zlib-js")
    }
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ]
  }
};