"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = _interopRequireDefault(require("./"));

function withTheme(themeProps) {
  return (0, _react.forwardRef)(function (_ref, ref) {
    var fields = _ref.fields,
        widgets = _ref.widgets,
        directProps = (0, _objectWithoutProperties2["default"])(_ref, ["fields", "widgets"]);
    fields = (0, _objectSpread2["default"])({}, themeProps.fields, fields);
    widgets = (0, _objectSpread2["default"])({}, themeProps.widgets, widgets);
    return _react["default"].createElement(_["default"], (0, _extends2["default"])({}, themeProps, directProps, {
      fields: fields,
      widgets: widgets,
      ref: ref
    }));
  });
}

withTheme.propTypes = {
  widgets: _propTypes["default"].object,
  fields: _propTypes["default"].object
};
var _default = withTheme;
exports["default"] = _default;