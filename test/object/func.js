import test from "node:test";
import assert from "node:assert/strict";
import { 
  isFunction, asFunction, shouldFunction,
  isPromise, asPromise, shouldPromise,
  isGenerator, asGenerator, shouldGenerator
} from "../../lib/index.js";

test("isFunction()", () => {
  assert.ok(isFunction(function() {}));
  assert.ok(isFunction(() => {}));
  assert.ok(isFunction(async function() {}));
  assert.ok(!isFunction(null));
  assert.ok(!isFunction({}));
  assert.ok(!isFunction(42));
});

test("asFunction()", () => {
  const fn = () => {};
  assert.equal(asFunction(fn), fn);
  assert.equal(asFunction(42), null);
  assert.equal(asFunction(null), null);
  assert.equal(asFunction({}), null);
});

test("shouldFunction()", () => {
  const fn = () => {};
  assert.equal(shouldFunction(fn), fn);
  assert.throws(() => shouldFunction(42), TypeError);
  assert.throws(() => shouldFunction(null), TypeError);
  assert.throws(() => shouldFunction({}), TypeError);
});

test("isPromise()", () => {
  const p = new Promise(resolve => resolve(1));
  const thenable = { then: () => {} };
  assert.ok(isPromise(p));
  assert.ok(!isPromise(thenable)); // Only objects tagged as Promise
  assert.ok(!isPromise({}));
  assert.ok(!isPromise(null));
});

test("asPromise()", () => {
  const p = new Promise(resolve => resolve(1));
  assert.equal(asPromise(p), p);
  assert.equal(asPromise({ then: () => {} }), null);
  assert.equal(asPromise(null), null);
});

test("shouldPromise()", () => {
  const p = new Promise(resolve => resolve(1));
  assert.equal(shouldPromise(p), p);
  assert.throws(() => shouldPromise({ then: () => {} }), TypeError);
  assert.throws(() => shouldPromise(null), TypeError);
});

test("isGenerator()", () => {
  function* genFn() { yield 1; }
  async function* asyncGenFn() { yield 1; }
  const gen = genFn();
  const asyncGen = asyncGenFn();

  assert.ok(isGenerator(genFn));
  assert.ok(isGenerator(asyncGenFn));
  assert.ok(!isGenerator(function() {}));
  assert.ok(!isGenerator(() => {}));
  assert.ok(!isGenerator(gen));       // instance, not function
  assert.ok(!isGenerator(asyncGen));  // instance, not function
});

test("asGenerator()", () => {
  function* genFn() { yield 1; }
  async function* asyncGenFn() { yield 1; }

  assert.equal(asGenerator(genFn), genFn);
  assert.equal(asGenerator(asyncGenFn), asyncGenFn);
  assert.equal(asGenerator(() => {}), null);
  assert.equal(asGenerator(null), null);
});

test("shouldGenerator()", () => {
  function* genFn() { yield 1; }
  async function* asyncGenFn() { yield 1; }

  assert.equal(shouldGenerator(genFn), genFn);
  assert.equal(shouldGenerator(asyncGenFn), asyncGenFn);
  assert.throws(() => shouldGenerator(() => {}), TypeError);
  assert.throws(() => shouldGenerator(null), TypeError);
});
