import test from "node:test";
import assert from "node:assert/strict";
import { 
  isNull, shouldNull, 
  isUndefined, shouldUndefined, 
  isNullish, shouldNullish,
  isVoid, shouldVoid
} from "../../lib/index.js";

test("isNull()", () => {
  assert.ok(isNull(null));
  assert.ok(!isNull(undefined));
  assert.ok(!isNull(0));
  assert.ok(!isNull(""));
  assert.ok(!isNull(false));
});

test("shouldNull()", () => {
  assert.equal(shouldNull(null), null);
  assert.throws(() => shouldNull(undefined), TypeError);
  assert.throws(() => shouldNull(0), TypeError);
  assert.throws(() => shouldNull(""), TypeError);
  assert.throws(() => shouldNull(false), TypeError);
});

test("isUndefined()", () => {
  assert.ok(isUndefined(undefined));
  assert.ok(!isUndefined(null));
  assert.ok(!isUndefined(0));
  assert.ok(!isUndefined(""));
  assert.ok(!isUndefined(false));
});

test("shouldUndefined()", () => {
  assert.equal(shouldUndefined(undefined), undefined);
  assert.throws(() => shouldUndefined(null), TypeError);
  assert.throws(() => shouldUndefined(0), TypeError);
  assert.throws(() => shouldUndefined(""), TypeError);
  assert.throws(() => shouldUndefined(false), TypeError);
});

test("isVoid() alias", () => {
  assert.ok(isVoid(undefined));
  assert.ok(!isVoid(null));
  assert.ok(!isVoid(0));
});

test("shouldVoid() alias", () => {
  assert.equal(shouldVoid(undefined), undefined);
  assert.throws(() => shouldVoid(null), TypeError);
  assert.throws(() => shouldVoid(0), TypeError);
});

test("isNullish()", () => {
  assert.ok(isNullish(null));
  assert.ok(isNullish(undefined));
  assert.ok(!isNullish(0));
  assert.ok(!isNullish(""));
  assert.ok(!isNullish(false));
});

test("shouldNullish()", () => {
  assert.equal(shouldNullish(null), null);
  assert.equal(shouldNullish(undefined), undefined);
  assert.throws(() => shouldNullish(0), TypeError);
  assert.throws(() => shouldNullish(""), TypeError);
  assert.throws(() => shouldNullish(false), TypeError);
});
