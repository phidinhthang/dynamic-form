export function createAsyncAction<ActionType extends string>(type: ActionType) {
  return <
    RequestParams extends unknown,
    SuccessRes extends unknown,
    FailureRes extends unknown
  >() => ({
    request: (params: RequestParams) => ({
      type: `${type}_REQUEST` as const,
      payload: params,
    }),
    success: (res: SuccessRes) => ({
      type: `${type}_SUCCESS` as const,
      payload: res,
    }),
    failure: (res: FailureRes) => ({
      type: `${type}_FAILURE` as const,
      payload: res,
    }),
  });
}
