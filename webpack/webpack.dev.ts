import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import path from 'path'
import { Configuration as WebpackConfiguration } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
import merge from 'webpack-merge'

import { config as commonConfig } from './webpack.common'

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration
  mode?: 'development' | 'none' | 'production' | undefined
}

const config = merge(commonConfig as Configuration, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, '../public'),
    compress: true,
    port: 3000,
    hot: true,
  },
  plugins: [
    ...commonConfig.plugins,
    new ReactRefreshWebpackPlugin(),
    new BundleAnalyzerPlugin({ openAnalyzer: false }),
  ],
})

export default config
