import test from "node:test";
import assert from "node:assert/strict";
import { 
  isNumber, asNumber, shouldNumber, 
  isInt, asInt, shouldInt 
} from "../../lib/index.js";

test("isNumber()", () => {
  assert.ok(isNumber(42));
  assert.ok(isNumber(0));
  assert.ok(isNumber(-1.5));
  assert.ok(isNumber(Number(1)));
  assert.ok(isNumber(NaN));  // typeof NaN === "number"
  assert.ok(!isNumber("42"));
  assert.ok(!isNumber(null));
  assert.ok(!isNumber(undefined));
  assert.ok(!isNumber(true));
  assert.ok(!isNumber(new Number(1)));
});

test("asNumber()", () => {
  assert.equal(asNumber(42), 42);
  assert.equal(asNumber(0), 0);
  assert.equal(asNumber(-1.5), -1.5);
  assert.equal(asNumber(NaN), NaN);
  assert.equal(asNumber(Number(1)), 1);

  // invalid inputs → null
  assert.equal(asNumber(new Number(1)), null);
  assert.equal(asNumber("42"), null);
  assert.equal(asNumber(null), null);
  assert.equal(asNumber(undefined), null);
  assert.equal(asNumber(true), null);
});

test("shouldNumber()", () => {
  assert.equal(shouldNumber(42), 42);
  assert.equal(shouldNumber(0), 0);
  assert.equal(shouldNumber(-1.5), -1.5);
  assert.equal(shouldNumber(NaN), NaN);
  assert.equal(shouldNumber(Number(1)), 1);

  // invalid inputs → throw
  assert.throws(() => shouldNumber(new Number(1)), SyntaxError);
  assert.throws(() => shouldNumber("42"), TypeError);
  assert.throws(() => shouldNumber(null), TypeError);
  assert.throws(() => shouldNumber(undefined), TypeError);
  assert.throws(() => shouldNumber(true), TypeError);
});

test("isInt()", () => {
  assert.ok(isInt(0));
  assert.ok(isInt(42));
  assert.ok(isInt(-100));
  assert.ok(!isInt(1.5));
  assert.ok(!isInt(NaN));
  assert.ok(!isInt("42"));
  assert.ok(!isInt(null));
  assert.ok(!isInt(undefined));
});

test("asInt()", () => {
  assert.equal(asInt(0), 0);
  assert.equal(asInt(42), 42);
  assert.equal(asInt(-100), -100);

  // invalid inputs → null
  assert.equal(asInt(1.5), null);
  assert.equal(asInt(NaN), null);
  assert.equal(asInt("42"), null);
  assert.equal(asInt(null), null);
  assert.equal(asInt(undefined), null);
});

test("shouldInt()", () => {
  assert.equal(shouldInt(0), 0);
  assert.equal(shouldInt(42), 42);
  assert.equal(shouldInt(-100), -100);

  // invalid inputs → throw
  assert.throws(() => shouldInt(1.5), TypeError);
  assert.throws(() => shouldInt(NaN), TypeError);
  assert.throws(() => shouldInt("42"), TypeError);
  assert.throws(() => shouldInt(null), TypeError);
  assert.throws(() => shouldInt(undefined), TypeError);
});
