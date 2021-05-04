const phi = (n: number) => {
  let num = n;
  let result = n;
  let step = `${n}`;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      step += ` . (1 - 1/${i})`;

      while (num % i === 0) {
        num /= i;
      }
      result -= result / i;
    }
  }
  if (num > 1) {
    result -= result / num;
  }
  return `ϕ(${n}) = ${step} = ${result}`;
};

export { phi };
