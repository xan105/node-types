/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { isArray, shouldArray } from "../object/array.js";
import { shouldFunction } from "../object/func.js";
import { assert } from "../util.js";

export function isArrayOf(fn, values, ...args){
  shouldFunction(fn);
  return isArray(values) && values.filter(value => fn(value, ...args)).length === values.length; //array.every() skips "empty" slot
}

export function asArrayOf(fn, values, ...args){
  return isArrayOf(fn, values, ...args) ? values : null;
}

export function shouldArrayOf(fn, values, ...args){
  shouldFunction(fn);
  shouldArray(values);
  
  for (const [ index, value ] of values.entries()){
    try{
      assert(fn, value, ...args);
    }catch(err){
      err.message = err.message.replace(/" !$/, "[]\" !");
      err.details = { 
        at: index,
        ...err.details 
      };
      throw err;
    }
  }
  return values;
}