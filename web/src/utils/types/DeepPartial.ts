export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type C = {
  a: {
    b: {
      c: number;
    };
  };
};
