export type TMutable<T> = {
  -readonly [P in keyof T]?: T[P];
};

export type TOfConstructor<T> = Omit<
  TMutable<T>,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
