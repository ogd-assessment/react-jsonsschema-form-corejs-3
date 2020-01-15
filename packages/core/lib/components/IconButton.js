"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = IconButton;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

function IconButton(props) {
  var _context;

  var _props$type = props.type,
      type = _props$type === void 0 ? "default" : _props$type,
      icon = props.icon,
      className = props.className,
      otherProps = (0, _objectWithoutProperties2["default"])(props, ["type", "icon", "className"]);
  return _react["default"].createElement("button", (0, _extends2["default"])({
    type: "button",
    className: (0, _concat["default"])(_context = "btn btn-".concat(type, " ")).call(_context, className)
  }, otherProps), _react["default"].createElement("i", {
    className: "glyphicon glyphicon-".concat(icon)
  }));
}