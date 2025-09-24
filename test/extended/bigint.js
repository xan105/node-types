import test from "node:test";
import assert from "node:assert/strict";
import { 
  isBigIntWithinRange, asBigIntWithinRange, shouldBigIntWithinRange,
  isBigUint, asBigUint, shouldBigUint
} from "../../lib/index.js";

test("isBigIntWithinRange()", () => {
  assert.ok(isBigIntWithinRange(5n, 0n, 10n));
  assert.ok(isBigIntWithinRange(0n, 0n, 10n));
  assert.ok(isBigIntWithinRange(10n, 0n, 10n));
  assert.ok(!isBigIntWithinRange(-1n, 0n, 10n));
  assert.ok(!isBigIntWithinRange(11n, 0n, 10n));
  assert.ok(!isBigIntWithinRange(5, 0n, 10n)); // number, not bigint
});

test("asBigIntWithinRange()", () => {
  assert.equal(asBigIntWithinRange(5n, 0n, 10n), 5n);
  assert.equal(asBigIntWithinRange(-1n, 0n, 10n), null);
  assert.equal(asBigIntWithinRange(11n, 0n, 10n), null);
  assert.equal(asBigIntWithinRange(5, 0n, 10n), null);
});

test("shouldBigIntWithinRange()", () => {
  assert.equal(shouldBigIntWithinRange(5n, 0n, 10n), 5n);
  assert.throws(() => shouldBigIntWithinRange(-1n, 0n, 10n), TypeError);
  assert.throws(() => shouldBigIntWithinRange(11n, 0n, 10n), TypeError);
  assert.throws(() => shouldBigIntWithinRange(5, 0n, 10n), TypeError);
});

test("isBigUint()", () => {
  assert.ok(isBigUint(0n));
  assert.ok(isBigUint(5n));
  assert.ok(!isBigUint(-1n));
  assert.ok(!isBigUint(5));  // number, not bigint
});

test("asBigUint()", () => {
  assert.equal(asBigUint(5n), 5n);
  assert.equal(asBigUint(-1n), null);
  assert.equal(asBigUint(5), null);
});

test("shouldBigUint()", () => {
  assert.equal(shouldBigUint(5n), 5n);
  assert.throws(() => shouldBigUint(-1n), TypeError);
  assert.throws(() => shouldBigUint(5), TypeError);
});
