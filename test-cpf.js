const { gerarCPF } = require('./utils/gerador.js');

// Função para validar CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  
  if (cpf.length !== 11) {
    return false;
  }
  
  // Validar dígito 1
  let sum = 0;
  let peso = 10;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * peso;
    peso--;
  }
  let resto = sum % 11;
  let digit1 = resto < 2 ? 0 : 11 - resto;
  
  if (parseInt(cpf[9]) !== digit1) {
    console.log(`Dígito 1 inválido: esperado ${digit1}, recebido ${cpf[9]}`);
    return false;
  }
  
  // Validar dígito 2
  sum = 0;
  peso = 11;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * peso;
    peso--;
  }
  resto = sum % 11;
  let digit2 = resto < 2 ? 0 : 11 - resto;
  
  if (parseInt(cpf[10]) !== digit2) {
    console.log(`Dígito 2 inválido: esperado ${digit2}, recebido ${cpf[10]}`);
    return false;
  }
  
  return true;
}

// Testar 10 CPFs
console.log('Testando 10 CPFs gerados...\n');
for (let i = 0; i < 10; i++) {
  const cpf = gerarCPF();
  const valido = validarCPF(cpf);
  console.log(`CPF ${i + 1}: ${cpf} - ${valido ? '✓ VÁLIDO' : '✗ INVÁLIDO'}`);
}
