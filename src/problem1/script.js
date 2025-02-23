
const sum_to_n_a = (n) => {
  let sum = 0;
  while (n > 0) {
      sum += n;
      n--;
  }
  return sum;
}

// Recursive
const sum_to_n_b = (n) => {
  if (n === 1) return 1;
  return n + sum_to_n_b(n - 1);
}

// Gauss' Formula
const sum_to_n_c = (n) => {
  return (n * (n + 1)) / 2;
}

const n = 5;
console.log(sum_to_n_a(n));
console.log(sum_to_n_b(n));
console.log(sum_to_n_c(n));