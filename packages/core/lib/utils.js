"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.getDefaultRegistry = getDefaultRegistry;
exports.getSchemaType = getSchemaType;
exports.getWidget = getWidget;
exports.hasWidget = hasWidget;
exports.getDefaultFormState = getDefaultFormState;
exports.mergeDefaultsWithFormData = mergeDefaultsWithFormData;
exports.getUiOptions = getUiOptions;
exports.isObject = isObject;
exports.mergeObjects = mergeObjects;
exports.asNumber = asNumber;
exports.orderProperties = orderProperties;
exports.isConstant = isConstant;
exports.toConstant = toConstant;
exports.isSelect = isSelect;
exports.isMultiSelect = isMultiSelect;
exports.isFilesArray = isFilesArray;
exports.isFixedItems = isFixedItems;
exports.allowAdditionalItems = allowAdditionalItems;
exports.optionsList = optionsList;
exports.stubExistingAdditionalProperties = stubExistingAdditionalProperties;
exports.resolveSchema = resolveSchema;
exports.retrieveSchema = retrieveSchema;
exports.mergeSchemas = mergeSchemas;
exports.deepEquals = deepEquals;
exports.shouldRender = shouldRender;
exports.toIdSchema = toIdSchema;
exports.toPathSchema = toPathSchema;
exports.parseDateString = parseDateString;
exports.toDateString = toDateString;
exports.pad = pad;
exports.dataURItoBlob = dataURItoBlob;
exports.rangeSpec = rangeSpec;
exports.getMatchingOption = getMatchingOption;
exports.guessType = exports.ADDITIONAL_PROPERTY_FLAG = void 0;

var _toPrimitive2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol/to-primitive"));

var _sort = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/sort"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _set = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set"));

var _from = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/from"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/get-iterator"));

var _every = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/every"));

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _lastIndexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/last-index-of"));

var _isNan = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/number/is-nan"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/assign"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _reduce = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/reduce"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _startsWith = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/starts-with"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/typeof"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _react = _interopRequireDefault(require("react"));

var ReactIs = _interopRequireWildcard(require("react-is"));

var _jsonSchemaMergeAllof = _interopRequireDefault(require("json-schema-merge-allof"));

var _fill = _interopRequireDefault(require("core-js/features/array/fill"));

var _validate = _interopRequireWildcard(require("./validate"));

var _union = _interopRequireDefault(require("lodash/union"));

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return (0, _typeof2["default"])(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if ((0, _typeof2["default"])(input) !== "object" || input === null) return input; var prim = input[_toPrimitive2["default"]]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if ((0, _typeof2["default"])(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var ADDITIONAL_PROPERTY_FLAG = "__additional_property";
exports.ADDITIONAL_PROPERTY_FLAG = ADDITIONAL_PROPERTY_FLAG;
var widgetMap = {
  "boolean": {
    checkbox: "CheckboxWidget",
    radio: "RadioWidget",
    select: "SelectWidget",
    hidden: "HiddenWidget"
  },
  string: {
    text: "TextWidget",
    password: "PasswordWidget",
    email: "EmailWidget",
    hostname: "TextWidget",
    ipv4: "TextWidget",
    ipv6: "TextWidget",
    uri: "URLWidget",
    "data-url": "FileWidget",
    radio: "RadioWidget",
    select: "SelectWidget",
    textarea: "TextareaWidget",
    hidden: "HiddenWidget",
    date: "DateWidget",
    datetime: "DateTimeWidget",
    "date-time": "DateTimeWidget",
    "alt-date": "AltDateWidget",
    "alt-datetime": "AltDateTimeWidget",
    color: "ColorWidget",
    file: "FileWidget"
  },
  number: {
    text: "TextWidget",
    select: "SelectWidget",
    updown: "UpDownWidget",
    range: "RangeWidget",
    radio: "RadioWidget",
    hidden: "HiddenWidget"
  },
  integer: {
    text: "TextWidget",
    select: "SelectWidget",
    updown: "UpDownWidget",
    range: "RangeWidget",
    radio: "RadioWidget",
    hidden: "HiddenWidget"
  },
  array: {
    select: "SelectWidget",
    checkboxes: "CheckboxesWidget",
    files: "FileWidget",
    hidden: "HiddenWidget"
  }
};

function getDefaultRegistry() {
  return {
    fields: require("./components/fields")["default"],
    widgets: require("./components/widgets")["default"],
    definitions: {},
    formContext: {}
  };
}
/* Gets the type of a given schema. */


function getSchemaType(schema) {
  var type = schema.type;

  if (!type && schema["const"]) {
    return guessType(schema["const"]);
  }

  if (!type && schema["enum"]) {
    return "string";
  }

  if (!type && (schema.properties || schema.additionalProperties)) {
    return "object";
  }

  if (type instanceof Array && type.length === 2 && (0, _includes["default"])(type).call(type, "null")) {
    return (0, _find["default"])(type).call(type, function (type) {
      return type !== "null";
    });
  }

  return type;
}

function getWidget(schema, widget) {
  var _context;

  var registeredWidgets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var type = getSchemaType(schema);

  function mergeOptions(Widget) {
    // cache return value as property of widget for proper react reconciliation
    if (!Widget.MergedWidget) {
      var defaultOptions = Widget.defaultProps && Widget.defaultProps.options || {};

      Widget.MergedWidget = function (_ref) {
        var _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options,
            props = (0, _objectWithoutProperties2["default"])(_ref, ["options"]);
        return _react["default"].createElement(Widget, (0, _extends2["default"])({
          options: (0, _objectSpread3["default"])({}, defaultOptions, options)
        }, props));
      };
    }

    return Widget.MergedWidget;
  }

  if (typeof widget === "function" || ReactIs.isForwardRef(_react["default"].createElement(widget)) || ReactIs.isMemo(widget)) {
    return mergeOptions(widget);
  }

  if (typeof widget !== "string") {
    throw new Error("Unsupported widget definition: ".concat((0, _typeof2["default"])(widget)));
  }

  if (registeredWidgets.hasOwnProperty(widget)) {
    var registeredWidget = registeredWidgets[widget];
    return getWidget(schema, registeredWidget, registeredWidgets);
  }

  if (!widgetMap.hasOwnProperty(type)) {
    throw new Error("No widget for type \"".concat(type, "\""));
  }

  if (widgetMap[type].hasOwnProperty(widget)) {
    var _registeredWidget = registeredWidgets[widgetMap[type][widget]];
    return getWidget(schema, _registeredWidget, registeredWidgets);
  }

  throw new Error((0, _concat["default"])(_context = "No widget \"".concat(widget, "\" for type \"")).call(_context, type, "\""));
}

function hasWidget(schema, widget) {
  var registeredWidgets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  try {
    getWidget(schema, widget, registeredWidgets);
    return true;
  } catch (e) {
    var _context2, _context3;

    if (e.message && ((0, _startsWith["default"])(_context2 = e.message).call(_context2, "No widget") || (0, _startsWith["default"])(_context3 = e.message).call(_context3, "Unsupported widget"))) {
      return false;
    }

    throw e;
  }
}

function computeDefaults(schema, parentDefaults, definitions) {
  var _context5;

  var rawFormData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var includeUndefinedValues = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var formData = isObject(rawFormData) ? rawFormData : {}; // Compute the defaults recursively: give highest priority to deepest nodes.

  var defaults = parentDefaults;

  if (isObject(defaults) && isObject(schema["default"])) {
    // For object defaults, only override parent defaults that are defined in
    // schema.default.
    defaults = mergeObjects(defaults, schema["default"]);
  } else if ("default" in schema) {
    // Use schema defaults for this node.
    defaults = schema["default"];
  } else if ("$ref" in schema) {
    // Use referenced schema defaults for this node.
    var refSchema = findSchemaDefinition(schema.$ref, definitions);
    return computeDefaults(refSchema, defaults, definitions, formData, includeUndefinedValues);
  } else if ("dependencies" in schema) {
    var resolvedSchema = resolveDependencies(schema, definitions, formData);
    return computeDefaults(resolvedSchema, defaults, definitions, formData, includeUndefinedValues);
  } else if (isFixedItems(schema)) {
    var _context4;

    defaults = (0, _map["default"])(_context4 = schema.items).call(_context4, function (itemSchema, idx) {
      return computeDefaults(itemSchema, (0, _isArray["default"])(parentDefaults) ? parentDefaults[idx] : undefined, definitions, formData, includeUndefinedValues);
    });
  } else if ("oneOf" in schema) {
    schema = schema.oneOf[getMatchingOption(undefined, schema.oneOf, definitions)];
  } else if ("anyOf" in schema) {
    schema = schema.anyOf[getMatchingOption(undefined, schema.anyOf, definitions)];
  } // Not defaults defined for this node, fallback to generic typed ones.


  if (typeof defaults === "undefined") {
    defaults = schema["default"];
  }

  switch (getSchemaType(schema)) {
    // We need to recur for object schema inner default values.
    case "object":
      return (0, _reduce["default"])(_context5 = (0, _keys["default"])(schema.properties || {})).call(_context5, function (acc, key) {
        // Compute the defaults for this node, with the parent defaults we might
        // have from a previous run: defaults[key].
        var computedDefault = computeDefaults(schema.properties[key], (defaults || {})[key], definitions, (formData || {})[key], includeUndefinedValues);

        if (includeUndefinedValues || computedDefault !== undefined) {
          acc[key] = computedDefault;
        }

        return acc;
      }, {});

    case "array":
      // Inject defaults into existing array defaults
      if ((0, _isArray["default"])(defaults)) {
        defaults = (0, _map["default"])(defaults).call(defaults, function (item, idx) {
          return computeDefaults(schema.items[idx] || schema.additionalItems || {}, item, definitions);
        });
      } // Deeply inject defaults into already existing form data


      if ((0, _isArray["default"])(rawFormData)) {
        defaults = (0, _map["default"])(rawFormData).call(rawFormData, function (item, idx) {
          return computeDefaults(schema.items, (defaults || {})[idx], definitions, item);
        });
      }

      if (schema.minItems) {
        if (!isMultiSelect(schema, definitions)) {
          var defaultsLength = defaults ? defaults.length : 0;

          if (schema.minItems > defaultsLength) {
            var defaultEntries = defaults || []; // populate the array with the defaults

            var fillerSchema = (0, _isArray["default"])(schema.items) ? schema.additionalItems : schema.items;
            var fillerEntries = (0, _fill["default"])(new Array(schema.minItems - defaultsLength), computeDefaults(fillerSchema, fillerSchema.defaults, definitions)); // then fill up the rest with either the item default or empty, up to minItems

            return (0, _concat["default"])(defaultEntries).call(defaultEntries, fillerEntries);
          }
        } else {
          return defaults ? defaults : [];
        }
      }

  }

  return defaults;
}

function getDefaultFormState(_schema, formData) {
  var definitions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var includeUndefinedValues = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (!isObject(_schema)) {
    throw new Error("Invalid schema: " + _schema);
  }

  var schema = retrieveSchema(_schema, definitions, formData);
  var defaults = computeDefaults(schema, _schema["default"], definitions, formData, includeUndefinedValues);

  if (typeof formData === "undefined") {
    // No form data? Use schema defaults.
    return defaults;
  }

  if (isObject(formData) || (0, _isArray["default"])(formData)) {
    return mergeDefaultsWithFormData(defaults, formData);
  }

  if (formData === 0 || formData === false || formData === "") {
    return formData;
  }

  return formData || defaults;
}
/**
 * When merging defaults and form data, we want to merge in this specific way:
 * - objects are deeply merged
 * - arrays are merged in such a way that:
 *   - when the array is set in form data, only array entries set in form data
 *     are deeply merged; additional entries from the defaults are ignored
 *   - when the array is not set in form data, the default is copied over
 * - scalars are overwritten/set by form data
 */


function mergeDefaultsWithFormData(defaults, formData) {
  if ((0, _isArray["default"])(formData)) {
    if (!(0, _isArray["default"])(defaults)) {
      defaults = [];
    }

    return (0, _map["default"])(formData).call(formData, function (value, idx) {
      if (defaults[idx]) {
        return mergeDefaultsWithFormData(defaults[idx], value);
      }

      return value;
    });
  } else if (isObject(formData)) {
    var _context6;

    var acc = (0, _assign["default"])({}, defaults); // Prevent mutation of source object.

    return (0, _reduce["default"])(_context6 = (0, _keys["default"])(formData)).call(_context6, function (acc, key) {
      acc[key] = mergeDefaultsWithFormData(defaults ? defaults[key] : {}, formData[key]);
      return acc;
    }, acc);
  } else {
    return formData;
  }
}

function getUiOptions(uiSchema) {
  var _context7, _context8;

  // get all passed options from ui:widget, ui:options, and ui:<optionName>
  return (0, _reduce["default"])(_context7 = (0, _filter["default"])(_context8 = (0, _keys["default"])(uiSchema)).call(_context8, function (key) {
    return (0, _indexOf["default"])(key).call(key, "ui:") === 0;
  })).call(_context7, function (options, key) {
    var value = uiSchema[key];

    if (key === "ui:widget" && isObject(value)) {
      console.warn("Setting options via ui:widget object is deprecated, use ui:options instead");
      return (0, _objectSpread3["default"])({}, options, value.options || {}, {
        widget: value.component
      });
    }

    if (key === "ui:options" && isObject(value)) {
      return (0, _objectSpread3["default"])({}, options, value);
    }

    return (0, _objectSpread3["default"])({}, options, (0, _defineProperty2["default"])({}, key.substring(3), value));
  }, {});
}

function isObject(thing) {
  if (typeof File !== "undefined" && thing instanceof File) {
    return false;
  }

  return (0, _typeof2["default"])(thing) === "object" && thing !== null && !(0, _isArray["default"])(thing);
}

function mergeObjects(obj1, obj2) {
  var _context9;

  var concatArrays = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // Recursively merge deeply nested objects.
  var acc = (0, _assign["default"])({}, obj1); // Prevent mutation of source object.

  return (0, _reduce["default"])(_context9 = (0, _keys["default"])(obj2)).call(_context9, function (acc, key) {
    var left = obj1 ? obj1[key] : {},
        right = obj2[key];

    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      acc[key] = mergeObjects(left, right, concatArrays);
    } else if (concatArrays && (0, _isArray["default"])(left) && (0, _isArray["default"])(right)) {
      acc[key] = (0, _concat["default"])(left).call(left, right);
    } else {
      acc[key] = right;
    }

    return acc;
  }, acc);
}

function asNumber(value) {
  if (value === "") {
    return undefined;
  }

  if (value === null) {
    return null;
  }

  if (/\.$/.test(value)) {
    // "3." can't really be considered a number even if it parses in js. The
    // user is most likely entering a float.
    return value;
  }

  if (/\.0$/.test(value)) {
    // we need to return this as a string here, to allow for input like 3.07
    return value;
  }

  var n = Number(value);
  var valid = typeof n === "number" && !(0, _isNan["default"])(n);

  if (/\.\d*0$/.test(value)) {
    // It's a number, that's cool - but we need it as a string so it doesn't screw
    // with the user when entering dollar amounts or other values (such as those with
    // specific precision or number of significant digits)
    return value;
  }

  return valid ? n : value;
}

function orderProperties(properties, order) {
  var _spliceInstanceProper, _context10;

  if (!(0, _isArray["default"])(order)) {
    return properties;
  }

  var arrayToHash = function arrayToHash(arr) {
    return (0, _reduce["default"])(arr).call(arr, function (prev, curr) {
      prev[curr] = true;
      return prev;
    }, {});
  };

  var errorPropList = function errorPropList(arr) {
    return arr.length > 1 ? "properties '".concat(arr.join("', '"), "'") : "property '".concat(arr[0], "'");
  };

  var propertyHash = arrayToHash(properties);
  var orderFiltered = (0, _filter["default"])(order).call(order, function (prop) {
    return prop === "*" || propertyHash[prop];
  });
  var orderHash = arrayToHash(orderFiltered);
  var rest = (0, _filter["default"])(properties).call(properties, function (prop) {
    return !orderHash[prop];
  });
  var restIndex = (0, _indexOf["default"])(orderFiltered).call(orderFiltered, "*");

  if (restIndex === -1) {
    if (rest.length) {
      throw new Error("uiSchema order list does not contain ".concat(errorPropList(rest)));
    }

    return orderFiltered;
  }

  if (restIndex !== (0, _lastIndexOf["default"])(orderFiltered).call(orderFiltered, "*")) {
    throw new Error("uiSchema order list contains more than one wildcard item");
  }

  var complete = (0, _toConsumableArray2["default"])(orderFiltered);

  (_spliceInstanceProper = (0, _splice["default"])(complete)).call.apply(_spliceInstanceProper, (0, _concat["default"])(_context10 = [complete, restIndex, 1]).call(_context10, (0, _toConsumableArray2["default"])(rest)));

  return complete;
}
/**
 * This function checks if the given schema matches a single
 * constant value.
 */


function isConstant(schema) {
  return (0, _isArray["default"])(schema["enum"]) && schema["enum"].length === 1 || schema.hasOwnProperty("const");
}

function toConstant(schema) {
  if ((0, _isArray["default"])(schema["enum"]) && schema["enum"].length === 1) {
    return schema["enum"][0];
  } else if (schema.hasOwnProperty("const")) {
    return schema["const"];
  } else {
    throw new Error("schema cannot be inferred as a constant");
  }
}

function isSelect(_schema) {
  var definitions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var schema = retrieveSchema(_schema, definitions);
  var altSchemas = schema.oneOf || schema.anyOf;

  if ((0, _isArray["default"])(schema["enum"])) {
    return true;
  } else if ((0, _isArray["default"])(altSchemas)) {
    return (0, _every["default"])(altSchemas).call(altSchemas, function (altSchemas) {
      return isConstant(altSchemas);
    });
  }

  return false;
}

function isMultiSelect(schema) {
  var definitions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!schema.uniqueItems || !schema.items) {
    return false;
  }

  return isSelect(schema.items, definitions);
}

function isFilesArray(schema, uiSchema) {
  var definitions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (uiSchema["ui:widget"] === "files") {
    return true;
  } else if (schema.items) {
    var itemsSchema = retrieveSchema(schema.items, definitions);
    return itemsSchema.type === "string" && itemsSchema.format === "data-url";
  }

  return false;
}

function isFixedItems(schema) {
  var _context11;

  return (0, _isArray["default"])(schema.items) && schema.items.length > 0 && (0, _every["default"])(_context11 = schema.items).call(_context11, function (item) {
    return isObject(item);
  });
}

function allowAdditionalItems(schema) {
  if (schema.additionalItems === true) {
    console.warn("additionalItems=true is currently not supported");
  }

  return isObject(schema.additionalItems);
}

function optionsList(schema) {
  if (schema["enum"]) {
    var _context12;

    return (0, _map["default"])(_context12 = schema["enum"]).call(_context12, function (value, i) {
      var label = schema.enumNames && schema.enumNames[i] || String(value);
      return {
        label: label,
        value: value
      };
    });
  } else {
    var altSchemas = schema.oneOf || schema.anyOf;
    return (0, _map["default"])(altSchemas).call(altSchemas, function (schema, i) {
      var value = toConstant(schema);
      var label = schema.title || String(value);
      return {
        label: label,
        value: value
      };
    });
  }
}

function findSchemaDefinition($ref) {
  var definitions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // Extract and use the referenced definition if we have it.
  var match = /^#\/definitions\/(.*)$/.exec($ref);

  if (match && match[1]) {
    var parts = match[1].split("/");
    var current = definitions;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator2["default"])(parts), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var part = _step.value;
        part = part.replace(/~1/g, "/").replace(/~0/g, "~");

        while (current.hasOwnProperty("$ref")) {
          current = findSchemaDefinition(current.$ref, definitions);
        }

        if (current.hasOwnProperty(part)) {
          current = current[part];
        } else {
          // No matching definition found, that's an error (bogus schema?)
          throw new Error("Could not find a definition for ".concat($ref, "."));
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

    return current;
  } // No matching definition found, that's an error (bogus schema?)


  throw new Error("Could not find a definition for ".concat($ref, "."));
} // In the case where we have to implicitly create a schema, it is useful to know what type to use
//  based on the data we are defining


var guessType = function guessType(value) {
  if ((0, _isArray["default"])(value)) {
    return "array";
  } else if (typeof value === "string") {
    return "string";
  } else if (value == null) {
    return "null";
  } else if (typeof value === "boolean") {
    return "boolean";
  } else if (!isNaN(value)) {
    return "number";
  } else if ((0, _typeof2["default"])(value) === "object") {
    return "object";
  } // Default to string if we can't figure it out


  return "string";
}; // This function will create new "properties" items for each key in our formData


exports.guessType = guessType;

function stubExistingAdditionalProperties(schema) {
  var _context13;

  var definitions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var formData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // Clone the schema so we don't ruin the consumer's original
  schema = (0, _objectSpread3["default"])({}, schema, {
    properties: (0, _objectSpread3["default"])({}, schema.properties)
  });
  (0, _forEach["default"])(_context13 = (0, _keys["default"])(formData)).call(_context13, function (key) {
    if (schema.properties.hasOwnProperty(key)) {
      // No need to stub, our schema already has the property
      return;
    }

    var additionalProperties;

    if (schema.additionalProperties.hasOwnProperty("$ref")) {
      additionalProperties = retrieveSchema({
        $ref: schema.additionalProperties["$ref"]
      }, definitions, formData);
    } else if (schema.additionalProperties.hasOwnProperty("type")) {
      additionalProperties = (0, _objectSpread3["default"])({}, schema.additionalProperties);
    } else {
      additionalProperties = {
        type: guessType(formData[key])
      };
    } // The type of our new key should match the additionalProperties value;


    schema.properties[key] = additionalProperties; // Set our additional property flag so we know it was dynamically added

    schema.properties[key][ADDITIONAL_PROPERTY_FLAG] = true;
  });
  return schema;
}

function resolveSchema(schema) {
  var definitions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var formData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (schema.hasOwnProperty("$ref")) {
    return resolveReference(schema, definitions, formData);
  } else if (schema.hasOwnProperty("dependencies")) {
    var resolvedSchema = resolveDependencies(schema, definitions, formData);
    return retrieveSchema(resolvedSchema, definitions, formData);
  } else if (schema.hasOwnProperty("allOf")) {
    var _context14;

    return (0, _objectSpread3["default"])({}, schema, {
      allOf: (0, _map["default"])(_context14 = schema.allOf).call(_context14, function (allOfSubschema) {
        return retrieveSchema(allOfSubschema, definitions, formData);
      })
    });
  } else {
    // No $ref or dependencies attribute found, returning the original schema.
    return schema;
  }
}

function resolveReference(schema, definitions, formData) {
  // Retrieve the referenced schema definition.
  var $refSchema = findSchemaDefinition(schema.$ref, definitions); // Drop the $ref property of the source schema.

  var $ref = schema.$ref,
      localSchema = (0, _objectWithoutProperties2["default"])(schema, ["$ref"]); // Update referenced schema definition with local schema properties.

  return retrieveSchema((0, _objectSpread3["default"])({}, $refSchema, localSchema), definitions, formData);
}

function retrieveSchema(schema) {
  var definitions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var formData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var resolvedSchema = resolveSchema(schema, definitions, formData);

  if ("allOf" in schema) {
    try {
      resolvedSchema = (0, _jsonSchemaMergeAllof["default"])((0, _objectSpread3["default"])({}, resolvedSchema, {
        allOf: resolvedSchema.allOf
      }));
    } catch (e) {
      console.warn("could not merge subschemas in allOf:\n" + e);
      var _resolvedSchema = resolvedSchema,
          allOf = _resolvedSchema.allOf,
          resolvedSchemaWithoutAllOf = (0, _objectWithoutProperties2["default"])(_resolvedSchema, ["allOf"]);
      return resolvedSchemaWithoutAllOf;
    }
  }

  var hasAdditionalProperties = resolvedSchema.hasOwnProperty("additionalProperties") && resolvedSchema.additionalProperties !== false;

  if (hasAdditionalProperties) {
    return stubExistingAdditionalProperties(resolvedSchema, definitions, formData);
  }

  return resolvedSchema;
}

function resolveDependencies(schema, definitions, formData) {
  // Drop the dependencies from the source schema.
  var _schema$dependencies = schema.dependencies,
      dependencies = _schema$dependencies === void 0 ? {} : _schema$dependencies,
      resolvedSchema = (0, _objectWithoutProperties2["default"])(schema, ["dependencies"]);

  if ("oneOf" in resolvedSchema) {
    resolvedSchema = resolvedSchema.oneOf[getMatchingOption(formData, resolvedSchema.oneOf, definitions)];
  } else if ("anyOf" in resolvedSchema) {
    resolvedSchema = resolvedSchema.anyOf[getMatchingOption(formData, resolvedSchema.anyOf, definitions)];
  }

  return processDependencies(dependencies, resolvedSchema, definitions, formData);
}

function processDependencies(dependencies, resolvedSchema, definitions, formData) {
  // Process dependencies updating the local schema properties as appropriate.
  for (var dependencyKey in dependencies) {
    var _context15;

    // Skip this dependency if its trigger property is not present.
    if (formData[dependencyKey] === undefined) {
      continue;
    } // Skip this dependency if it is not included in the schema (such as when dependencyKey is itself a hidden dependency.)


    if (resolvedSchema.properties && !(dependencyKey in resolvedSchema.properties)) {
      continue;
    }

    var dependencyValue = dependencies[dependencyKey],
        remainingDependencies = (0, _objectWithoutProperties2["default"])(dependencies, (0, _map["default"])(_context15 = [dependencyKey]).call(_context15, _toPropertyKey));

    if ((0, _isArray["default"])(dependencyValue)) {
      resolvedSchema = withDependentProperties(resolvedSchema, dependencyValue);
    } else if (isObject(dependencyValue)) {
      resolvedSchema = withDependentSchema(resolvedSchema, definitions, formData, dependencyKey, dependencyValue);
    }

    return processDependencies(remainingDependencies, resolvedSchema, definitions, formData);
  }

  return resolvedSchema;
}

function withDependentProperties(schema, additionallyRequired) {
  var _context16;

  if (!additionallyRequired) {
    return schema;
  }

  var required = (0, _isArray["default"])(schema.required) ? (0, _from["default"])(new _set["default"]((0, _concat["default"])(_context16 = []).call(_context16, (0, _toConsumableArray2["default"])(schema.required), (0, _toConsumableArray2["default"])(additionallyRequired)))) : additionallyRequired;
  return (0, _objectSpread3["default"])({}, schema, {
    required: required
  });
}

function withDependentSchema(schema, definitions, formData, dependencyKey, dependencyValue) {
  var _retrieveSchema = retrieveSchema(dependencyValue, definitions, formData),
      oneOf = _retrieveSchema.oneOf,
      dependentSchema = (0, _objectWithoutProperties2["default"])(_retrieveSchema, ["oneOf"]);

  schema = mergeSchemas(schema, dependentSchema); // Since it does not contain oneOf, we return the original schema.

  if (oneOf === undefined) {
    return schema;
  } else if (!(0, _isArray["default"])(oneOf)) {
    throw new Error("invalid: it is some ".concat((0, _typeof2["default"])(oneOf), " instead of an array"));
  } // Resolve $refs inside oneOf.


  var resolvedOneOf = (0, _map["default"])(oneOf).call(oneOf, function (subschema) {
    return subschema.hasOwnProperty("$ref") ? resolveReference(subschema, definitions, formData) : subschema;
  });
  return withExactlyOneSubschema(schema, definitions, formData, dependencyKey, resolvedOneOf);
}

function withExactlyOneSubschema(schema, definitions, formData, dependencyKey, oneOf) {
  var _context17;

  var validSubschemas = (0, _filter["default"])(oneOf).call(oneOf, function (subschema) {
    if (!subschema.properties) {
      return false;
    }

    var conditionPropertySchema = subschema.properties[dependencyKey];

    if (conditionPropertySchema) {
      var conditionSchema = {
        type: "object",
        properties: (0, _defineProperty2["default"])({}, dependencyKey, conditionPropertySchema)
      };

      var _validateFormData = (0, _validate["default"])(formData, conditionSchema),
          errors = _validateFormData.errors;

      return errors.length === 0;
    }
  });

  if (validSubschemas.length !== 1) {
    console.warn("ignoring oneOf in dependencies because there isn't exactly one subschema that is valid");
    return schema;
  }

  var subschema = validSubschemas[0];
  var _subschema$properties = subschema.properties,
      conditionPropertySchema = _subschema$properties[dependencyKey],
      dependentSubschema = (0, _objectWithoutProperties2["default"])(_subschema$properties, (0, _map["default"])(_context17 = [dependencyKey]).call(_context17, _toPropertyKey));
  var dependentSchema = (0, _objectSpread3["default"])({}, subschema, {
    properties: dependentSubschema
  });
  return mergeSchemas(schema, retrieveSchema(dependentSchema, definitions, formData));
} // Recursively merge deeply nested schemas.
// The difference between mergeSchemas and mergeObjects
// is that mergeSchemas only concats arrays for
// values under the "required" keyword, and when it does,
// it doesn't include duplicate values.


function mergeSchemas(obj1, obj2) {
  var _context18;

  var acc = (0, _assign["default"])({}, obj1); // Prevent mutation of source object.

  return (0, _reduce["default"])(_context18 = (0, _keys["default"])(obj2)).call(_context18, function (acc, key) {
    var left = obj1 ? obj1[key] : {},
        right = obj2[key];

    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      acc[key] = mergeSchemas(left, right);
    } else if (obj1 && obj2 && (getSchemaType(obj1) === "object" || getSchemaType(obj2) === "object") && key === "required" && (0, _isArray["default"])(left) && (0, _isArray["default"])(right)) {
      // Don't include duplicate values when merging
      // "required" fields.
      acc[key] = (0, _union["default"])(left, right);
    } else {
      acc[key] = right;
    }

    return acc;
  }, acc);
}

function isArguments(object) {
  return Object.prototype.toString.call(object) === "[object Arguments]";
}

function deepEquals(a, b) {
  var ca = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var cb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  // Partially extracted from node-deeper and adapted to exclude comparison
  // checks for functions.
  // https://github.com/othiym23/node-deeper
  if (a === b) {
    return true;
  } else if (typeof a === "function" || typeof b === "function") {
    // Assume all functions are equivalent
    // see https://github.com/mozilla-services/react-jsonschema-form/issues/255
    return true;
  } else if ((0, _typeof2["default"])(a) !== "object" || (0, _typeof2["default"])(b) !== "object") {
    return false;
  } else if (a === null || b === null) {
    return false;
  } else if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  } else if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.global === b.global && a.multiline === b.multiline && a.lastIndex === b.lastIndex && a.ignoreCase === b.ignoreCase;
  } else if (isArguments(a) || isArguments(b)) {
    if (!(isArguments(a) && isArguments(b))) {
      return false;
    }

    var slice = (0, _slice["default"])(Array.prototype);
    return deepEquals(slice.call(a), slice.call(b), ca, cb);
  } else {
    if (a.constructor !== b.constructor) {
      return false;
    }

    var ka = (0, _keys["default"])(a);
    var kb = (0, _keys["default"])(b); // don't bother with stack acrobatics if there's nothing there

    if (ka.length === 0 && kb.length === 0) {
      return true;
    }

    if (ka.length !== kb.length) {
      return false;
    }

    var cal = ca.length;

    while (cal--) {
      if (ca[cal] === a) {
        return cb[cal] === b;
      }
    }

    ca.push(a);
    cb.push(b);
    (0, _sort["default"])(ka).call(ka);
    (0, _sort["default"])(kb).call(kb);

    for (var j = ka.length - 1; j >= 0; j--) {
      if (ka[j] !== kb[j]) {
        return false;
      }
    }

    var key;

    for (var k = ka.length - 1; k >= 0; k--) {
      key = ka[k];

      if (!deepEquals(a[key], b[key], ca, cb)) {
        return false;
      }
    }

    ca.pop();
    cb.pop();
    return true;
  }
}

function shouldRender(comp, nextProps, nextState) {
  var props = comp.props,
      state = comp.state;
  return !deepEquals(props, nextProps) || !deepEquals(state, nextState);
}

function toIdSchema(schema, id, definitions) {
  var formData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var idPrefix = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "root";
  var idSchema = {
    $id: id || idPrefix
  };

  if ("$ref" in schema || "dependencies" in schema || "allOf" in schema) {
    var _schema = retrieveSchema(schema, definitions, formData);

    return toIdSchema(_schema, id, definitions, formData, idPrefix);
  }

  if ("items" in schema && !schema.items.$ref) {
    return toIdSchema(schema.items, id, definitions, formData, idPrefix);
  }

  if (schema.type !== "object") {
    return idSchema;
  }

  for (var name in schema.properties || {}) {
    var field = schema.properties[name];
    var fieldId = idSchema.$id + "_" + name;
    idSchema[name] = toIdSchema(field, fieldId, definitions, // It's possible that formData is not an object -- this can happen if an
    // array item has just been added, but not populated with data yet
    (formData || {})[name], idPrefix);
  }

  return idSchema;
}

function toPathSchema(schema) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var definitions = arguments.length > 2 ? arguments[2] : undefined;
  var formData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var pathSchema = {
    $name: name.replace(/^\./, "")
  };

  if ("$ref" in schema || "dependencies" in schema || "allOf" in schema) {
    var _schema = retrieveSchema(schema, definitions, formData);

    return toPathSchema(_schema, name, definitions, formData);
  }

  if (schema.hasOwnProperty("items") && (0, _isArray["default"])(formData)) {
    (0, _forEach["default"])(formData).call(formData, function (element, i) {
      var _context19;

      pathSchema[i] = toPathSchema(schema.items, (0, _concat["default"])(_context19 = "".concat(name, ".")).call(_context19, i), definitions, element);
    });
  } else if (schema.hasOwnProperty("properties")) {
    for (var property in schema.properties) {
      var _context20;

      pathSchema[property] = toPathSchema(schema.properties[property], (0, _concat["default"])(_context20 = "".concat(name, ".")).call(_context20, property), definitions, // It's possible that formData is not an object -- this can happen if an
      // array item has just been added, but not populated with data yet
      (formData || {})[property]);
    }
  }

  return pathSchema;
}

function parseDateString(dateString) {
  var includeTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (!dateString) {
    return {
      year: -1,
      month: -1,
      day: -1,
      hour: includeTime ? -1 : 0,
      minute: includeTime ? -1 : 0,
      second: includeTime ? -1 : 0
    };
  }

  var date = new Date(dateString);

  if ((0, _isNan["default"])(date.getTime())) {
    throw new Error("Unable to parse date " + dateString);
  }

  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    // oh you, javascript.
    day: date.getUTCDate(),
    hour: includeTime ? date.getUTCHours() : 0,
    minute: includeTime ? date.getUTCMinutes() : 0,
    second: includeTime ? date.getUTCSeconds() : 0
  };
}

function toDateString(_ref2) {
  var year = _ref2.year,
      month = _ref2.month,
      day = _ref2.day,
      _ref2$hour = _ref2.hour,
      hour = _ref2$hour === void 0 ? 0 : _ref2$hour,
      _ref2$minute = _ref2.minute,
      minute = _ref2$minute === void 0 ? 0 : _ref2$minute,
      _ref2$second = _ref2.second,
      second = _ref2$second === void 0 ? 0 : _ref2$second;
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var utcTime = Date.UTC(year, month - 1, day, hour, minute, second);
  var datetime = new Date(utcTime).toJSON();
  return time ? datetime : (0, _slice["default"])(datetime).call(datetime, 0, 10);
}

function pad(num, size) {
  var s = String(num);

  while (s.length < size) {
    s = "0" + s;
  }

  return s;
}

function dataURItoBlob(dataURI) {
  // Split metadata from data
  var splitted = dataURI.split(","); // Split params

  var params = splitted[0].split(";"); // Get mime-type from params

  var type = params[0].replace("data:", ""); // Filter the name property from params

  var properties = (0, _filter["default"])(params).call(params, function (param) {
    return param.split("=")[0] === "name";
  }); // Look for the name and use unknown if no name property.

  var name;

  if (properties.length !== 1) {
    name = "unknown";
  } else {
    // Because we filtered out the other property,
    // we only have the name case here.
    name = properties[0].split("=")[1];
  } // Built the Uint8Array Blob parameter from the base64 string.


  var binary = atob(splitted[1]);
  var array = [];

  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  } // Create the blob object


  var blob = new window.Blob([new Uint8Array(array)], {
    type: type
  });
  return {
    blob: blob,
    name: name
  };
}

function rangeSpec(schema) {
  var spec = {};

  if (schema.multipleOf) {
    spec.step = schema.multipleOf;
  }

  if (schema.minimum || schema.minimum === 0) {
    spec.min = schema.minimum;
  }

  if (schema.maximum || schema.maximum === 0) {
    spec.max = schema.maximum;
  }

  return spec;
}

function getMatchingOption(formData, options, definitions) {
  for (var i = 0; i < options.length; i++) {
    // Assign the definitions to the option, otherwise the match can fail if
    // the new option uses a $ref
    var option = (0, _assign["default"])({
      definitions: definitions
    }, options[i]); // If the schema describes an object then we need to add slightly more
    // strict matching to the schema, because unless the schema uses the
    // "requires" keyword, an object will match the schema as long as it
    // doesn't have matching keys with a conflicting type. To do this we use an
    // "anyOf" with an array of requires. This augmentation expresses that the
    // schema should match if any of the keys in the schema are present on the
    // object and pass validation.

    if (option.properties) {
      var _context21;

      // Create an "anyOf" schema that requires at least one of the keys in the
      // "properties" object
      var requiresAnyOf = {
        anyOf: (0, _map["default"])(_context21 = (0, _keys["default"])(option.properties)).call(_context21, function (key) {
          return {
            required: [key]
          };
        })
      };
      var augmentedSchema = void 0; // If the "anyOf" keyword already exists, wrap the augmentation in an "allOf"

      if (option.anyOf) {
        // Create a shallow clone of the option
        var shallowClone = (0, _extends2["default"])({}, option);

        if (!shallowClone.allOf) {
          shallowClone.allOf = [];
        } else {
          var _context22;

          // If "allOf" already exists, shallow clone the array
          shallowClone.allOf = (0, _slice["default"])(_context22 = shallowClone.allOf).call(_context22);
        }

        shallowClone.allOf.push(requiresAnyOf);
        augmentedSchema = shallowClone;
      } else {
        augmentedSchema = (0, _assign["default"])({}, option, requiresAnyOf);
      } // Remove the "required" field as it's likely that not all fields have
      // been filled in yet, which will mean that the schema is not valid


      delete augmentedSchema.required;

      if ((0, _validate.isValid)(augmentedSchema, formData)) {
        return i;
      }
    } else if ((0, _validate.isValid)(options[i], formData)) {
      return i;
    }
  }

  return 0;
}