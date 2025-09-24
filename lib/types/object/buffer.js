/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

//TypedArray, ArrayBuffer, etc...

import { assert, isTag } from "../util.js";

export function isBuffer(value){ //Uint8Array or Node's Buffer (subclass of Uint8Array)
  return isTag(value, "Uint8Array");
}

export function asBuffer(value){
  return isBuffer(value) ? value : null;
}

export function shouldBuffer(value){
  return assert(isBuffer, value);
}