/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

const DANGEROUS_TAGS = ["[object String]", "[object Boolean]", "[object Number]"];

export function assert(fn, value, ...args){
  if (fn(value, ...args) === false){
    const type = typeof value;
    const tag = Object.prototype.toString.call(value);
    
    if (type === "object" && DANGEROUS_TAGS.includes(tag))
      throw new SyntaxError("new String|Boolean|Number() is confusing, dangerous, and wasteful. Avoid it.");
    
    const name = fn.name.replace(/(^is)|(Like$)/, "").toLowerCase();
    const error = new TypeError(`Expected type "${name}" !`);
    error.details = { 
      actual: { type, tag, value },
      expected: name
    };
    throw error;
  }
  return value;
}

export function isTag(value, name){
  const tag = `[object ${name}]`;
  return Object.prototype.toString.call(value) === tag;
}