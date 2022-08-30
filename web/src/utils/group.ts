export const group = <T>(array: T[], getGroupId: (item: T) => string) => {
  return array.reduce((acc, item) => {
    const groupId = getGroupId(item);
    const groupList = acc[groupId] ?? [];
    return { ...acc, [groupId]: [...groupList, item] };
  }, {} as Record<string, T[]>);
};
