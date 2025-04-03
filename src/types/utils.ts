/* eslint-disable @typescript-eslint/no-explicit-any */
export type FunctionKeys<Object> = {
  [Key in keyof Object]: Object[Key] extends (...args: any[]) => any
    ? Key
    : never;
}[keyof Object];
