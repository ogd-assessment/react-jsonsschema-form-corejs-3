"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = ErrorList;

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _react = _interopRequireDefault(require("react"));

function ErrorList(props) {
  var errors = props.errors;
  return _react["default"].createElement("div", {
    className: "panel panel-danger errors"
  }, _react["default"].createElement("div", {
    className: "panel-heading"
  }, _react["default"].createElement("h3", {
    className: "panel-title"
  }, "Errors")), _react["default"].createElement("ul", {
    className: "list-group"
  }, (0, _map["default"])(errors).call(errors, function (error, i) {
    return _react["default"].createElement("li", {
      key: i,
      className: "list-group-item text-danger"
    }, error.stack);
  })));
}