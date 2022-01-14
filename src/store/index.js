import { createStore, createLogger } from "vuex";

import config from "./modules/config";
import user from "./modules/user";
import todos from "./modules/todos";

// // https://webpack.js.org/guides/dependency-management/#requirecontext
// const modulesFiles = require.context("./modules", true, /\.js$/);

// // you do not need `import app from './modules/app'`
// // it will auto require all vuex module from modules file
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   // set './app.js' => 'app'
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
//   const value = modulesFiles(modulePath);
//   modules[moduleName] = value.default;
//   return modules;
// }, {});

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    config,
    user,
    todos,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
