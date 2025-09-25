About
=====

Type checking and asserting at runtime.

This is an isomorphic JavaScript Library, it should run on any modern JavaScript runtime.

📦 Scoped @xan105 packages are for my own personal use but feel free to use them.

Example
=======

### Type checking

```js
import { isString } from "@xan105/types";

isString("foo") //true
```

Using _"type string"_:

```js
import { is } from "@xan105/types";

is("string[]", ["foo", "bar"]); //true
is("function*", function*()=>{ yield "a" }); //true
```

### Assertion

> Return the given value when the condition is true otherwise throw a Type Error.

```js
import { shouldString } from "@xan105/types";
const foo = shouldString("bar");
```

or

```js
import { should } from "@xan105/types";
const foo = should("string", "bar");
```

### Coerce value

> Return the given value when the condition is true otherwise null.

```js
import { asString } from "@xan105/types";

function foo(option = {}){
  const options = {
    bar: asString(option.bar) ?? "default value"
  }
}
```

or

```js
import { as } from "@xan105/types";

function foo(option = {}){
  const options = {
    bar: as("string", option.bar) ?? "default value"
  }
}
```

Install
=======

```
npm install @xan105/types
```

## 🌐 Web

💡 The bundled library and its minified version can be found in the `./dist` folder.

### Via importmap

  Create an importmap and add it to your html:

  ```html
    <script type="importmap">
    {
      "imports": {
        "@xan105/types": "./path/to/node_modules/@xan105/types/dist/types.min.js"
      }
    }
    </script>
    <script type="module">
      import { isString } from "@xan105/types"
    </script>
    </body>
  </html>
  ```

API
===

⚠️ This module is only available as an ECMAScript module (ESM).

## Named export

### - "Type string" matching

#### `is(typeString: string, value: unknown): boolean`
#### `as(typeString: string, value: unknown): unknown|null`
#### `should(typeString: string, value: unknown): unknown`

<details><summary>List of supported "type string":</summary>

- `string`
- `str`
- `boolean`
- `bool`
- `number`
- `nbr`
- `integer`
- `int`
- `bigint`
- `object`
- `obj`
- `symbol` 
- `function`
- `func`
- `fn`
- `promise`
- `function*`
- `func*`
- `fn*`
- `regexp`
- `regexr`
- `regex`
- `error`
- `err`
- `buffer`
- `uint8Array`
- `set`
- `map`
- `array`
- `arr`

You can add the suffix `[]` for an array, and add a number for fixed length array.

Example:

```js
is("string[2]", ["foo", "bar"]); //true
```

</details>

### - Primitive

#### `isBigInt(value: unknown): boolean`
#### `asBigInt(value: unknown): bigint|null`
#### `shouldBigInt(value: unknown): bigint`

#### `isBoolean(value: unknown): boolean`
#### `asBoolean(value: unknown): boolean|null`
#### `shouldBoolean(value: unknown): boolean`

#### `isNull(value: unknown): boolean`
#### `shouldNull(value: unknown): null`
#### `isUndefined(value: unknown): boolean`
  alias: isVoid()
#### `shouldUndefined(value: unknown): undefined`
  alias: shouldVoid()
#### `isNullish(value: unknown): boolean`
#### `shouldNullish(value: unknown): null|undefined`
  "Nullish": null or undefined

#### `isNumber(value: unknown): boolean`
#### `asNumber(value: unknown): number|null`
#### `shouldNumber(value: unknown): number`
#### `isInt(value: unknown): boolean`
#### `asInt(value: unknown): number|null`
#### `shouldInt(value: unknown): number`

#### `isString(value: unknown): boolean`
#### `asString(value: unknown): string|null`
#### `shouldString(value: unknown): string`

#### `isSymbol(value: unknown): boolean`
#### `asSymbol(value: unknown): symbol|null`
#### `shouldSymbol(value: unknown): symbol`

### - Object

#### `isArray(value: unknown): boolean`
#### `asArray(value: unknown): unknown[]|null`
#### `shouldArray(value: unknown): unknown[]`
#### `isSet(value: unknown): boolean`
#### `asSet(value: unknown): Set|null`
#### `shouldSet(value: unknown): Set`

#### `isBuffer(value: unknown): boolean`
#### `asBuffer(value: unknown): Uint8Array|null`
#### `shouldBuffer(value: unknown): Uint8Array`

#### `isFunction(value: unknown): boolean`
#### `asFunction(value: unknown): function|null`
#### `shouldFunction(value: unknown): function`
#### `isPromise(value: unknown): boolean`
#### `asPromise(value: unknown): Promise<unknown>|null`
#### `shouldPromise(value: unknown): Promise<unknown>`
#### `isGenerator(value: unknown): boolean`
#### `asGenerator(value: unknown): function*|null`
#### `shouldGenerator(value: unknown): function*`

#### `isPlainObject(value: unknown): boolean`
  alias: isObject()
#### `asPlainObject(value: unknown): object|null`
  alias: asObject()
#### `shouldPlainObject(value: unknown): object`
  alias: shouldObject()
#### `isError(value: unknown): boolean`
#### `asError(value: unknown): Error|null` 
#### `shouldError(value: unknown): Error` 
#### `isRegExp(value: unknown): boolean`
#### `asRegExp(value: unknown): RegExp|null`
#### `shouldRegExp(value: unknown): RegExp`
#### `isMap(value: unknown): boolean`
#### `asMap(value: unknown): Map|null`
#### `shouldMap(value: unknown): Map`

### - Extended

#### `isArrayOf(fn: function, values: unknown[], option?: { args?: unknown[], length?: number } | unknown[]): boolean`
#### `asArrayOf(fn: function, values: unknown[], option?: { args?: unknown[], length?: number } | unknown[]): unknown[]|null`
#### `shouldArrayOf(fn: function, values: unknown[], option?: { args?: unknown[], length?: number } | unknown[]): unknown[]`

#### `isBigIntWithinRange(value: unknown, min: bigint, max: bigint): boolean`
#### `asBigIntWithinRange(value: unknown, min: bigint, max: bigint): bigint|null`
#### `shouldBigIntWithinRange(value: unknown, min: bigint, max: bigint): bigint`
#### `isBigUint(value: unknown): boolean`
#### `asBigUint(value: unknown): bigint|null`
#### `shouldBigUint(value: unknown): bigint`

#### `isNumberWithinRange(value: unknown, min: number, max: number): boolean`
#### `asNumberWithinRange(value: unknown, min: number, max: number): number|null`
#### `shouldNumberWithinRange(value: unknown, min: number, max: number): number`
#### `isIntWithinRange(value: unknown, min: number, max: number): boolean`
#### `asIntWithinRange(value: unknown, min: number, max: number): number|null`
#### `shouldIntWithinRange(value: unknown, min: number, max: number): number`
#### `isUint(value: unknown): boolean`
#### `asUint(value: unknown): number|null`
#### `shouldUint(value: unknown): number`

#### `isStringLike(value: unknown, pattern: string | RegExp): boolean`
#### `asStringLike(value: unknown, pattern: string | RegExp): string|null`
#### `shouldStringLike(value: unknown, pattern: string | RegExp): string`
#### `isNonEmptyString(value: unknown): boolean`
#### `asNonEmptyString(value: unknown): string|null`
#### `shouldNonEmptyString(value: unknown): string`

### - Util

#### `enumFrom(values: { key: string, value: number, ... }): object`

Creates a frozen, _bidirectional_ numeric enum object, similar to TypeScript's `enum`.

Example:

```js
const Colors = enumFrom({
  RED: 1,
  GREEN: 2,
  BLUE: 3
});

// Both directions

console.log(Colors.GREEN);  // 2
console.log(Colors[2]);     // "GREEN"

// Immutable
Colors.GREEN = 99; // ❌ TypeError: Cannot assign to read only property
```
