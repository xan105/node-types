/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { assert } from "../util.js";
import { isNumber, isInt, shouldNumber, shouldInt } from "../primitive/number.js";

export function isNumberWithinRange(value, min, max){
  shouldNumber(min);
  shouldNumber(max); 
  return isNumber(value) && value >= min && value <= max;
}

export function asNumberWithinRange(value, min, max){
  return isNumberWithinRange(value, min, max) ? value : null;
}

export function shouldNumberWithinRange(value, min, max){
  return assert(isNumberWithinRange, value, min, max);
}

export function isIntWithinRange(value, min, max){
  shouldInt(min);
  shouldInt(max);
  return isInt(value) && value >= min && value <= max;
}

export function asIntWithinRange(value, min, max){
  return isIntWithinRange(value, min, max) ? value : null;
}

export function shouldIntWithinRange(value, min, max){
  return assert(isIntWithinRange, value, min, max);
}

export function isUint(value){
  return isInt(value) && value >= 0;
}

export function asUint(value){
  return isUint(value) ? value : null;
}

export function shouldUint(value){
  return assert(isUint, value);
}