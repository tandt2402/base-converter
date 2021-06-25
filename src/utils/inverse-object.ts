export const inverseObject = (
  object: Record<string, unknown>,
): Record<string, unknown> => {
  return Object.keys(object).reduce((reverseObject, key) => {
    const value = object[key] as string;
    reverseObject[value] = key;
    return reverseObject;
  }, {} as Record<string, unknown>);
};
