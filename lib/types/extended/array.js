/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { isArray, asArray, shouldArray } from "../object/array.js";
import { shouldFunction } from "../object/func.js";
import { asUint } from "./number.js";
import { assert } from "../util.js";

export function isArrayOf(fn, values, option = {}){
  shouldFunction(fn);
  if (!isArray(values)) return false;
  if (isArray(option)) option = { args: option };
  
  const options = {
    args: asArray(option.args) ?? [],
    length: asUint(option.length) ?? values.length
  }

  if (values.length !== options.length) return false;
  
  for (const value of values.values()){ // Iterate over all elements
    if (fn(value, ...options.args) === true) continue;
    return false;
  }
  
  return true;
}

export function asArrayOf(fn, values, option){
  return isArrayOf(fn, values, option) ? values : null;
}

export function shouldArrayOf(fn, values, option = {}){
  shouldFunction(fn);
  shouldArray(values);
  if (isArray(option)) option = { args: option };
  
  const options = {
    args: asArray(option.args) ?? [],
    length: asUint(option.length) ?? values.length
  }
  
  if (values.length !== options.length) {
    throw new TypeError("Fixed length array wrong size!", { cause: 
      { actual: values.length, expected: options.length }
    });
  }
  
  for (const [ index, value ] of values.entries()){ // Iterate over all elements
    try{
      assert(fn, value, ...options.args);
    }catch(err){
      err.message = err.message.replace(/" !$/, "[]\" !");
      err.cause = { 
        at: index,
        ...err.cause 
      };
      throw err;
    }
  }
  return values;
}