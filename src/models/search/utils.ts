/**
 * A TypeScript utility type which creates a union of an enum member and its string representation.
 *
 * @remarks
 * Allows interfaces to support both enums and strings.
 *
 * @public
 */
export type EnumOrString<T extends string> = T | `${T}`;
