import test from "node:test";
import assert from "node:assert/strict";
import { 
  is, 
  as, 
  should,
  isString,
  isNumber,
  isBoolean,
  isArray
} from "../lib/index.js";

test("is() - scalar types", () => {
  assert.ok(is("string", "hello"));
  assert.ok(!is("string", 123));
  assert.ok(is("number", 42));
  assert.ok(!is("number", "42"));
  assert.ok(is("bool", true));
  assert.ok(!is("bool", "true"));
});

test("is() - array types", () => {
  assert.ok(is("string[]", ["a", "b"]));
  assert.ok(!is("string[]", ["a", 1, "b"]));
  assert.ok(is("number[]", [1, 2, 3]));
  assert.ok(!is("number[]", [1, "2", 3]));
  // fixed length
  assert.ok(is("string[2]", ["a", "b"]));
  assert.ok(!is("string[1]", ["a", "b"]));
});

test("as() - scalar types", () => {
  assert.equal(as("string", "hello"), "hello");
  assert.equal(as("string", 123), null);
  assert.equal(as("number", 42), 42);
  assert.equal(as("number", "42"), null);
});

test("as() - array types", () => {
  const arr = ["x", "y"];
  assert.deepEqual(as("string[]", arr), arr);
  assert.equal(as("string[]", ["x", 2]), null);
  // fixed length
  assert.deepEqual(as("string[2]", arr), arr);
  assert.equal(as("string[1]", arr), null);
});

test("should() - scalar types", () => {
  assert.equal(should("string", "hi"), "hi");
  assert.throws(() => should("string", 123), TypeError);
  assert.equal(should("number", 99), 99);
  assert.throws(() => should("number", "99"), TypeError);
});

test("should() - array types", () => {
  const arr = ["a","b"];
  assert.equal(should("string[]", arr), arr);
  assert.throws(() => should("string[]", ["a", 1]), TypeError);
  // fixed length
  assert.equal(should("string[2]", arr), arr);
  assert.throws(() => should("string[1]", arr), TypeError);
});

test("edge cases - case insensitive aliases", () => {
  assert.ok(is("Str", "foo"));
  assert.ok(is("BOOL", true));
  assert.ok(is("Arr", ["x", "y"]));
});

test("edge cases - empty array", () => {
  assert.ok(is("string[]", []));
  assert.deepEqual(as("string[]", []), []);
  assert.deepEqual(should("string[]", []), []);
});
