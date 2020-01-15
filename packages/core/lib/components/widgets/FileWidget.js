"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/values"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../utils");

function addNameToDataURL(dataURL, name) {
  return dataURL.replace(";base64", ";name=".concat(encodeURIComponent(name), ";base64"));
}

function processFile(file) {
  var name = file.name,
      size = file.size,
      type = file.type;
  return new _promise["default"](function (resolve, reject) {
    var reader = new window.FileReader();
    reader.onerror = reject;

    reader.onload = function (event) {
      resolve({
        dataURL: addNameToDataURL(event.target.result, name),
        name: name,
        size: size,
        type: type
      });
    };

    reader.readAsDataURL(file);
  });
}

function processFiles(files) {
  return _promise["default"].all((0, _map["default"])([]).call(files, processFile));
}

function FilesInfo(props) {
  var filesInfo = props.filesInfo;

  if (filesInfo.length === 0) {
    return null;
  }

  return _react["default"].createElement("ul", {
    className: "file-info"
  }, (0, _map["default"])(filesInfo).call(filesInfo, function (fileInfo, key) {
    var name = fileInfo.name,
        size = fileInfo.size,
        type = fileInfo.type;
    return _react["default"].createElement("li", {
      key: key
    }, _react["default"].createElement("strong", null, name), " (", type, ", ", size, " bytes)");
  }));
}

function extractFileInfo(dataURLs) {
  var _context;

  return (0, _map["default"])(_context = (0, _filter["default"])(dataURLs).call(dataURLs, function (dataURL) {
    return typeof dataURL !== "undefined";
  })).call(_context, function (dataURL) {
    var _dataURItoBlob = (0, _utils.dataURItoBlob)(dataURL),
        blob = _dataURItoBlob.blob,
        name = _dataURItoBlob.name;

    return {
      name: name,
      size: blob.size,
      type: blob.type
    };
  });
}

var FileWidget =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(FileWidget, _Component);

  function FileWidget(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, FileWidget);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(FileWidget).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onChange", function (event) {
      var _this$props = _this.props,
          multiple = _this$props.multiple,
          onChange = _this$props.onChange;
      processFiles(event.target.files).then(function (filesInfo) {
        var state = {
          values: (0, _map["default"])(filesInfo).call(filesInfo, function (fileInfo) {
            return fileInfo.dataURL;
          }),
          filesInfo: filesInfo
        };

        _this.setState(state, function () {
          if (multiple) {
            onChange((0, _values["default"])(state));
          } else {
            onChange((0, _values["default"])(state)[0]);
          }
        });
      });
    });
    var value = props.value;
    var values = (0, _isArray["default"])(value) ? value : [value];
    _this.state = {
      values: values,
      filesInfo: extractFileInfo(values)
    };
    return _this;
  }

  (0, _createClass2["default"])(FileWidget, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _utils.shouldRender)(this, nextProps, nextState);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          multiple = _this$props2.multiple,
          id = _this$props2.id,
          readonly = _this$props2.readonly,
          disabled = _this$props2.disabled,
          autofocus = _this$props2.autofocus,
          options = _this$props2.options;
      var filesInfo = this.state.filesInfo;
      return _react["default"].createElement("div", null, _react["default"].createElement("p", null, _react["default"].createElement("input", {
        ref: function ref(_ref) {
          return _this2.inputRef = _ref;
        },
        id: id,
        type: "file",
        disabled: readonly || disabled,
        onChange: this.onChange,
        defaultValue: "",
        autoFocus: autofocus,
        multiple: multiple,
        accept: options.accept
      })), _react["default"].createElement(FilesInfo, {
        filesInfo: filesInfo
      }));
    }
  }]);
  return FileWidget;
}(_react.Component);

FileWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  FileWidget.propTypes = {
    multiple: _propTypes["default"].bool,
    value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string)]),
    autofocus: _propTypes["default"].bool
  };
}

var _default = FileWidget;
exports["default"] = _default;