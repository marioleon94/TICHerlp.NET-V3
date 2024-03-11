// vue.config.js
module.exports = {
  runtimeCompiler: true,
  devServer: {
    port: process.env.VUE_APP_PORT || 8080
  }
};
