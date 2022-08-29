type Action<T extends string, P extends unknown> = {
  type: T;
  payload: P;
};

export const createAction = <
  T extends string,
  P extends unknown,
  Args extends unknown[]
>(
  actionType: T,
  fn: (
    actionCallback: <P>(payload: P) => Action<T, P>
  ) => (...args: Args) => Action<T, P>
): ((...args: Args) => { payload: P; type: T }) => {
  const actionCallback = <P>(payload: P) => {
    return { payload, type: actionType };
  };
  return fn(actionCallback);
};
