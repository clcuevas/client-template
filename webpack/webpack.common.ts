import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCSSExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'

export const config = {
  entry: './src/index.tsx',
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: path.resolve(__dirname, '../node_modules'),
        include: path.join(__dirname, '../src'),
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCSSExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({ async: false }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
    }),
    new MiniCSSExtractPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].bundle.js',
    clean: true,
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      ['@components']: path.resolve(__dirname, '../src/components/'),
      ['@hooks']: path.resolve(__dirname, '../src/hooks/'),
      ['@reducers']: path.resolve(__dirname, '../src/reducers/index.ts'),
      ['@services']: path.resolve(__dirname, '../src/services/'),
      ['@styles']: path.resolve(__dirname, '../src/styles/'),
    },
  },
  optimization: {
    splitChunks: {
      // Split the biggest npm packages into their own chunk
      cacheGroups: {
        faker: {
          // TODO: Remove as quickly as possible. Size is 2.75 MiB
          test: /[\\/]node_modules[\\/](@faker-js)[\\/]/,
          name: 'faker-vendor',
          chunks: 'all',
        },
        numeral: {
          test: /[\\/]node_modules[\\/](numeral)[\\/]/,
          name: 'numeral-vendor',
          chunks: 'all',
        },
        mui: {
          test: /[\\/]node_modules[\\/](@mui)[\\/]/,
          name: 'mui-vendor',
          chunks: 'all',
        },
        firebase: {
          test: /[\\/]node_modules[\\/](@firebase)[\\/]/,
          name: 'firebase-vendor',
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },
}
