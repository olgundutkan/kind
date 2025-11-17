const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = (env, argv) => {
  const isDev = argv.mode !== 'production'

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'assets/[name].[contenthash].js',
      publicPath: '/idp-frontend/',
      clean: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@api': path.resolve(__dirname, 'src/api'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@store': path.resolve(__dirname, 'src/store'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.s?css$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  localIdentName: isDev
                    ? '[path][name]__[local]'
                    : '[hash:base64:6]',
                },
                sourceMap: isDev,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDev,
              },
            },
          ],
          include: /\.module\.s?css$/,
        },
        {
          test: /\.s?css$/i,
          exclude: /\.module\.s?css$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          type: 'asset',
        },
      ],
    },
    devServer: {
      historyApiFallback: {
        index: '/idp-frontend/index.html',
      },
      static: {
        directory: path.join(__dirname, 'public'),
      },
      allowedHosts: ['local.portal.k2.io'],
      proxy: [
        {
          context: ['/idp-backend'],
          target: 'http://localhost:3001',
          changeOrigin: true,
          pathRewrite: { '^/idp-backend': '' },
        },
      ],
      port: 3000,
      hot: true,
      client: {
        overlay: true,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
      }),
      ...(isDev ? [new ReactRefreshWebpackPlugin()] : []),
    ],
    devtool: isDev ? 'eval-source-map' : 'source-map',
  }
}
