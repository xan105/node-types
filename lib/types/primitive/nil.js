/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { assert } from "../util.js";

export function isNull(value){
  return value === null;
}
export function shouldNull(value){
  return assert(isNull, value);
}

export function isUndefined(value){
  return typeof value === "undefined";
}
export function shouldUndefined(value){
  return assert(isUndefined, value);
}

export function isNullish(value){ //null or undefined
  return value == null;
}
export function shouldNullish(value){
  return assert(isNullish, value);
}

//Alias
export {
  isUndefined as isVoid,
  shouldUndefined as shouldVoid
}