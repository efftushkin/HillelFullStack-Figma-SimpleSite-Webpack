const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    // Mode: development or production
    mode: isProduction ? 'production' : 'development',

    // Entry point
    entry: {
      main: './src/index.js',
    },

    // Output files
    output: {
      path: path.resolve(__dirname, 'dist'),
      // File hashing for browser caching
      filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      assetModuleFilename: isProduction 
        ? 'assets/[name].[contenthash:8][ext]' 
        : 'assets/[name][ext]',
      clean: true, // Clear dist before new build
    },

    // Source maps for debugging
    devtool: isProduction ? 'source-map' : 'eval-source-map',

    // Dev server configuration
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9001,
      hot: true,
      open: true,
      watchFiles: ['src/**/*'],
    },

    // Modules and file processing rules
    module: {
      rules: [
        // SASS/SCSS/CSS file processing
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            // Extract CSS to separate files
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            // Load CSS
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
            // Process SASS/SCSS
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProduction,
                sassOptions: {
                  indentedSyntax: true, // Support .sass syntax
                },
              },
            },
          ],
        },

        // Images processing
        {
          test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              // Files smaller than 8kb will be inlined as base64
              maxSize: 8 * 1024,
            },
          },
          generator: {
            filename: isProduction
              ? 'images/[name].[contenthash:8][ext]'
              : 'images/[name][ext]',
          },
        },

        // Fonts processing
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: isProduction
              ? 'fonts/[name].[contenthash:8][ext]'
              : 'fonts/[name][ext]',
          },
        },

        // TypeScript processing
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                cacheDirectory: true,
              },
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: !isProduction, // Faster dev builds
              },
            },
          ],
        },

        // JavaScript processing with Babel
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              cacheDirectory: true,
            },
          },
        },
      ],
    },

    // Plugins
    plugins: [
      // Clear dist before build
      new CleanWebpackPlugin(),

      // Generate HTML file
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        minify: isProduction
          ? {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
          }
          : false,
      }),

      // Extract CSS to separate files (only for production)
      ...(isProduction
        ? [
          new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[id].[contenthash:8].css',
          }),
        ]
        : []),

      // Copy static files
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/img',
            to: 'img',
            noErrorOnMissing: true,
          },
        ],
      }),

      // ESLint for code quality checking
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        exclude: ['node_modules', 'dist'],
        emitWarning: !isProduction,
        failOnError: isProduction,
        failOnWarning: false,
      }),

      // Bundle Analyzer (only when ANALYZE env var is set)
      ...(process.env.ANALYZE === 'true'
        ? [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: true,
            reportFilename: 'bundle-report.html',
          }),
        ]
        : []),
    ],

    // Optimization
    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },

    // Resolutions
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.sass', '.scss', '.css'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@img': path.resolve(__dirname, 'img'),
        '@scss': path.resolve(__dirname, 'scss'),
      },
    },
  };
};
