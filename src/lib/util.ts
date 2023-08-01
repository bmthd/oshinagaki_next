export const convertToNumber = (input: string): number | undefined => {
  const numberValue = Number(input);
  return Number.isInteger(numberValue) ? numberValue : undefined;
};
