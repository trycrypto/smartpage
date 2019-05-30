const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
//const dependencies = Object.keys(require("./package.json").dependencies);

module.exports = {
  entry: {
    'SmartPage': path.join(__dirname, "src/editor.html")
  },
 // externals: dependencies,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader?url=false"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader', options: { name: 'img/[name].[ext]?[hash]' } 
          }
        ]
      },
      {
        test: /\.html$/,
        use: "html-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html' 
    }),
    new CopyWebpackPlugin([
      { from: 'src/themes', to: 'themes' },
      { from: 'src/css', to: 'css' },
      { from: 'src/editor.html' },
      { from: 'src/demo', to: 'demo' },
      { from: 'src/fonts', to: 'fonts' },
      { from: 'src/libs', to: 'libs' },
      { from: 'src/js', to: 'js' },
      { from: 'src/img', to: 'img' },
      { from: 'src/photoblock', to: 'photoblock' }
    ])
  ],
  resolve: {
    extensions: [".js"]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: "0.0.0.0",
    stats: "minimal"
  }
};
