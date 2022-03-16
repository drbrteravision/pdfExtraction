const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: {
        app:'./src/index.js'
    },
    watch: true,
    devtool: 'source-map',
    output: {
        filename:'[name].bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: { presets: ['@babel/env','@babel/preset-react'] },
            },
            {
                test:/\.s[ac]ss$/i,
                use:[
                     // Creates `style` nodes from JS strings 3.
                    "style-loader",
                    // Translates CSS into CommonJS 2.__|
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                          postcssOptions: {
                            plugins: [
                              [
                                "postcss-preset-env",
                                {
                                  // Options
                                },
                              ],
                            ],
                          },
                        },
                      },
                      // Compiles Sass to CSS 1. __|
                    "sass-loader",],
            },
            {
              test: /\.(pdf)$/i,
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            }
        ]
    },
    resolve: {
        extensions: [
            '.js'
        ],
        // fallback: { //This was added for @react-pdf/renderer component
        //     process: require.resolve("process/browser"),
        //     zlib: require.resolve("browserify-zlib"),
        //     stream: require.resolve("stream-browserify"),
        //     util: require.resolve("util"),
        //     buffer: require.resolve("buffer"),
        //     asset: require.resolve("assert"),
        // }
    },
    plugins: [
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            host: 'localhost',
            port: 3000,
            // server: { baseDir: ['dist'] },
            proxy:'http://192.168.8.44:8000/'
          }),
          new webpack.ProvidePlugin({  //This was added for @react-pdf/renderer component
            Buffer: ["buffer", "Buffer"],
            process: "process/browser",
          })
      ]
}
