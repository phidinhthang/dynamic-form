let dropId: string | undefined = undefined;

export const getDropId = () => {
  return dropId;
};

export const setDropId = (id: string) => {
  dropId = id;
};

export const clearDropId = () => {
  dropId = undefined;
};
