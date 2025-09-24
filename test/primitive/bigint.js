import test from "node:test";
import assert from "node:assert/strict";
import { isBigInt, asBigInt, shouldBigInt } from "../../lib/index.js";

test("isBigInt()", () => {
  assert.ok(isBigInt(1n));
  assert.ok(isBigInt(BigInt(42)));
  assert.ok(!isBigInt(42));        // number, not bigint
  assert.ok(!isBigInt("42"));      // string
  assert.ok(!isBigInt(null));
  assert.ok(!isBigInt(undefined));
  assert.ok(!isBigInt(true));
});

test("asBigInt()", () => {
  assert.equal(asBigInt(1n), 1n);
  assert.equal(asBigInt(BigInt(42)), 42n);

  // invalid inputs → null
  assert.equal(asBigInt(42), null);
  assert.equal(asBigInt("42"), null);
  assert.equal(asBigInt(true), null);
  assert.equal(asBigInt(null), null);
  assert.equal(asBigInt(undefined), null);
});

test("shouldBigInt()", () => {
  // valid inputs
  assert.equal(shouldBigInt(1n), 1n);
  assert.equal(shouldBigInt(BigInt(42)), 42n);

  // invalid inputs → throw
  assert.throws(() => shouldBigInt(42), TypeError);
  assert.throws(() => shouldBigInt("42"), TypeError);
  assert.throws(() => shouldBigInt(true), TypeError);
  assert.throws(() => shouldBigInt(null), TypeError);
  assert.throws(() => shouldBigInt(undefined), TypeError);
});
