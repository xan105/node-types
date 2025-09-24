import test from "node:test";
import assert from "node:assert/strict";
import { isArrayOf, asArrayOf, shouldArrayOf, isNumber } from "../../lib/index.js";

test("isArrayOf() - all pass", () => {
  const arr = [1, 2, 3];
  assert.ok(isArrayOf(isNumber, arr));
});

test("isArrayOf() - some fail", () => {
  const arr = [1, "2", 3];
  assert.ok(!isArrayOf(isNumber, arr));
});

test("isArrayOf() - empty array", () => {
  assert.ok(isArrayOf(isNumber, []));
});

test("asArrayOf() - returns array when all pass", () => {
  const arr = [1, 2, 3];
  assert.equal(asArrayOf(isNumber, arr), arr);
});

test("asArrayOf() - returns null when some fail", () => {
  const arr = [1, "2", 3];
  assert.equal(asArrayOf(isNumber, arr), null);
});

test("shouldArrayOf() - all pass", () => {
  const arr = [1, 2, 3];
  assert.equal(shouldArrayOf(isNumber, arr), arr);
});

test("shouldArrayOf() - throws on first failure with correct index", () => {
  const arr = [1, "2", 3];
  try {
    shouldArrayOf(isNumber, arr);
    assert.fail("Expected TypeError");
  } catch (err) {
    assert.equal(err.details.at, 1); // second element fails
  }
});

test("shouldArrayOf() - empty array", () => {
  assert.deepEqual(shouldArrayOf(isNumber, []), []);
});

test("shouldArrayOf() - invalid fn or values triggers checks", () => {
  assert.throws(() => isArrayOf(null, [1]), TypeError);
  assert.throws(() => shouldArrayOf(isNumber, "not an array"), TypeError);
});
