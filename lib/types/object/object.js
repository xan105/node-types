/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { assert, isTag } from "../util.js";
import { isNull } from "../primitive/nil.js";

export function isPlainObject(value){ //"plain object": {}, new Object() and Object.create(null)
  if(value){
    if (isTag(value, "Object")) return true;
    const prototype = Object.getPrototypeOf(value);
    if (isNull(prototype)  || prototype === Object.prototype) return true;
  }
  return false;
}

export function asPlainObject(value){
  return isPlainObject(value) ? value : null;
}

export function shouldPlainObject(value){
  return assert(isPlainObject, value);
}

export function isError(value){ 
  return Error.isError?.() ?? isTag(value, "Error");
}

export function asError(value){ 
  return isError(value) ? value : null;
}

export function shouldError(value){ 
  return assert(isError, value);
}

export function isRegExp(value){
  return isTag(value, "RegExp");
}

export function asRegExp(value){
  return isRegExp(value) ? value : null;
}

export function shouldRegExp(value){
  return assert(isRegExp, value);
}

export function isMap(value){
  return isTag(value, "Map");
}

export function asMap(value){
  return isMap(value) ? value : null;
}

export function shouldMap(value){
  return assert(isMap, value);
}

//Tuples are immutable objects (Stage 2 TC39)

//Alias
export {
  isPlainObject as isObject,
  asPlainObject as asObject,
  shouldPlainObject as shouldObject
}