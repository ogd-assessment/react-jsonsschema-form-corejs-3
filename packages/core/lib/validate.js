"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.toErrorList = toErrorList;
exports["default"] = validateFormData;
exports.isValid = isValid;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _trim = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/trim"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _objectSpread6 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectSpread"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/get-iterator"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _reduce = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/reduce"));

var _toPath = _interopRequireDefault(require("lodash/toPath"));

var _ajv = _interopRequireDefault(require("ajv"));

var _utils = require("./utils");

var ajv = createAjvInstance();
var formerCustomFormats = null;
var formerMetaSchema = null;

function createAjvInstance() {
  var ajv = new _ajv["default"]({
    errorDataPath: "property",
    allErrors: true,
    multipleOfPrecision: 8,
    schemaId: "auto",
    unknownFormats: "ignore"
  }); // add custom formats

  ajv.addFormat("data-url", /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/);
  ajv.addFormat("color", /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/);
  return ajv;
}

function toErrorSchema(errors) {
  // Transforms a ajv validation errors list:
  // [
  //   {property: ".level1.level2[2].level3", message: "err a"},
  //   {property: ".level1.level2[2].level3", message: "err b"},
  //   {property: ".level1.level2[4].level3", message: "err b"},
  // ]
  // Into an error tree:
  // {
  //   level1: {
  //     level2: {
  //       2: {level3: {errors: ["err a", "err b"]}},
  //       4: {level3: {errors: ["err b"]}},
  //     }
  //   }
  // };
  if (!errors.length) {
    return {};
  }

  return (0, _reduce["default"])(errors).call(errors, function (errorSchema, error) {
    var property = error.property,
        message = error.message;
    var path = (0, _toPath["default"])(property);
    var parent = errorSchema; // If the property is at the root (.level1) then toPath creates
    // an empty array element at the first index. Remove it.

    if (path.length > 0 && path[0] === "") {
      (0, _splice["default"])(path).call(path, 0, 1);
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator2["default"])((0, _slice["default"])(path).call(path, 0)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var segment = _step.value;

        if (!(segment in parent)) {
          parent[segment] = {};
        }

        parent = parent[segment];
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

    if ((0, _isArray["default"])(parent.__errors)) {
      var _context;

      // We store the list of errors for this node in a property named __errors
      // to avoid name collision with a possible sub schema field named
      // "errors" (see `validate.createErrorHandler`).
      parent.__errors = (0, _concat["default"])(_context = parent.__errors).call(_context, message);
    } else {
      if (message) {
        parent.__errors = [message];
      }
    }

    return errorSchema;
  }, {});
}

function toErrorList(errorSchema) {
  var _context4;

  var fieldName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "root";
  // XXX: We should transform fieldName as a full field path string.
  var errorList = [];

  if ("__errors" in errorSchema) {
    var _context2;

    errorList = (0, _concat["default"])(errorList).call(errorList, (0, _map["default"])(_context2 = errorSchema.__errors).call(_context2, function (stack) {
      var _context3;

      return {
        stack: (0, _concat["default"])(_context3 = "".concat(fieldName, ": ")).call(_context3, stack)
      };
    }));
  }

  return (0, _reduce["default"])(_context4 = (0, _keys["default"])(errorSchema)).call(_context4, function (acc, key) {
    if (key !== "__errors") {
      acc = (0, _concat["default"])(acc).call(acc, toErrorList(errorSchema[key], key));
    }

    return acc;
  }, errorList);
}

function createErrorHandler(formData) {
  var handler = {
    // We store the list of errors for this node in a property named __errors
    // to avoid name collision with a possible sub schema field named
    // "errors" (see `utils.toErrorSchema`).
    __errors: [],
    addError: function addError(message) {
      this.__errors.push(message);
    }
  };

  if ((0, _utils.isObject)(formData)) {
    var _context5;

    return (0, _reduce["default"])(_context5 = (0, _keys["default"])(formData)).call(_context5, function (acc, key) {
      return (0, _objectSpread6["default"])({}, acc, (0, _defineProperty2["default"])({}, key, createErrorHandler(formData[key])));
    }, handler);
  }

  if ((0, _isArray["default"])(formData)) {
    return (0, _reduce["default"])(formData).call(formData, function (acc, value, key) {
      return (0, _objectSpread6["default"])({}, acc, (0, _defineProperty2["default"])({}, key, createErrorHandler(value)));
    }, handler);
  }

  return handler;
}

function unwrapErrorHandler(errorHandler) {
  var _context6;

  return (0, _reduce["default"])(_context6 = (0, _keys["default"])(errorHandler)).call(_context6, function (acc, key) {
    if (key === "addError") {
      return acc;
    } else if (key === "__errors") {
      return (0, _objectSpread6["default"])({}, acc, (0, _defineProperty2["default"])({}, key, errorHandler[key]));
    }

    return (0, _objectSpread6["default"])({}, acc, (0, _defineProperty2["default"])({}, key, unwrapErrorHandler(errorHandler[key])));
  }, {});
}
/**
 * Transforming the error output from ajv to format used by jsonschema.
 * At some point, components should be updated to support ajv.
 */


function transformAjvErrors() {
  var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  if (errors === null) {
    return [];
  }

  return (0, _map["default"])(errors).call(errors, function (e) {
    var _context7, _context8;

    var dataPath = e.dataPath,
        keyword = e.keyword,
        message = e.message,
        params = e.params,
        schemaPath = e.schemaPath;
    var property = "".concat(dataPath); // put data in expected format

    return {
      name: keyword,
      property: property,
      message: message,
      params: params,
      // specific to ajv
      stack: (0, _trim["default"])(_context7 = (0, _concat["default"])(_context8 = "".concat(property, " ")).call(_context8, message)).call(_context7),
      schemaPath: schemaPath
    };
  });
}
/**
 * This function processes the formData with a user `validate` contributed
 * function, which receives the form data and an `errorHandler` object that
 * will be used to add custom validation errors for each field.
 */


function validateFormData(formData, schema, customValidate, transformErrors) {
  var _context10;

  var additionalMetaSchemas = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var customFormats = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  // Include form data with undefined values, which is required for validation.
  var definitions = schema.definitions;
  formData = (0, _utils.getDefaultFormState)(schema, formData, definitions, true);
  var newMetaSchemas = !(0, _utils.deepEquals)(formerMetaSchema, additionalMetaSchemas);
  var newFormats = !(0, _utils.deepEquals)(formerCustomFormats, customFormats);

  if (newMetaSchemas || newFormats) {
    ajv = createAjvInstance();
  } // add more schemas to validate against


  if (additionalMetaSchemas && newMetaSchemas && (0, _isArray["default"])(additionalMetaSchemas)) {
    ajv.addMetaSchema(additionalMetaSchemas);
    formerMetaSchema = additionalMetaSchemas;
  } // add more custom formats to validate against


  if (customFormats && newFormats && (0, _utils.isObject)(customFormats)) {
    var _context9;

    (0, _forEach["default"])(_context9 = (0, _keys["default"])(customFormats)).call(_context9, function (formatName) {
      ajv.addFormat(formatName, customFormats[formatName]);
    });
    formerCustomFormats = customFormats;
  }

  var validationError = null;

  try {
    ajv.validate(schema, formData);
  } catch (err) {
    validationError = err;
  }

  var errors = transformAjvErrors(ajv.errors); // Clear errors to prevent persistent errors, see #1104

  ajv.errors = null;
  var noProperMetaSchema = validationError && validationError.message && typeof validationError.message === "string" && (0, _includes["default"])(_context10 = validationError.message).call(_context10, "no schema with key or ref ");

  if (noProperMetaSchema) {
    var _context11;

    errors = (0, _concat["default"])(_context11 = []).call(_context11, (0, _toConsumableArray2["default"])(errors), [{
      stack: validationError.message
    }]);
  }

  if (typeof transformErrors === "function") {
    errors = transformErrors(errors);
  }

  var errorSchema = toErrorSchema(errors);

  if (noProperMetaSchema) {
    errorSchema = (0, _objectSpread6["default"])({}, errorSchema, {
      $schema: {
        __errors: [validationError.message]
      }
    });
  }

  if (typeof customValidate !== "function") {
    return {
      errors: errors,
      errorSchema: errorSchema
    };
  }

  var errorHandler = customValidate(formData, createErrorHandler(formData));
  var userErrorSchema = unwrapErrorHandler(errorHandler);
  var newErrorSchema = (0, _utils.mergeObjects)(errorSchema, userErrorSchema, true); // XXX: The errors list produced is not fully compliant with the format
  // exposed by the jsonschema lib, which contains full field paths and other
  // properties.

  var newErrors = toErrorList(newErrorSchema);
  return {
    errors: newErrors,
    errorSchema: newErrorSchema
  };
}
/**
 * Validates data against a schema, returning true if the data is valid, or
 * false otherwise. If the schema is invalid, then this function will return
 * false.
 */


function isValid(schema, data) {
  try {
    return ajv.validate(schema, data);
  } catch (e) {
    return false;
  }
}