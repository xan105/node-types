// lib/types/util.js
var DANGEROUS_TAGS = ["[object String]", "[object Boolean]", "[object Number]"];
function assert(fn, value, ...args) {
  if (fn(value, ...args) === false) {
    const type = typeof value;
    const tag = Object.prototype.toString.call(value);
    if (type === "object" && DANGEROUS_TAGS.includes(tag))
      throw new SyntaxError("new String|Boolean|Number() is confusing, dangerous, and wasteful. Avoid it.");
    const name = fn.name.replace(/(^is)|(Like$)/, "").toLowerCase();
    const error = new TypeError(`Expected type "${name}" !`);
    error.details = {
      actual: { type, tag, value },
      expected: name
    };
    throw error;
  }
  return value;
}
function isTag(value, name) {
  const tag = `[object ${name}]`;
  return Object.prototype.toString.call(value) === tag;
}

// lib/types/primitive/bigint.js
function isBigInt(value) {
  return typeof value === "bigint";
}
function asBigInt(value) {
  return isBigInt(value) ? value : null;
}
function shouldBigInt(value) {
  return assert(isBigInt, value);
}

// lib/types/primitive/boolean.js
function isBoolean(value) {
  return value === true || value === false;
}
function asBoolean(value) {
  return isBoolean(value) ? value : null;
}
function shouldBoolean(value) {
  return assert(isBoolean, value);
}

// lib/types/primitive/nil.js
function isNull(value) {
  return value === null;
}
function shouldNull(value) {
  return assert(isNull, value);
}
function isUndefined(value) {
  return typeof value === "undefined";
}
function shouldUndefined(value) {
  return assert(isUndefined, value);
}
function isNullish(value) {
  return value == null;
}
function shouldNullish(value) {
  return assert(isNullish, value);
}

// lib/types/primitive/number.js
function isNumber(value) {
  return typeof value === "number";
}
function asNumber(value) {
  return isNumber(value) ? value : null;
}
function shouldNumber(value) {
  return assert(isNumber, value);
}
function isInt(value) {
  return Number.isSafeInteger(value);
}
function asInt(value) {
  return isInt(value) ? value : null;
}
function shouldInt(value) {
  return assert(isInt, value);
}

// lib/types/primitive/string.js
function isString(value) {
  return typeof value === "string";
}
function asString(value) {
  return isString(value) ? value : null;
}
function shouldString(value) {
  return assert(isString, value);
}

// lib/types/primitive/symbol.js
function isSymbol(value) {
  return typeof value === "symbol";
}
function asSymbol(value) {
  return isSymbol(value) ? value : null;
}
function shouldSymbol(value) {
  return assert(isSymbol, value);
}

// lib/types/object/array.js
function isArray(value) {
  return Array.isArray(value);
}
function asArray(value) {
  return isArray(value) ? value : null;
}
function shouldArray(value) {
  return assert(isArray, value);
}
function isSet(value) {
  return isTag(value, "Set");
}
function asSet(value) {
  return isSet(value) ? value : null;
}
function shouldSet(value) {
  return assert(isSet, value);
}

// lib/types/object/buffer.js
function isBuffer(value) {
  return isTag(value, "Uint8Array");
}
function asBuffer(value) {
  return isBuffer(value) ? value : null;
}
function shouldBuffer(value) {
  return assert(isBuffer, value);
}

// lib/types/object/func.js
function isFunction(value) {
  return typeof value === "function";
}
function asFunction(value) {
  return isFunction(value) ? value : null;
}
function shouldFunction(value) {
  return assert(isFunction, value);
}
function isPromise(value) {
  return isTag(value, "Promise") && isFunction(value.then);
}
function asPromise(value) {
  return isPromise(value) ? value : null;
}
function shouldPromise(value) {
  return assert(isPromise, value);
}
function isGenerator(value) {
  return isTag(value, "GeneratorFunction") || isTag(value, "AsyncGeneratorFunction");
}
function asGenerator(value) {
  return isGenerator(value) ? value : null;
}
function shouldGenerator(value) {
  return assert(isGenerator, value);
}

// lib/types/object/object.js
function isPlainObject(value) {
  if (value) {
    if (isTag(value, "Object")) return true;
    const prototype = Object.getPrototypeOf(value);
    if (isNull(prototype) || prototype === Object.prototype) return true;
  }
  return false;
}
function asPlainObject(value) {
  return isPlainObject(value) ? value : null;
}
function shouldPlainObject(value) {
  return assert(isPlainObject, value);
}
function isError(value) {
  return Error.isError?.() ?? isTag(value, "Error");
}
function asError(value) {
  return isError(value) ? value : null;
}
function shouldError(value) {
  return assert(isError, value);
}
function isRegExp(value) {
  return isTag(value, "RegExp");
}
function asRegExp(value) {
  return isRegExp(value) ? value : null;
}
function shouldRegExp(value) {
  return assert(isRegExp, value);
}
function isMap(value) {
  return isTag(value, "Map");
}
function asMap(value) {
  return isMap(value) ? value : null;
}
function shouldMap(value) {
  return assert(isMap, value);
}

// lib/types/extended/array.js
function isArrayOf(fn, values, ...args) {
  shouldFunction(fn);
  return isArray(values) && values.filter((value) => fn(value, ...args)).length === values.length;
}
function asArrayOf(fn, values, ...args) {
  return isArrayOf(fn, values, ...args) ? values : null;
}
function shouldArrayOf(fn, values, ...args) {
  shouldFunction(fn);
  shouldArray(values);
  for (const [index, value] of values.entries()) {
    try {
      assert(fn, value, ...args);
    } catch (err) {
      err.message = err.message.replace(/\" !$/, '[]" !');
      err.details = {
        at: index,
        ...err.details
      };
      throw err;
    }
  }
  return values;
}

// lib/types/extended/bigint.js
function isBigIntWithinRange(value, min, max) {
  shouldBigInt(min);
  shouldBigInt(max);
  return isBigInt(value) && value >= min && value <= max;
}
function asBigIntWithinRange(value, min, max) {
  return isBigIntWithinRange(value, min, max) ? value : null;
}
function shouldBigIntWithinRange(value, min, max) {
  return assert(isBigIntWithinRange, value, min, max);
}
function isBigUint(value) {
  return isBigInt(value) && value >= 0n;
}
function asBigUint(value) {
  return isBigUint(value) ? value : null;
}
function shouldBigUint(value) {
  return assert(isBigUint, value);
}

// lib/types/extended/number.js
function isNumberWithinRange(value, min, max) {
  shouldNumber(min);
  shouldNumber(max);
  return isNumber(value) && value >= min && value <= max;
}
function asNumberWithinRange(value, min, max) {
  return isNumberWithinRange(value, min, max) ? value : null;
}
function shouldNumberWithinRange(value, min, max) {
  return assert(isNumberWithinRange, value, min, max);
}
function isIntWithinRange(value, min, max) {
  shouldInt(min);
  shouldInt(max);
  return isInt(value) && value >= min && value <= max;
}
function asIntWithinRange(value, min, max) {
  return isIntWithinRange(value, min, max) ? value : null;
}
function shouldIntWithinRange(value, min, max) {
  return assert(isIntWithinRange, value, min, max);
}
function isUint(value) {
  return isInt(value) && value >= 0;
}
function asUint(value) {
  return isUint(value) ? value : null;
}
function shouldUint(value) {
  return assert(isUint, value);
}

// lib/types/extended/string.js
var PATTERNS = {
  hex: /^[0-9A-Fa-f]+$/,
  SRI: /^(sha(?:256|384|512)-[A-Za-z0-9+/=]{43,}={0,2})$/i
};
function isStringLike(value, pattern) {
  if (isString(pattern)) pattern = PATTERNS[pattern];
  shouldRegExp(pattern);
  return isString(value) && pattern.test(value);
}
function asStringLike(value, pattern) {
  return isStringLike(value, pattern) ? value : null;
}
function shouldStringLike(value, pattern) {
  return assert(isStringLike, value, pattern);
}
function isNonEmptyString(value) {
  return isString(value) && value.length > 0;
}
function asNonEmptyString(value) {
  return isNonEmptyString(value) ? value : null;
}
function shouldNonEmptyString(value) {
  return assert(isNonEmptyString, value);
}

// lib/enum.js
function enumFrom(values) {
  shouldPlainObject(values);
  const obj = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of Object.entries(values)) {
    if (key === "__proto__") continue;
    shouldUint(value);
    obj[key] = value;
    obj[value] = key;
  }
  if (Object.keys(obj).length === 0) throw new Error("Enum can not be empty !");
  return Object.freeze(obj);
}

// lib/match.js
function parse(typeString) {
  shouldNonEmptyString(typeString);
  const match = typeString.match(/(\w+\*?)(\[(\d)?\])?$/);
  if (isNull(match)) throw new Error(`Unable to parse: "${typeString}"`);
  return match;
}
function is(typeString, value) {
  const [, type, array, length] = parse(typeString);
  const test = translate(type.toLowerCase());
  if (array) return isArrayOf(test, value);
  return test(value);
}
function as(typeString, value) {
  return is(typeString, value) ? value : null;
}
function should(typeString, value) {
  const [, type, array, length] = parse(typeString);
  const test = translate(type.toLowerCase());
  if (array) return shouldArrayOf(test, value);
  return assert(test, value);
}
function translate(type) {
  switch (type) {
    //String
    case "string":
    case "str": {
      return isString;
    }
    //Boolean
    case "boolean":
    case "bool": {
      return isBoolean;
    }
    //Number
    case "number":
    case "nbr": {
      return isNumber;
    }
    //Integer    
    case "integer":
    case "int": {
      return isInt;
    }
    case "uint": {
      return isUInt;
    }
    //BigInt
    case "bigint": {
      return isBigInt;
    }
    case "biguint": {
      return isBigUInt;
    }
    //Plain Object
    case "object":
    case "obj": {
      return isPlainObject;
    }
    //Symbol
    case "symbol": {
      return isSymbol;
    }
    //Function
    case "function":
    case "func":
    case "fn": {
      return isFunction;
    }
    //Promise
    case "promise": {
      return isPromise;
    }
    //Generator
    case "function*":
    case "func*":
    case "fn*": {
      return isGenerator;
    }
    //RegExp
    case "regexp":
    case "regexr":
    case "regex": {
      return isRegExp;
    }
    //Error
    case "error":
    case "err": {
      return isError;
    }
    //Buffer
    case "buffer":
    case "uint8Array": {
      return isBuffer;
    }
    //Set
    case "set": {
      return isSet;
    }
    //Map
    case "map": {
      return isMap;
    }
    //Array
    case "array":
    case "arr": {
      return isArray;
    }
    //Unknown
    default:
      throw new Error(`Unknown type: "${type}"`);
  }
}
export {
  as,
  asArray,
  asArrayOf,
  asBigInt,
  asBigIntWithinRange,
  asBigUint,
  asBoolean,
  asBuffer,
  asError,
  asFunction,
  asGenerator,
  asInt,
  asIntWithinRange,
  asMap,
  asNonEmptyString,
  asNumber,
  asNumberWithinRange,
  asPlainObject as asObject,
  asPlainObject,
  asPromise,
  asRegExp,
  asSet,
  asString,
  asStringLike,
  asSymbol,
  asUint,
  enumFrom,
  is,
  isArray,
  isArrayOf,
  isBigInt,
  isBigIntWithinRange,
  isBigUint,
  isBoolean,
  isBuffer,
  isError,
  isFunction,
  isGenerator,
  isInt,
  isIntWithinRange,
  isMap,
  isNonEmptyString,
  isNull,
  isNullish,
  isNumber,
  isNumberWithinRange,
  isPlainObject as isObject,
  isPlainObject,
  isPromise,
  isRegExp,
  isSet,
  isString,
  isStringLike,
  isSymbol,
  isUint,
  isUndefined,
  isUndefined as isVoid,
  should,
  shouldArray,
  shouldArrayOf,
  shouldBigInt,
  shouldBigIntWithinRange,
  shouldBigUint,
  shouldBoolean,
  shouldBuffer,
  shouldError,
  shouldFunction,
  shouldGenerator,
  shouldInt,
  shouldIntWithinRange,
  shouldMap,
  shouldNonEmptyString,
  shouldNull,
  shouldNullish,
  shouldNumber,
  shouldNumberWithinRange,
  shouldPlainObject as shouldObject,
  shouldPlainObject,
  shouldPromise,
  shouldRegExp,
  shouldSet,
  shouldString,
  shouldStringLike,
  shouldSymbol,
  shouldUint,
  shouldUndefined,
  shouldUndefined as shouldVoid
};
