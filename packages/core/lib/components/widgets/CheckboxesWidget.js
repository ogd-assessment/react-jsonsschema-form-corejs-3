"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _sort = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/sort"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function selectValue(value, selected, all) {
  var _context;

  var at = (0, _indexOf["default"])(all).call(all, value);
  var updated = (0, _concat["default"])(_context = (0, _slice["default"])(selected).call(selected, 0, at)).call(_context, value, (0, _slice["default"])(selected).call(selected, at)); // As inserting values at predefined index positions doesn't work with empty
  // arrays, we need to reorder the updated selection to match the initial order

  return (0, _sort["default"])(updated).call(updated, function (a, b) {
    return (0, _indexOf["default"])(all).call(all, a) > (0, _indexOf["default"])(all).call(all, b);
  });
}

function deselectValue(value, selected) {
  return (0, _filter["default"])(selected).call(selected, function (v) {
    return v !== value;
  });
}

function CheckboxesWidget(props) {
  var id = props.id,
      disabled = props.disabled,
      options = props.options,
      value = props.value,
      autofocus = props.autofocus,
      readonly = props.readonly,
      _onChange = props.onChange;
  var enumOptions = options.enumOptions,
      enumDisabled = options.enumDisabled,
      inline = options.inline;
  return _react["default"].createElement("div", {
    className: "checkboxes",
    id: id
  }, (0, _map["default"])(enumOptions).call(enumOptions, function (option, index) {
    var _context2;

    var checked = (0, _indexOf["default"])(value).call(value, option.value) !== -1;
    var itemDisabled = enumDisabled && (0, _indexOf["default"])(enumDisabled).call(enumDisabled, option.value) != -1;
    var disabledCls = disabled || itemDisabled || readonly ? "disabled" : "";

    var checkbox = _react["default"].createElement("span", null, _react["default"].createElement("input", {
      type: "checkbox",
      id: (0, _concat["default"])(_context2 = "".concat(id, "_")).call(_context2, index),
      checked: checked,
      disabled: disabled || itemDisabled || readonly,
      autoFocus: autofocus && index === 0,
      onChange: function onChange(event) {
        var all = (0, _map["default"])(enumOptions).call(enumOptions, function (_ref) {
          var value = _ref.value;
          return value;
        });

        if (event.target.checked) {
          _onChange(selectValue(option.value, value, all));
        } else {
          _onChange(deselectValue(option.value, value));
        }
      }
    }), _react["default"].createElement("span", null, option.label));

    return inline ? _react["default"].createElement("label", {
      key: index,
      className: "checkbox-inline ".concat(disabledCls)
    }, checkbox) : _react["default"].createElement("div", {
      key: index,
      className: "checkbox ".concat(disabledCls)
    }, _react["default"].createElement("label", null, checkbox));
  }));
}

CheckboxesWidget.defaultProps = {
  autofocus: false,
  options: {
    inline: false
  }
};

if (process.env.NODE_ENV !== "production") {
  CheckboxesWidget.propTypes = {
    schema: _propTypes["default"].object.isRequired,
    id: _propTypes["default"].string.isRequired,
    options: _propTypes["default"].shape({
      enumOptions: _propTypes["default"].array,
      inline: _propTypes["default"].bool
    }).isRequired,
    value: _propTypes["default"].any,
    required: _propTypes["default"].bool,
    readonly: _propTypes["default"].bool,
    disabled: _propTypes["default"].bool,
    multiple: _propTypes["default"].bool,
    autofocus: _propTypes["default"].bool,
    onChange: _propTypes["default"].func
  };
}

var _default = CheckboxesWidget;
exports["default"] = _default;