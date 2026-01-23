function gerarCpf() {
  const n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

  const calcDigit = (digits, factorStart) => {
    const sum = digits.reduce((acc, num, idx) => acc + num * (factorStart - idx), 0);
    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  };

  const d1 = calcDigit(n, 10);
  const d2 = calcDigit([...n, d1], 11);

  return [...n, d1, d2].join('');
}

function formatCPF(cpfDigits) {
  return cpfDigits.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

module.exports = { gerarCpf, formatCPF };
