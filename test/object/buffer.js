import test from "node:test";
import assert from "node:assert/strict";
import { isBuffer, asBuffer, shouldBuffer } from "../../lib/index.js";

test("isBuffer()", () => {
  const buffer = new Uint8Array([1, 2, 3]);
  assert.ok(isBuffer(buffer));
  
  // Node.js Buffer is a subclass of Uint8Array
  if (typeof Buffer !== "undefined") {
    const nodeBuffer = Buffer.from([1, 2, 3]);
    assert.ok(isBuffer(nodeBuffer));
  }

  assert.ok(!isBuffer([]));
  assert.ok(!isBuffer({}));
  assert.ok(!isBuffer(null));
  assert.ok(!isBuffer(undefined));
  assert.ok(!isBuffer("abc"));
});

test("asBuffer()", () => {
  const buffer = new Uint8Array([1, 2, 3]);
  assert.equal(asBuffer(buffer), buffer);

  if (typeof Buffer !== "undefined") {
    const nodeBuffer = Buffer.from([1, 2, 3]);
    assert.equal(asBuffer(nodeBuffer), nodeBuffer);
  }

  assert.equal(asBuffer([]), null);
  assert.equal(asBuffer({}), null);
  assert.equal(asBuffer(null), null);
  assert.equal(asBuffer(undefined), null);
  assert.equal(asBuffer("abc"), null);
});

test("shouldBuffer()", () => {
  const buffer = new Uint8Array([1, 2, 3]);
  assert.equal(shouldBuffer(buffer), buffer);

  if (typeof Buffer !== "undefined") {
    const nodeBuffer = Buffer.from([1, 2, 3]);
    assert.equal(shouldBuffer(nodeBuffer), nodeBuffer);
  }

  assert.throws(() => shouldBuffer([]), TypeError);
  assert.throws(() => shouldBuffer({}), TypeError);
  assert.throws(() => shouldBuffer(null), TypeError);
  assert.throws(() => shouldBuffer(undefined), TypeError);
  assert.throws(() => shouldBuffer("abc"), TypeError);
});
