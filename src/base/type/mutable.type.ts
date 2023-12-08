export type MutableType<T> = {
  -readonly [P in keyof T]?: T[P];
};

export type OfMutableType<T> = Omit<MutableType<T>, 'id'>;
