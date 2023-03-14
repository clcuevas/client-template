import { Configuration as WebpackConfiguration } from 'webpack'
import merge from 'webpack-merge'

import { config as commonConfig } from './webpack.common'

interface Configuration extends WebpackConfiguration {
  mode?: 'development' | 'none' | 'production' | undefined
}

const config = merge(commonConfig as Configuration, { mode: 'production', devtool: 'source-map' })

export default config
