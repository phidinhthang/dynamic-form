export const pushOne = <T extends Record<string, unknown>>(
  arr: T[],
  matchObj: Partial<{ [K in keyof T]: T[K] }>,
  item: T
) => {
  for (let i = 0; i < arr.length; i++) {
    let existedIndex: number | undefined = i;
    Object.entries(matchObj).forEach(([matchKey, matchValue]) => {
      if (matchObj[matchKey] !== item[matchKey]) {
        existedIndex = undefined;
      }
    });

    if (typeof existedIndex === 'number') {
      arr.splice(existedIndex, 1);
    }
  }
  arr.push(item);
};
