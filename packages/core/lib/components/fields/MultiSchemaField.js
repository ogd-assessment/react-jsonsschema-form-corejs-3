"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/get-iterator"));

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/assign"));

var _parseInt2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/parse-int"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var types = _interopRequireWildcard(require("../../types"));

var _utils = require("../../utils");

var AnyOfField =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(AnyOfField, _Component);

  function AnyOfField(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, AnyOfField);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AnyOfField).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onOptionChange", function (option) {
      var selectedOption = (0, _parseInt2["default"])(option, 10);
      var _this$props = _this.props,
          formData = _this$props.formData,
          onChange = _this$props.onChange,
          options = _this$props.options,
          registry = _this$props.registry;
      var definitions = registry.definitions;
      var newOption = (0, _utils.retrieveSchema)(options[selectedOption], definitions, formData); // If the new option is of type object and the current data is an object,
      // discard properties added using the old option.

      var newFormData = undefined;

      if ((0, _utils.guessType)(formData) === "object" && (newOption.type === "object" || newOption.properties)) {
        newFormData = (0, _assign["default"])({}, formData);
        var optionsToDiscard = (0, _slice["default"])(options).call(options);
        (0, _splice["default"])(optionsToDiscard).call(optionsToDiscard, selectedOption, 1); // Discard any data added using other options

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator2["default"])(optionsToDiscard), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _option = _step.value;

            if (_option.properties) {
              for (var key in _option.properties) {
                if (newFormData.hasOwnProperty(key)) {
                  delete newFormData[key];
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } // Call getDefaultFormState to make sure defaults are populated on change.


      onChange((0, _utils.getDefaultFormState)(options[selectedOption], newFormData, definitions));

      _this.setState({
        selectedOption: (0, _parseInt2["default"])(option, 10)
      });
    });
    var _this$props2 = _this.props,
        _formData = _this$props2.formData,
        _options = _this$props2.options;
    _this.state = {
      selectedOption: _this.getMatchingOption(_formData, _options)
    };
    return _this;
  }

  (0, _createClass2["default"])(AnyOfField, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (!(0, _utils.deepEquals)(this.props.formData, prevProps.formData) && this.props.idSchema.$id === prevProps.idSchema.$id) {
        var matchingOption = this.getMatchingOption(this.props.formData, this.props.options);

        if (!prevState || matchingOption === this.state.selectedOption) {
          return;
        }

        this.setState({
          selectedOption: matchingOption
        });
      }
    }
  }, {
    key: "getMatchingOption",
    value: function getMatchingOption(formData, options) {
      var definitions = this.props.registry.definitions;
      var option = (0, _utils.getMatchingOption)(formData, options, definitions);

      if (option !== 0) {
        return option;
      } // If the form data matches none of the options, use the currently selected
      // option, assuming it's available; otherwise use the first option


      return this && this.state ? this.state.selectedOption : 0;
    }
  }, {
    key: "render",
    value: function render() {
      var _context;

      var _this$props3 = this.props,
          baseType = _this$props3.baseType,
          disabled = _this$props3.disabled,
          errorSchema = _this$props3.errorSchema,
          formData = _this$props3.formData,
          idPrefix = _this$props3.idPrefix,
          idSchema = _this$props3.idSchema,
          onBlur = _this$props3.onBlur,
          onChange = _this$props3.onChange,
          onFocus = _this$props3.onFocus,
          options = _this$props3.options,
          registry = _this$props3.registry,
          uiSchema = _this$props3.uiSchema,
          schema = _this$props3.schema;
      var _SchemaField = registry.fields.SchemaField;
      var widgets = registry.widgets;
      var selectedOption = this.state.selectedOption;

      var _getUiOptions = (0, _utils.getUiOptions)(uiSchema),
          _getUiOptions$widget = _getUiOptions.widget,
          widget = _getUiOptions$widget === void 0 ? "select" : _getUiOptions$widget,
          uiOptions = (0, _objectWithoutProperties2["default"])(_getUiOptions, ["widget"]);

      var Widget = (0, _utils.getWidget)({
        type: "number"
      }, widget, widgets);
      var option = options[selectedOption] || null;
      var optionSchema;

      if (option) {
        // If the subschema doesn't declare a type, infer the type from the
        // parent schema
        optionSchema = option.type ? option : (0, _assign["default"])({}, option, {
          type: baseType
        });
      }

      var enumOptions = (0, _map["default"])(options).call(options, function (option, index) {
        return {
          label: option.title || "Option ".concat(index + 1),
          value: index
        };
      });
      return _react["default"].createElement("div", {
        className: "panel panel-default panel-body"
      }, _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement(Widget, (0, _extends2["default"])({
        id: (0, _concat["default"])(_context = "".concat(idSchema.$id)).call(_context, schema.oneOf ? "__oneof_select" : "__anyof_select"),
        schema: {
          type: "number",
          "default": 0
        },
        onChange: this.onOptionChange,
        onBlur: onBlur,
        onFocus: onFocus,
        value: selectedOption,
        options: {
          enumOptions: enumOptions
        }
      }, uiOptions))), option !== null && _react["default"].createElement(_SchemaField, {
        schema: optionSchema,
        uiSchema: uiSchema,
        errorSchema: errorSchema,
        idSchema: idSchema,
        idPrefix: idPrefix,
        formData: formData,
        onChange: onChange,
        onBlur: onBlur,
        onFocus: onFocus,
        registry: registry,
        disabled: disabled
      }));
    }
  }]);
  return AnyOfField;
}(_react.Component);

AnyOfField.defaultProps = {
  disabled: false,
  errorSchema: {},
  idSchema: {},
  uiSchema: {}
};

if (process.env.NODE_ENV !== "production") {
  AnyOfField.propTypes = {
    options: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
    baseType: _propTypes["default"].string,
    uiSchema: _propTypes["default"].object,
    idSchema: _propTypes["default"].object,
    formData: _propTypes["default"].any,
    errorSchema: _propTypes["default"].object,
    registry: types.registry.isRequired
  };
}

var _default = AnyOfField;
exports["default"] = _default;