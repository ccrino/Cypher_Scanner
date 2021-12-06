export type OnChange<T> = (value: T) => void;
export type OnListChange<T> = (id: number, item: T) => void;
export type OnListSubChange<T> = <K extends keyof T>(
   id: number,
   key: K,
   value: T[K],
) => void;

/** @description all keys of T that do not match P */
export type KeysOfExcept<T, P> = {
   [K in keyof T]: K extends P ? never : K;
}[keyof T];

/** @description all keys of T that match P */
export type KeysOfMatch<T, P> = {
   [K in keyof T]: K extends P ? K : never;
}[keyof T];

/** @description a nullable object form of T */
export type ConstructableObjectOf<T> = {
   [K in keyof T]?: T[K];
};

/** @description return a union type of the array children of T */
export type ArrayPropertiesOf<T> = NonNullable<
   {
      [K in keyof T]: T[K] extends Array<any>
         ? NonNullable<T[K]>
         : never;
   }[keyof T]
>;
