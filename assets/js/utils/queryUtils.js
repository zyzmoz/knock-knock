export const whereIn = (value, array) => {
  return array.some((v) => v === value);
};
export const whereManyIn = (value, array) => {
  return array.filter((v) => v === value);
};