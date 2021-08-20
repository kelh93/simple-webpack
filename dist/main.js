(function (modules) {
    // webpackBootstrap
    // The module cache
    // 缓存已经加载的模块
    var installedModules = {};

    // The require function
    function __webpack_require__(moduleId) {
        // Check if module is in cache
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        // Create a new module (and put it into the cache)
        var module = (installedModules[moduleId] = {
            exports: {}
        });

        // 加载模块里面的代码
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        // Flag the module as loaded
        module.l = true;

        // Return the exports of the module
        return module.exports;
    }

    // Load entry module and return exports
    return __webpack_require__('./src/index.js');
})({
    './src/index.js': function (module, __webpack_exports__, __webpack_require__) {
        'use strict';
        // __webpack_require__.r(__webpack_exports__);
        var _sync_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sync.js */ './src/sync.js');
        console.log('外部文件', _sync_js__WEBPACK_IMPORTED_MODULE_0__['default']);
        console.log('simple-webpack');
    },

    './src/sync.js': function (module, __webpack_exports__, __webpack_require__) {
        'use strict';
        // __webpack_require__.r(__webpack_exports__);
        const data = 'test-data';
        __webpack_exports__['default'] = data;
    }
});
