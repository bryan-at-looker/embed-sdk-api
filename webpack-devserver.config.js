var path = require('path')
var config = require ('./config')

var user = require('./demo/demo_user.json')
var { apiSignedUrl } = require('./server_utils/auth_utils')

var webpackConfig = {
  mode: 'development',
  entry: {
    demo: './demo/demo.ts'
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "demo")
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      config: path.join(__dirname, './config.js'),
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          compilerOptions: {
            declaration: false
          }
        }
      }
    ]
  },
  devServer: {
    compress: true,
    contentBase: [
      path.join(__dirname, "demo")
    ],
    host: config.demo_host,
    port: config.demo_port,
    watchContentBase: true,
    before: (app) => {
      app.get('/auth', async function(req, res) {
        // Authenticate the request is from a valid user here
        const src = req.query.src;
        const url = await apiSignedUrl(src, user)
        res.json(url);
      });
    }
  }
}

module.exports = webpackConfig
