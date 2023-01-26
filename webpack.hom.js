const webpack = require('webpack') // eslint-disable-line @typescript-eslint/no-var-requires
const webpackBase = require('./webpack.config.js') // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  ...webpackBase,
  mode: 'production',
  devtool: 'source-map',
  entry: [`${__dirname}/src/app.tsx`],
  plugins: [
    new webpack.DefinePlugin({
      __DEBUG__: JSON.stringify(false),
      CYPRESS: process.env.CYPRESS ? JSON.parse(process.env.CYPRESS) : false,
      STORYBOOK: JSON.stringify(false),
      LOCAL_API: false,
      'process.env.NODE_ENV': JSON.stringify('homolog'), // Tells React to build in either dev or prod modes
    }),
  ],
  output: {
    path: `${__dirname}/../../frontend/nfe/static/build/`,
    filename: 'build.min.js',
    sourceMapFilename: 'build.min.js.map',
  },
}
