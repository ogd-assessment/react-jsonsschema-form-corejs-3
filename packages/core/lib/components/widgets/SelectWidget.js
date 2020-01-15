"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _every = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/every"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _set = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../utils");

var nums = new _set["default"](["number", "integer"]);
/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */

function processValue(schema, value) {
  // "enum" is a reserved word, so only "type" and "items" can be destructured
  var type = schema.type,
      items = schema.items;

  if (value === "") {
    return undefined;
  } else if (type === "array" && items && nums.has(items.type)) {
    return (0, _map["default"])(value).call(value, _utils.asNumber);
  } else if (type === "boolean") {
    return value === "true";
  } else if (type === "number") {
    return (0, _utils.asNumber)(value);
  } // If type is undefined, but an enum is present, try and infer the type from
  // the enum values


  if (schema["enum"]) {
    var _context, _context2;

    if ((0, _every["default"])(_context = schema["enum"]).call(_context, function (x) {
      return (0, _utils.guessType)(x) === "number";
    })) {
      return (0, _utils.asNumber)(value);
    } else if ((0, _every["default"])(_context2 = schema["enum"]).call(_context2, function (x) {
      return (0, _utils.guessType)(x) === "boolean";
    })) {
      return value === "true";
    }
  }

  return value;
}

function getValue(event, multiple) {
  if (multiple) {
    var _context3, _context4;

    return (0, _map["default"])(_context3 = (0, _filter["default"])(_context4 = (0, _slice["default"])([]).call(event.target.options)).call(_context4, function (o) {
      return o.selected;
    })).call(_context3, function (o) {
      return o.value;
    });
  } else {
    return event.target.value;
  }
}

function SelectWidget(props) {
  var schema = props.schema,
      id = props.id,
      options = props.options,
      value = props.value,
      required = props.required,
      disabled = props.disabled,
      readonly = props.readonly,
      multiple = props.multiple,
      autofocus = props.autofocus,
      _onChange = props.onChange,
      onBlur = props.onBlur,
      onFocus = props.onFocus,
      placeholder = props.placeholder;
  var enumOptions = options.enumOptions,
      enumDisabled = options.enumDisabled;
  var emptyValue = multiple ? [] : "";
  return _react["default"].createElement("select", {
    id: id,
    multiple: multiple,
    className: "form-control",
    value: typeof value === "undefined" ? emptyValue : value,
    required: required,
    disabled: disabled || readonly,
    autoFocus: autofocus,
    onBlur: onBlur && function (event) {
      var newValue = getValue(event, multiple);
      onBlur(id, processValue(schema, newValue));
    },
    onFocus: onFocus && function (event) {
      var newValue = getValue(event, multiple);
      onFocus(id, processValue(schema, newValue));
    },
    onChange: function onChange(event) {
      var newValue = getValue(event, multiple);

      _onChange(processValue(schema, newValue));
    }
  }, !multiple && schema["default"] === undefined && _react["default"].createElement("option", {
    value: ""
  }, placeholder), (0, _map["default"])(enumOptions).call(enumOptions, function (_ref, i) {
    var value = _ref.value,
        label = _ref.label;
    var disabled = enumDisabled && (0, _indexOf["default"])(enumDisabled).call(enumDisabled, value) != -1;
    return _react["default"].createElement("option", {
      key: i,
      value: value,
      disabled: disabled
    }, label);
  }));
}

SelectWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  SelectWidget.propTypes = {
    schema: _propTypes["default"].object.isRequired,
    id: _propTypes["default"].string.isRequired,
    options: _propTypes["default"].shape({
      enumOptions: _propTypes["default"].array
    }).isRequired,
    value: _propTypes["default"].any,
    required: _propTypes["default"].bool,
    disabled: _propTypes["default"].bool,
    readonly: _propTypes["default"].bool,
    multiple: _propTypes["default"].bool,
    autofocus: _propTypes["default"].bool,
    onChange: _propTypes["default"].func,
    onBlur: _propTypes["default"].func,
    onFocus: _propTypes["default"].func
  };
}

var _default = SelectWidget;
exports["default"] = _default;