import test from "node:test";
import assert from "node:assert/strict";
import { 
  isPlainObject, asPlainObject, shouldPlainObject,
  isObject, asObject, shouldObject,
  isError, asError, shouldError,
  isRegExp, asRegExp, shouldRegExp,
  isMap, asMap, shouldMap
} from "../../lib/index.js";

test("isPlainObject()", () => {
  assert.ok(isPlainObject({}));
  assert.ok(isPlainObject(Object.create(null)));
  assert.ok(isPlainObject(JSON.parse('{"foo": "bar"}')));
  assert.ok(isPlainObject(new Object()));
  assert.ok(!isPlainObject(null));
  assert.ok(!isPlainObject([]));
  assert.ok(!isPlainObject(() => {}));
});

test("asPlainObject()", () => {
  const obj = {};
  const nullObj = Object.create(null);
  assert.equal(asPlainObject(obj), obj);
  assert.equal(asPlainObject(nullObj), nullObj);
  assert.equal(asPlainObject([]), null);
  assert.equal(asPlainObject(null), null);
});

test("shouldPlainObject()", () => {
  const obj = {};
  const nullObj = Object.create(null);
  assert.equal(shouldPlainObject(obj), obj);
  assert.equal(shouldPlainObject(nullObj), nullObj);
  assert.throws(() => shouldPlainObject([]), TypeError);
  assert.throws(() => shouldPlainObject(null), TypeError);
});

test("Object alias", () => {
  const obj = {};
  assert.ok(isObject(obj));
  assert.equal(asObject(obj), obj);
  assert.equal(shouldObject(obj), obj);
});

test("isError()", () => {
  const err = new Error("fail");
  assert.ok(isError(err));
  assert.ok(isError(TypeError("fail")));
  assert.ok(!isError({}));
  assert.ok(!isError(null));
});

test("asError()", () => {
  const err = new Error("fail");
  assert.equal(asError(err), err);
  assert.equal(asError({}), null);
});

test("shouldError()", () => {
  const err = new Error("fail");
  assert.equal(shouldError(err), err);
  assert.throws(() => shouldError({}), TypeError);
});

test("isRegExp()", () => {
  assert.ok(isRegExp(/abc/));
  assert.ok(isRegExp(new RegExp("abc")));
  assert.ok(!isRegExp("abc"));
  assert.ok(!isRegExp(null));
});

test("asRegExp()", () => {
  const regex = /abc/;
  assert.equal(asRegExp(regex), regex);
  assert.equal(asRegExp("abc"), null);
});

test("shouldRegExp()", () => {
  const regex = /abc/;
  assert.equal(shouldRegExp(regex), regex);
  assert.throws(() => shouldRegExp("abc"), TypeError);
});

test("isMap()", () => {
  const map = new Map();
  assert.ok(isMap(map));
  assert.ok(!isMap({}));
  assert.ok(!isMap([]));
  assert.ok(!isMap(null));
});

test("asMap()", () => {
  const map = new Map();
  assert.equal(asMap(map), map);
  assert.equal(asMap({}), null);
});

test("shouldMap()", () => {
  const map = new Map();
  assert.equal(shouldMap(map), map);
  assert.throws(() => shouldMap({}), TypeError);
});
