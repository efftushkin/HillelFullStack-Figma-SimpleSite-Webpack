const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

/**
 * Development configuration
 * Optimized for fast development with Hot Module Replacement
 */

module.exports = {
  mode: 'development',
  
  entry: {
    main: './src/index.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    // Without hashing for speed
    filename: 'js/[name].js',
    assetModuleFilename: 'assets/[name][ext]',
    publicPath: '/',
  },

  // Fast source maps for debugging
  devtool: 'eval-source-map',

  // Dev Server configuration
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    hot: true, // Hot Module Replacement
    open: true, // Auto open browser
    historyApiFallback: true, // For SPA
    watchFiles: ['src/**/*'],
    
    // Detailed logs
    client: {
      logging: 'info',
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
  },

  module: {
    rules: [
      // SASS/SCSS/CSS - with style-loader for HMR
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader', // Faster for dev
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                indentedSyntax: true,
              },
            },
          },
        ],
      },

      // Images
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: './img/[name][ext]',
        },
      },

      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },

      // TypeScript
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // Faster builds in dev
            },
          },
        ],
      },

      // JavaScript with Babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/img',
          to: 'img',
          noErrorOnMissing: true,
        },
      ],
    }),

    // ESLint plugin for real-time code checking
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      exclude: ['node_modules', 'dist'],
      emitWarning: true,
      failOnError: false, // Don't fail build on errors in dev
      failOnWarning: false,
    }),
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.sass', '.scss', '.css'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@img': path.resolve(__dirname, 'img'),
      '@scss': path.resolve(__dirname, 'scss'),
    },
  },

  // Optimization for fast builds
  optimization: {
    moduleIds: 'named',
    runtimeChunk: 'single',
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },

  // Caching for faster repeated builds
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },

  // Stats
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  },
};
