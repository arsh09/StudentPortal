const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    resolve: {
      fallback: { path: require.resolve('path-browserify') },
    },
  },

  pluginOptions: {
    electronBuilder: {
      externals: [ "better-sqlite3"],
      preload: 'src/preload.js',
    }
  }

});
