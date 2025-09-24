import test from "node:test";
import assert from "node:assert/strict";
import { 
  isStringLike, asStringLike, shouldStringLike, 
  isNonEmptyString, asNonEmptyString, shouldNonEmptyString 
} from "../../lib/index.js";

test("isNonEmptyString()", () => {
  assert.ok(isNonEmptyString("foo"));
  assert.ok(isNonEmptyString(" ")); // whitespace counts as non-empty
  assert.ok(!isNonEmptyString(""));
  assert.ok(!isNonEmptyString(null));
  assert.ok(!isNonEmptyString(undefined));
  assert.ok(!isNonEmptyString(42));
});

test("asNonEmptyString()", () => {
  assert.equal(asNonEmptyString("foo"), "foo");
  assert.equal(asNonEmptyString(" "), " ");
  assert.equal(asNonEmptyString(""), null);
  assert.equal(asNonEmptyString(null), null);
  assert.equal(asNonEmptyString(undefined), null);
  assert.equal(asNonEmptyString(42), null);
});

test("shouldNonEmptyString()", () => {
  assert.equal(shouldNonEmptyString("foo"), "foo");
  assert.equal(shouldNonEmptyString(" "), " ");
  assert.throws(() => shouldNonEmptyString(""), TypeError);
  assert.throws(() => shouldNonEmptyString(null), TypeError);
  assert.throws(() => shouldNonEmptyString(undefined), TypeError);
  assert.throws(() => shouldNonEmptyString(42), TypeError);
});

test("isStringLike()", () => {
  // Hex pattern
  assert.ok(isStringLike("abcdef", "hex"));
  assert.ok(isStringLike("ABCDEF", "hex"));
  assert.ok(!isStringLike("abcxyz", "hex"));
  assert.ok(!isStringLike("", "hex"));

  // SRI pattern
  const validSRI = "sha256-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOpqrs=";
  assert.ok(isStringLike(validSRI, "SRI"));
  assert.ok(!isStringLike("sha512-invalid", "SRI"));

  // Custom RegExp
  const pattern = /^[0-9]+$/;
  assert.ok(isStringLike("12345", pattern));
  assert.ok(!isStringLike("123abc", pattern));

  // Non-string input
  assert.ok(!isStringLike(12345, pattern));
  assert.ok(!isStringLike(null, pattern));
});

test("asStringLike()", () => {
  const pattern = /^[0-9]+$/;
  assert.equal(asStringLike("123", pattern), "123");
  assert.equal(asStringLike("abc", pattern), null);
});

test("shouldStringLike()", () => {
  const pattern = /^[0-9]+$/;
  assert.equal(shouldStringLike("123", pattern), "123");
  assert.throws(() => shouldStringLike("abc", pattern), TypeError);
});
