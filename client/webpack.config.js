const path = require('path');

module.exports = {
  entry: './src/index.js', // the entry point of your application
  output: {
    filename: 'bundle.js', // the name of the bundled file
    path: path.resolve(__dirname, 'dist'), // the directory where the bundled file will be saved
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // regex to select only .js and .jsx files
        exclude: /node_modules/, // exclude the node_modules directory
        use: {
          loader: 'babel-loader', // use babel-loader to transpile the selected files
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // use these presets
          },
        },
      },
      {
        test: /\.scss$/, // regex to select only .scss files
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader' // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ],
  },
};