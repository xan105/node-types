export function isNull(value: unknown): boolean;
export function shouldNull(value: unknown): null;
export function isUndefined(value: unknown): boolean;
export function shouldUndefined(value: unknown): undefined;
export function isNullish(value: unknown): boolean;
export function shouldNullish(value: unknown): null|undefined;
export { isUndefined as isVoid, shouldUndefined as shouldVoid };
