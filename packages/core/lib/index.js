"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

_Object$defineProperty(exports, "withTheme", {
  enumerable: true,
  get: function get() {
    return _withTheme["default"];
  }
});

exports["default"] = void 0;

var _Form = _interopRequireDefault(require("./components/Form"));

var _withTheme = _interopRequireDefault(require("./withTheme"));

var _default = _Form["default"];
exports["default"] = _default;