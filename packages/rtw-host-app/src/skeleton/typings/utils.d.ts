/**
 * From `T`, `omit` a set of properties whose keys are in the union `K`.
 *
 * @example
 ```
 type Foo = {
     a: number;
     b: string;
 };
 type FooWithoutA = Omit<Foo, "a">; // { b: string }
 ```
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
