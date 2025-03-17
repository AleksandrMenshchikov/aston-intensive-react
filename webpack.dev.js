import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    compress: true,
    port: 3000,
    historyApiFallback: true,
    hot: true,
    allowedHosts: 'all',
  },
});
