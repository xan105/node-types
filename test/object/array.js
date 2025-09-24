import test from "node:test";
import assert from "node:assert/strict";
import { 
  isArray, asArray, shouldArray, 
  isSet, asSet, shouldSet 
} from "../../lib/index.js";

test("isArray()", () => {
  assert.ok(isArray([]));
  assert.ok(isArray([1, 2, 3]));
  assert.ok(!isArray({}));
  assert.ok(!isArray(null));
  assert.ok(!isArray(undefined));
  assert.ok(!isArray("foo"));
});

test("asArray()", () => {
  const arr = [1, 2, 3];
  assert.deepEqual(asArray(arr), arr);
  assert.deepEqual(asArray([]), []);
  assert.deepEqual(asArray({}), null);
  assert.deepEqual(asArray(null), null);
  assert.deepEqual(asArray(undefined), null);
  assert.deepEqual(asArray("foo"), null);
});

test("shouldArray()", () => {
  const arr = [1, 2, 3];
  assert.deepEqual(shouldArray(arr), arr);
  assert.throws(() => shouldArray({}), TypeError);
  assert.throws(() => shouldArray(null), TypeError);
  assert.throws(() => shouldArray(undefined), TypeError);
  assert.throws(() => shouldArray("foo"), TypeError);
});

test("isSet()", () => {
  assert.ok(isSet(new Set()));
  assert.ok(isSet(new Set([1, 2, 3])));
  assert.ok(!isSet([]));
  assert.ok(!isSet({}));
  assert.ok(!isSet(null));
  assert.ok(!isSet(undefined));
});

test("asSet()", () => {
  const s = new Set([1, 2, 3]);
  assert.deepEqual(asSet(s), s);
  assert.deepEqual(asSet(new Set()), new Set());
  assert.deepEqual(asSet([]), null);
  assert.deepEqual(asSet({}), null);
  assert.deepEqual(asSet(null), null);
});

test("shouldSet()", () => {
  const s = new Set([1, 2, 3]);
  assert.deepEqual(shouldSet(s), s);
  assert.throws(() => shouldSet([]), TypeError);
  assert.throws(() => shouldSet({}), TypeError);
  assert.throws(() => shouldSet(null), TypeError);
});
