/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { assert, isTag } from "../util.js";

export function isFunction(value){
  return typeof value === "function";
}

export function asFunction(value){
  return isFunction(value) ? value : null;
}

export function shouldFunction(value){
  return assert(isFunction, value);
}

export function isPromise(value){
  return isTag(value, "Promise") && isFunction(value.then);
}

export function asPromise(value){
  return isPromise(value) ? value : null;
}

export function shouldPromise(value){
  return assert(isPromise, value);
}

export function isGenerator(value){
  return isTag(value, "GeneratorFunction") || isTag(value, "AsyncGeneratorFunction");
}

export function asGenerator(value){
  return isGenerator(value) ? value : null;
}

export function shouldGenerator(value){
  return assert(isGenerator, value);
}