export const Prime = (n: number) => {
  if (n < 2) return false;
  let count = 0;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) count++;
  }
  if (count === 0) return true;
  else return false;
};
