/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { shouldNonEmptyString } from "./types/extended/string.js";
import { isNull } from "./types/primitive/nil.js";
import { isArrayOf, shouldArrayOf } from "./types/extended/array.js";
import { assert } from "./types/util.js";

function parse(typeString){
  shouldNonEmptyString(typeString);
  
  const match = typeString.match(/(\w+\*?)(\[(\d)?\])?$/);
  if(isNull(match)) throw new Error(`Unable to parse: "${typeString}"`);
  
  return match;
}

export function is(typeString, value){
  const [, type, array, length] = parse(typeString);
  const test = translate(type.toLowerCase());
  
  if(array) {
    if(length){
      return isArrayOf(test, value) && value.length === +length;
    }
    return isArrayOf(test, value);
  }
  return test(value);
}

export function as(typeString, value){
  return is(typeString, value) ? value : null;
}

export function should(typeString, value){
  const [, type, array, length] = parse(typeString);
  const test = translate(type.toLowerCase());
  
  if(array) {
    if(length){
      const result = shouldArrayOf(test, value);
      if (value.length !== +length){
        const error = new TypeError("Fixed length array wrong size!");
        error.details = {
          actual: value.length, expected: +length
        }
        throw error;
      }
      return result;
    }
    return shouldArrayOf(test, value);
  }
  return assert(test, value);
}

import { isBigInt } from "./types/primitive/bigint.js";
import { isBigUint } from "./types/extended/bigint.js";
import { isBoolean } from "./types/primitive/boolean.js";
import { isNumber, isInt } from "./types/primitive/number.js";
import { isUint } from "./types/extended/number.js";
import { isString } from "./types/primitive/string.js";
import { isSymbol } from "./types/primitive/symbol.js";
import { isArray, isSet } from "./types/object/array.js";
import { isBuffer } from "./types/object/buffer.js";
import { isFunction, isPromise, isGenerator } from "./types/object/func.js";
import { isPlainObject, isError, isRegExp, isMap } from "./types/object/object.js";

function translate(type){
  switch(type){
  //String
    case "string":
    case "str":
    {
      return isString;
    }
  //Boolean
    case "boolean":
    case "bool": 
    {
      return isBoolean;
    }
  //Number
    case "number":
    case "nbr": 
    {
      return isNumber;
    }
  //Integer    
    case "integer":
    case "int": 
    {
      return isInt;
    }
    case "uint":
    {
      return isUInt;
    }
  //BigInt
    case "bigint":
    {
      return isBigInt;
    }
    case "biguint":
    {
      return isBigUInt;
    }
  //Plain Object
    case "object":
    case "obj": 
    {
      return isPlainObject;
    }
  //Symbol
    case "symbol": 
    {
      return isSymbol;
    }
  //Function
    case "function":
    case "func":
    case "fn": 
    {
      return isFunction;
    }
  //Promise
    case "promise":
    {
      return isPromise;
    }
  //Generator
    case "function*":
    case "func*":
    case "fn*": 
    {
      return isGenerator;
    }
  //RegExp
    case "regexp":
    case "regexr":
    case "regex": 
    {
      return isRegExp;
    }
  //Error
    case "error":
    case "err": 
    {
      return isError;
    }
  //Buffer
    case "buffer":
    case "uint8Array": 
    {
      return isBuffer;
    }
  //Set
    case "set":
    {
      return isSet;
    }
  //Map
    case "map":
    {
      return isMap;
    }
  //Array
    case "array":
    case "arr": 
    {
      return isArray;
    }
  //Unknown
    default:
      throw new Error(`Unknown type: "${type}"`);
  }
}