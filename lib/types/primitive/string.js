/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { assert } from "../util.js";

export function isString(value){
  return typeof value === "string";
}

export function asString(value){
  return isString(value) ? value : null;
}

export function shouldString(value){
  return assert(isString, value);
}