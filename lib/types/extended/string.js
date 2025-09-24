/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { assert } from "../util.js";
import { isString } from "../primitive/string.js";
import { shouldRegExp } from "../object/object.js";

const PATTERNS = {
  hex: /^[0-9A-Fa-f]+$/,
  SRI: /^(sha(?:256|384|512)-[A-Za-z0-9+/=]{43,}={0,2})$/i,
};

export function isStringLike(value, pattern){
  if (isString(pattern)) pattern = PATTERNS[pattern];
  shouldRegExp(pattern);
  return isString(value) && pattern.test(value);
}

export function asStringLike(value, pattern){
  return isStringLike(value, pattern) ? value : null;
}

export function shouldStringLike(value, pattern){
  return assert(isStringLike, value, pattern);
}

export function isNonEmptyString(value){
  return isString(value) && value.length > 0;
}

export function asNonEmptyString(value){
  return isNonEmptyString(value) ? value : null;
}

export function shouldNonEmptyString(value){
  return assert(isNonEmptyString, value);
}