/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { assert } from "../util.js";
import { isBigInt, shouldBigInt } from "../primitive/bigint.js";

export function isBigIntWithinRange(value, min, max){
  shouldBigInt(min);
  shouldBigInt(max);
  return isBigInt(value) && value >= min && value <= max;
}

export function asBigIntWithinRange(value, min, max){
  return isBigIntWithinRange(value, min, max) ? value : null;
}

export function shouldBigIntWithinRange(value, min, max){
  return assert(isBigIntWithinRange, value, min, max);
}

export function isBigUint(value){
  return isBigInt(value) && value >= 0n;
}

export function asBigUint(value){
  return isBigUint(value) ? value : null;
}

export function shouldBigUint(value){
  return assert(isBigUint, value);
}