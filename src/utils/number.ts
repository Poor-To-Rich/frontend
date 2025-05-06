export const formatSignedNumber = (num: number): string => {
  return num > 0 ? `+${num.toLocaleString()}` : num.toLocaleString();
};

export const formatNumber = (value: string | number): string => {
  console.log(value);
  if (typeof value === 'number') {
    value = BigInt(value).toString();
  }
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
