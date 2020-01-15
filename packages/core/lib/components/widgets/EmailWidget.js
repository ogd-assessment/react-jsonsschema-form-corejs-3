"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function EmailWidget(props) {
  var BaseInput = props.registry.widgets.BaseInput;
  return _react["default"].createElement(BaseInput, (0, _extends2["default"])({
    type: "email"
  }, props));
}

if (process.env.NODE_ENV !== "production") {
  EmailWidget.propTypes = {
    value: _propTypes["default"].string
  };
}

var _default = EmailWidget;
exports["default"] = _default;