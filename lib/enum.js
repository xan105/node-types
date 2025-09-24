/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { shouldPlainObject } from "./types/object/object.js";
import { shouldUint } from "./types/extended/number.js";

export function enumFrom(values){
  shouldPlainObject(values);
  const obj = Object.create(null);
  for (const [ key, value ] of Object.entries(values)){
    if(key === "__proto__") continue; //not allowed
    shouldUint(value);
    obj[key] = value;
    obj[value] = key;
  }
  if (Object.keys(obj).length === 0) throw new Error("Enum can not be empty !");
  return Object.freeze(obj);
}
//there is an enum tc39 proposal (Stage 0-1 TC39)
//Use Tuple.from() instead of object.freeze for immutability ? (Stage 2 TC39)