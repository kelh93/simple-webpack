(function (modules) {
  // webpackBootstrap
  // The module cache
  var installedModules = {};

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    });

    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
  }

  // Load entry module and return exports
  return __webpack_require__((__webpack_require__.s = './src/index.js'));
})({
  './src/index.js': function (module, __webpack_exports__, __webpack_require__) {
    // 'use strict';
    var _sync__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./src/sync.js');
    console.log('外部文件', _sync__WEBPACK_IMPORTED_MODULE_0__['default']);
    console.log('simple-webpack');
  },

  './src/sync.js': function (module, __webpack_exports__, __webpack_require__) {
    // 'use strict';
    const data = 'test-data';
    __webpack_exports__['default'] = data;
  },
});
