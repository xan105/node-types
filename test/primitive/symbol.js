import test from "node:test";
import assert from "node:assert/strict";
import { isSymbol, asSymbol, shouldSymbol } from "../../lib/index.js";

test("isSymbol()", () => {
  assert.ok(isSymbol(Symbol()));
  assert.ok(isSymbol(Symbol("desc")));
  assert.ok(!isSymbol("foo"));
  assert.ok(!isSymbol(42));
  assert.ok(!isSymbol(null));
  assert.ok(!isSymbol(undefined));
  assert.ok(!isSymbol(true));
});

test("asSymbol()", () => {
  const sym1 = Symbol();
  const sym2 = Symbol("desc");

  assert.equal(asSymbol(sym1), sym1);
  assert.equal(asSymbol(sym2), sym2);

  // invalid inputs → null
  assert.equal(asSymbol("foo"), null);
  assert.equal(asSymbol(42), null);
  assert.equal(asSymbol(true), null);
  assert.equal(asSymbol(null), null);
  assert.equal(asSymbol(undefined), null);
});

test("shouldSymbol()", () => {
  const sym1 = Symbol();
  const sym2 = Symbol("desc");

  assert.equal(shouldSymbol(sym1), sym1);
  assert.equal(shouldSymbol(sym2), sym2);

  // invalid inputs → throw
  assert.throws(() => shouldSymbol("foo"), TypeError);
  assert.throws(() => shouldSymbol(42), TypeError);
  assert.throws(() => shouldSymbol(true), TypeError);
  assert.throws(() => shouldSymbol(null), TypeError);
  assert.throws(() => shouldSymbol(undefined), TypeError);
});
