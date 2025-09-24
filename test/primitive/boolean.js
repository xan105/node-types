import test from "node:test";
import assert from "node:assert/strict";
import { isBoolean, asBoolean, shouldBoolean } from "../../lib/index.js";

test("isBoolean()", () => {
  assert.ok(isBoolean(true));
  assert.ok(isBoolean(false));
  assert.ok(isBoolean(Boolean(1)));
  assert.ok(isBoolean(!!1));
  assert.ok(!isBoolean(new Boolean(true)));
  assert.ok(!isBoolean("foo"));
  assert.ok(!isBoolean(null));
  assert.ok(!isBoolean(undefined));
});

test("asBoolean()", () => {
  assert.equal(asBoolean(true), true);
  assert.equal(asBoolean(false), false);
  assert.equal(asBoolean(Boolean(1)), true);
  assert.equal(asBoolean(!!1), true);

  // invalid inputs should return null
  assert.equal(asBoolean(new Boolean(true)), null);
  assert.equal(asBoolean("foo"), null);
  assert.equal(asBoolean(null), null);
  assert.equal(asBoolean(undefined), null);
});

test("shouldBoolean()", () => {
  // valid inputs pass through
  assert.equal(shouldBoolean(true), true);
  assert.equal(shouldBoolean(false), false);

  // invalid inputs throw a TypeError
  assert.throws(() => shouldBoolean("foo"), TypeError);
  assert.throws(() => shouldBoolean(null), TypeError);
  assert.throws(() => shouldBoolean(undefined), TypeError);
  assert.throws(() => shouldBoolean(new Boolean(true)), SyntaxError);
});
