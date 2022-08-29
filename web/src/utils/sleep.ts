export const sleep = async (ms: number = 1000) =>
  new Promise((res) => setTimeout(res, ms));
