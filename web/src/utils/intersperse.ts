export const intersperse = <T>(arr: T[], el: T) => {
  const res = [];
  let i = 0;
  if (i < arr.length) res.push(arr[i++]);
  while (i < arr.length) res.push(el, arr[i++]);
  return res;
};
