export const formatSignedNumber = (num: number): string => {
  return num > 0 ? `+${num.toLocaleString()}` : num.toLocaleString();
};
