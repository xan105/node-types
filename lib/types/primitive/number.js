/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { assert } from "../util.js";

export function isNumber(value){
  return typeof value === "number";
}

export function asNumber(value){
  return isNumber(value) ? value : null;
}

export function shouldNumber(value){
  return assert(isNumber, value);
}

export function isInt(value){
  return Number.isSafeInteger(value);
}

export function asInt(value){
  return isInt(value) ? value : null;
}

export function shouldInt(value){
  return assert(isInt, value);
}