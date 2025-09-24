/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { assert, isTag } from "../util.js";

export function isArray(value){
  return Array.isArray(value);
}

export function asArray(value){
  return isArray(value) ? value : null;
}

export function shouldArray(value){
  return assert(isArray, value)
}

export function isSet(value){
  return isTag(value, "Set");
}

export function asSet(value){
  return isSet(value) ? value : null;
}

export function shouldSet(value){
  return assert(isSet, value);
}

//Records (Stage 2 TC39) = immutable arrays

