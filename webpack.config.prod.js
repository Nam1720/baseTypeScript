const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const dotenv = require('dotenv').config();
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// module.exports = {
module.exports = () => {
  // const env = dotenv.config().parsed;
  // const envKeys = Object.keys(env).reduce((prev, next) => {
  //   prev[`process.env.${next}`] = JSON.stringify(env[next]);
  //   return prev;
  // }, {});

  return {
    mode: 'production',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    devtool: 'source-map',
    output: {
      // path: path.resolve(__dirname, 'dist'),
      // filename: 'bundle.js',
      // publicPath: '/',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.[jt]sx?$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        // {
        //   test: /\.(woff(2)|eot|ttf|otf|jpg|png|gif|svg|ico)$/,
        //   use: ['file-loader'],
        // },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, './src'),
        components: path.resolve(__dirname, './src/components'),
        middleware: path.resolve(__dirname, './src/middleware'),
        routes: path.resolve(__dirname, './src/routes'),
        assets: path.resolve(__dirname, './src/assets'),
        utils: path.resolve(__dirname, './src/utils'),
        store: path.resolve(__dirname, './src/store'),
        hooks: path.resolve(__dirname, './src/hooks'),
        pages: path.resolve(__dirname, './src/pages'),
        layouts: path.resolve(__dirname, './src/layouts'),
      },
    },
    plugins: [
      // new webpack.DefinePlugin(envKeys),
      new webpack.DefinePlugin({
        // <-- key to reducing React's size
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['dist'],
      }),
      // new OptimizeCssAssetsPlugin({
      //   assetNameRegExp: /\.css$/g,
      //   cssProcessor: require('cssnano'),
      //   cssProcessorPluginOptions: {
      //     preset: ['default', { discardComments: { removeAll: true } }],
      //   },
      //   canPrint: true,
      // }),
      // new MiniCssExtractPlugin({
      //   filename: '[name]-[hash].min.css',
      //   allChunks: true,
      // }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new TsconfigPathsPlugin(),
      // new webpack.DefinePlugin({
      //   'process.env': JSON.stringify(dotenv.parsed),
      // }),
      new Dotenv(),
      new WebpackBundleAnalyzer(),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      minimizer: [new TerserPlugin()],
    },
    devServer: {
      static: path.join(__dirname, './src'),
      port: 3001,
      hot: 'only',
      compress: true,
      // open: true,
      historyApiFallback: true,
    },
    stats: {
      children: true,
    },
  };
};
