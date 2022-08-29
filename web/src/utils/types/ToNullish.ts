export type ToNullish<T> = T extends null | undefined
  ? undefined | null
  : T extends (infer U)[]
  ? ToNullish<U>[]
  : T extends Record<string, unknown>
  ? { [K in keyof T]: ToNullish<T[K]> }
  : T;
