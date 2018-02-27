
module.exports = {
  entry: `${__dirname}/src/app.js`,
  output: {
    path: `${__dirname}`,
    filename: 'bundle.js'
  },
  module:{
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};