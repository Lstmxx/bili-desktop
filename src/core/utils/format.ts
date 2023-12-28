export const padZero = (num: number) => {
  return num.toString().padStart(2, '0');
};

export const formatOverTenThousand = (num: number) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num;
};
