import test from "node:test";
import assert from "node:assert/strict";
import { enumFrom } from "../lib/index.js";

test("enumFrom() - basic two-way mapping", () => {
  const e = enumFrom({ A: 0, B: 1 });
  assert.equal(e.A, 0);
  assert.equal(e.B, 1);
  assert.equal(e[0], "A");
  assert.equal(e[1], "B");
});

test("enumFrom() - immutability", () => {
  const e = enumFrom({ A: 0, B: 1 });
  assert.throws(() => { e.C = 2 }, TypeError);
  assert.throws(() => { e[0] = "X" }, TypeError);
});

test("enumFrom() - input must be plain object", () => {
  assert.throws(() => enumFrom(null), TypeError);
  assert.throws(() => enumFrom([]), TypeError);
  assert.throws(() => enumFrom("string"), TypeError);
});

test("enumFrom() - values must be unsigned integers", () => {
  assert.throws(() => enumFrom({ A: -1 }), TypeError);
  assert.throws(() => enumFrom({ A: 1.5 }), TypeError);
  assert.throws(() => enumFrom({ A: "1" }), TypeError);
});

test("enumFrom() - __proto__ key is ignored", () => {
  const e = enumFrom({ __proto__: 0, X: 1 });
  assert.equal(e.X, 1);
  assert.equal(e[1], "X");
  assert.ok(!("__proto__" in e));
});

test("enumFrom() - empty input throws", () => {
  assert.throws(() => enumFrom({}), /Enum can not be empty/);
});

test("enumFrom() - non-colliding two-way mapping", () => {
  const e = enumFrom({ ZERO: 0, ONE: 1 });
  assert.equal(e.ZERO, 0);
  assert.equal(e.ONE, 1);
  assert.equal(e[0], "ZERO");
  assert.equal(e[1], "ONE");
});

test("enumFrom() - returned object is a plain object", () => {
  const e = enumFrom({ A: 0 });
  const proto = Object.getPrototypeOf(e);
  assert.equal(proto, null);
});
