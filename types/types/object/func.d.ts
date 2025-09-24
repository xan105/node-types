export function isFunction(value: unknown): boolean;
export function asFunction(value: unknown): Function | null;
export function shouldFunction(value: unknown): Function;
export function isPromise(value: unknown): boolean;
export function asPromise(value: unknown): Promise<unknown> | null;
export function shouldPromise(value: unknown): Promise<unknown>;
export function isGenerator(value: unknown): boolean;
export function asGenerator(value: unknown): unknown;
export function shouldGenerator(value: unknown): unknown;
