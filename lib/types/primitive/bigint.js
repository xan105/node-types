/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { assert } from "../util.js";

export function isBigInt(value){
  return typeof value === "bigint";
}

export function asBigInt(value){
  return isBigInt(value) ? value : null;
}

export function shouldBigInt(value){
  return assert(isBigInt, value);
}