export const remove = <T>(
  arr: T[],
  cb: (item: T, index: number, arr: T[]) => boolean
) => {
  const matchedIndex = arr.findIndex(cb);
  if (matchedIndex !== -1) {
    arr.splice(matchedIndex, 1);
  }
};
