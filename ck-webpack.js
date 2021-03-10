const fs = require('fs');
const babylon = require('babylon');
const traverse = require('@babel/traverse').default;
const MagicString = require('magic-string');
const ejs = require('ejs');
const { join } = require('path');

const entry = './src/index.js';

let depencies = [];

function parse(filename) {
  let array = [];
  const content = fs.readFileSync(filename, 'utf-8');
  const code = new MagicString(content);
  const ast = babylon.parse(content, {
    sourceType: 'module',
  });
  console.log('ast', ast);
  traverse(ast, {
    ExportDeclaration({ node }) {
      const { start, end, declaration } = node;
      code.overwrite(start, end, `__webpack_exports__["default"] = ${declaration.name}`);
    },
    ImportDeclaration({ node }) {
      const { start, end, specifiers, source } = node;
      console.log('node', node);
      const newfile = './src/' + join(source.value);
      code.overwrite(start, end, `var ${specifiers[0].local.name} = __webpack_require__("${newfile}").default`);
      array.push(newfile);
    },
  });
  console.log('生成的代码', code.toString());
  const _code = code.toString();
  depencies.push({
    filename,
    _code,
  });
  return array;
}

const result = parse(entry);
for (let item of result) {
  parse(item);
}

const template = `
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
  <% for(var i=0;i<depencies.length;i++){ %>
    "<%- depencies[i]["filename"] %>":(function(module, __webpack_exports__, __webpack_require__){
      <%- depencies[i]._code%>
    }),
  <% }%>
});
`;

const ejsResult = ejs.render(template, {
  depencies,
});

fs.writeFileSync('./dist/main.js', ejsResult);
