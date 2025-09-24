export function isStringLike(value: unknown, pattern: string | RegExp): boolean;
export function asStringLike(value: unknown, pattern: string | RegExp): string | null;
export function shouldStringLike(value: unknown, pattern: string | RegExp): string;
export function isNonEmptyString(value: unknown): boolean;
export function asNonEmptyString(value: unknown): string | null;
export function shouldNonEmptyString(value: unknown): string;
