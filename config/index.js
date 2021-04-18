// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dam/index.html'),
    assetsRoot: path.resolve(__dirname, '../dam'),
    assetsSubDirectory: 'static',
    // assetsPublicPath: 'https://jingjingke.github.io/vuePro-demo/dist/',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 80,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {//前端路由匹配模式
        target: 'http://localhost:8088',  //后端请求服务域名和端口
        changeOrigin: true,   //设置请求头
   /*     pathRewrite: {
          '^/api': ''   //路径重写 如果后端有api就不用重写
        },*/
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
