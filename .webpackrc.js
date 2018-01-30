import cssnano from 'cssnano';
import postcssCssnext from 'postcss-cssnext';
import packageJson from './package.json';

const {browserslist} = packageJson;

export default {
  entry: './src/index.js',
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
    production: {
      extraBabelPlugins: [
        'transform-react-remove-prop-types',
        'transform-react-constant-elements',
      ],
      hash: true,
      extraPostCSSPlugins: [
        postcssCssnext({
          browsers: browserslist.production,
        }),
        cssnano({
          filterPlugins: false,
          mergeIdents: false,
          reduceIdents: false,
          zindex: false,
        }),
      ],
    },
  },
  html: {
    template: './src/index.ejs',
  },
  extraBabelPlugins: [
    '@babel/transform-runtime',
    'babel-plugin-syntax-dynamic-import',
    'babel-plugin-syntax-trailing-function-commas',
    'babel-plugin-transform-async-to-generator',
    'babel-plugin-transform-exponentiation-operator',
    'babel-plugin-transform-class-properties',
    'babel-plugin-transform-optional-catch-binding',
    [
      'import',
      {
        libraryName: 'antd',
        style: true,
      },
    ],
  ],
  ignoreMomentLocale: true,
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    },
  },
};
