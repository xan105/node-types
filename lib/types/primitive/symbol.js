/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { assert } from "../util.js";

export function isSymbol(value){
  return typeof value === "symbol";
}

export function asSymbol(value){
  return isSymbol(value) ? value : null;
}

export function shouldSymbol(value){
  return assert(isSymbol, value);
}
