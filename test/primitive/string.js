import test from "node:test";
import assert from "node:assert/strict";
import { isString, asString, shouldString } from "../../lib/index.js";

test("isString()", () => {
  assert.ok(isString("foo"));
  assert.ok(isString(""));
  assert.ok(isString(String(1)));
  assert.ok(!isString(new String("bar")));
  assert.ok(!isString(42));
  assert.ok(!isString(true));
  assert.ok(!isString(null));
  assert.ok(!isString(undefined));
});

test("asString()", () => {
  assert.equal(asString("foo"), "foo");
  assert.equal(asString(""), "");
  assert.equal(asString(String(1)), "1");

  // invalid inputs → null
  assert.equal(asString(new String("bar")), null);
  assert.equal(asString(42), null);
  assert.equal(asString(true), null);
  assert.equal(asString(null), null);
  assert.equal(asString(undefined), null);
});

test("shouldString()", () => {
  // valid inputs
  assert.equal(shouldString("foo"), "foo");
  assert.equal(shouldString(""), "");
  assert.equal(shouldString(String(1)), "1");

  // invalid inputs → throw
  assert.throws(() => shouldString(new String("bar")), SyntaxError);
  assert.throws(() => shouldString(42), TypeError);
  assert.throws(() => shouldString(true), TypeError);
  assert.throws(() => shouldString(null), TypeError);
  assert.throws(() => shouldString(undefined), TypeError);
});
