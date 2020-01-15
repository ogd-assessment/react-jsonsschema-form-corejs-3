"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _react = require("react");

var types = _interopRequireWildcard(require("../../types"));

var NullField =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(NullField, _Component);

  function NullField() {
    (0, _classCallCheck2["default"])(this, NullField);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(NullField).apply(this, arguments));
  }

  (0, _createClass2["default"])(NullField, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.formData === undefined) {
        this.props.onChange(null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return NullField;
}(_react.Component);

if (process.env.NODE_ENV !== "production") {
  NullField.propTypes = types.fieldProps;
}

var _default = NullField;
exports["default"] = _default;