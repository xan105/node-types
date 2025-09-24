/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { assert } from "../util.js";

export function isBoolean(value){
  return value === true || value === false
}

export function asBoolean(value){
  return isBoolean(value) ? value : null;
}

export function shouldBoolean(value){
  return assert(isBoolean, value)
}
