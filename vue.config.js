const path = require("path");

module.exports = {
  devServer: {
    port: 8999, // 端口号配置
    open: true // 自动打开浏览器
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  transpileDependencies: true,
  lintOnSave: false,
  //全局颜色配置
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/assets/css/baseColor.less")]
    }
  },

  configureWebpack: {
    // 把原本需要写在webpack.config.js中的配置代码 写在这里 会自动合并
    externals: {
      jquery: "$",
      echarts: "echarts"
      // 'axios' : 'axios'
    }
  }
};
