export const formatSignedNumber = (num: number): string => {
  return num > 0 ? `+${num.toLocaleString()}` : num.toLocaleString();
};

export const formatNumber = (value: string): string => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
