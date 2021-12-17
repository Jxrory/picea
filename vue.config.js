const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

import Components, { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImport from require('unplugin-auto-import/webpack')

module.exports = {
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
};
