export const wrapArr = <T>(arr: T[]) => {
  const remove = (cb: (item: T, index: number, arr: T[]) => boolean) => {
    const matchedIndex = arr.findIndex(cb);
    if (matchedIndex !== -1) {
      arr.splice(matchedIndex, 1);
    }
  };

  return {
    remove,
  };
};
