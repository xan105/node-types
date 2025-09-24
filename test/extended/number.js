import test from "node:test";
import assert from "node:assert/strict";
import { 
  isNumberWithinRange, asNumberWithinRange, shouldNumberWithinRange,
  isIntWithinRange, asIntWithinRange, shouldIntWithinRange,
  isUint, asUint, shouldUint
} from "../../lib/index.js";

test("isNumberWithinRange()", () => {
  assert.ok(isNumberWithinRange(5, 0, 10));
  assert.ok(isNumberWithinRange(0, 0, 10));
  assert.ok(isNumberWithinRange(10, 0, 10));
  assert.ok(!isNumberWithinRange(-1, 0, 10));
  assert.ok(!isNumberWithinRange(11, 0, 10));
  assert.ok(!isNumberWithinRange("5", 0, 10));
});

test("asNumberWithinRange()", () => {
  assert.equal(asNumberWithinRange(5, 0, 10), 5);
  assert.equal(asNumberWithinRange(-1, 0, 10), null);
  assert.equal(asNumberWithinRange("5", 0, 10), null);
});

test("shouldNumberWithinRange()", () => {
  assert.equal(shouldNumberWithinRange(5, 0, 10), 5);
  assert.throws(() => shouldNumberWithinRange(-1, 0, 10), TypeError);
  assert.throws(() => shouldNumberWithinRange("5", 0, 10), TypeError);
});

test("isIntWithinRange()", () => {
  assert.ok(isIntWithinRange(5, 0, 10));
  assert.ok(isIntWithinRange(0, 0, 10));
  assert.ok(isIntWithinRange(10, 0, 10));
  assert.ok(!isIntWithinRange(5.5, 0, 10));
  assert.ok(!isIntWithinRange(-1, 0, 10));
  assert.ok(!isIntWithinRange(11, 0, 10));
  assert.ok(!isIntWithinRange("5", 0, 10));
});

test("asIntWithinRange()", () => {
  assert.equal(asIntWithinRange(5, 0, 10), 5);
  assert.equal(asIntWithinRange(5.5, 0, 10), null);
  assert.equal(asIntWithinRange(-1, 0, 10), null);
});

test("shouldIntWithinRange()", () => {
  assert.equal(shouldIntWithinRange(5, 0, 10), 5);
  assert.throws(() => shouldIntWithinRange(5.5, 0, 10), TypeError);
  assert.throws(() => shouldIntWithinRange(-1, 0, 10), TypeError);
});

test("isUint()", () => {
  assert.ok(isUint(0));
  assert.ok(isUint(5));
  assert.ok(!isUint(-1));
  assert.ok(!isUint(5.5));
  assert.ok(!isUint("5"));
});

test("asUint()", () => {
  assert.equal(asUint(5), 5);
  assert.equal(asUint(-1), null);
  assert.equal(asUint(5.5), null);
  assert.equal(asUint("5"), null);
});

test("shouldUint()", () => {
  assert.equal(shouldUint(5), 5);
  assert.throws(() => shouldUint(-1), TypeError);
  assert.throws(() => shouldUint(5.5), TypeError);
  assert.throws(() => shouldUint("5"), TypeError);
});
