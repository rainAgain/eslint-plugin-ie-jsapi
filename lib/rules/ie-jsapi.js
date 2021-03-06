"use strict";

const lodash = require("lodash");
const extra = require('./extra');
const get = lodash.get;
const PLUGIN_SETTINGS_NAME = "ieStaticMethodsAllow";
const unsupported = {
  Object: {
    name: "Object",
    methods: ["assign", "is", "getOwnPropertySymbols"],
    constants: []
  },
  Array: {
    name: "Array",
    methods: ["from", "of"],
    constants: []
  },
  String: {
    name: "String",
    methods: ["raw", "fromCodePoint"],
    constants: []
  },
  Math: {
    name: "Math",
    methods: [
      "clz32",
      "imul",
      "sign",
      "hypot",
      "cbrt",
      "fround",
      "trunc",
      "atanh",
      "asinh",
      "acosh",
      "tanh",
      "sinh",
      "cosh",
      "expm1",
      "log1p",
      "log2",
      "log10"
    ],
    constants: []
  },
  Number: {
    name: "Number",
    methods: [
      "parseInt",
      "parseFloat",
      "isFinite",
      "isSafeInteger",
      "isNaN",
      "isInteger"
    ],
    constants: ["MIN_SAFE_INTEGER", "EPSILON", "MAX_SAFE_INTEGER"]
  },
  // es 5 api
  Extra: {
    methods: extra.methods,
    tips: {
      "forEach": {
        unsuportBrowser: 'IE 8'
      }
    }
  }
};

Object.assign(unsupported.Extra.tips, extra.tips);

const unsupportedBrowser = "IE 8";

function getSettings(type, context) {
  return get(context, `settings.${PLUGIN_SETTINGS_NAME}.${type}`, []);
}

function prepGetInfo(context, notAllowed) {
  return function getInfo(node, objPath, propPath) {
    const classType = get(node, objPath);
    const prop = get(node, propPath);
    const settings = getSettings(classType, context);
    const obj = notAllowed[classType];
    const range = get(node.callee, 'object');
    const _arguments = get(node, "arguments");

    return {
      prop,
      valid: function(expressionType) {
        // Add "trim" detection for actual use
        if(prop == 'trim') {
          if(_arguments && _arguments.length) {
            return false;
          }
        }
        var result = '';
        if(unsupported.Extra.methods.indexOf(prop) > -1 && expressionType == 'methods') {
          result = true;
        } else {
          result = (get(obj, expressionType, []).indexOf(prop) > -1 &&
          settings.indexOf(prop) === -1)
        }
        return result;
      }
    };
  };
}

module.exports = {
  create: function(context) {
    const getInfo = prepGetInfo(context, unsupported);
    return {
      MemberExpression: function(node) {
        const { valid, prop } = getInfo(node, "object.name", "property.name");

        if (valid("constants")) {
          context.report(node, `Constant ${prop} not supported by IE 11`);
        }
      },

      CallExpression: function(node) {
        const { valid, prop } = getInfo(
          node,
          "callee.object.name",
          "callee.property.name"
        );

        if (valid("methods")) {
          let tip = `Method ${prop} not supported by IE 11`;
          if(unsupported.Extra.methods.indexOf(prop) > -1) {
            const _usb = (unsupported.Extra.tips[prop] && unsupported.Extra.tips[prop].unsuportBrowser) ? unsupported.Extra.tips[prop].unsuportBrowser: unsupportedBrowser
            tip = `Method ${prop} not supported by ${_usb}`
          }
          context.report(node, tip);
        }
      }
    };
  }
};
