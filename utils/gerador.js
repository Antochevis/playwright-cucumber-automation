const nomes = [
  'Ana Silva', 'Bruno Santos', 'Carla Oliveira', 'Daniel Costa', 'Eduardo Lima',
  'Fernanda Souza', 'Gabriel Alves', 'Helena Rodrigues', 'Igor Fernandes', 'Julia Martins',
  'Lucas Pereira', 'Mariana Carvalho', 'Nicolas Barbosa', 'Patricia Gomes', 'Rafael Ribeiro',
  'Sofia Dias', 'Thiago Araujo', 'Vanessa Castro', 'William Rocha', 'Yasmin Cardoso'
];

const razoesSociais = [
  'Farmácia Popular Ltda', 'Drogaria São José S.A.', 'Farmácia Central Ltda',
  'Prefeitura Municipal de Jiripue', 'Prefeitura de Campo Verde', 'Município de Serra Alta',
  'Farmácia da Praça Ltda', 'Drogaria Boa Saúde S.A.', 'Farmácia Nova Esperança Ltda',
  'Prefeitura de Vale do Sol', 'Município de Bela Vista', 'Prefeitura Municipal de Rio Claro'
];

const nomeFantasias = [
  'Farmácia do João', 'Drogaria Santa Clara', 'Farmácia Bem Estar', 'Farmácia Popular',
  'Prefeitura Jiripue', 'Prefeitura Campo Verde', 'Município Serra Alta', 'Prefeitura Vale do Sol',
  'Drogaria Central', 'Farmácia Nova Vida', 'Município Bela Vista', 'Prefeitura Rio Claro'
];

function gerarNome() {
  return nomes[Math.floor(Math.random() * nomes.length)];
}

function gerarEmail(prefixo = 'teste') {
  const domain = process.env.EMAIL_DOMAIN || 'exemplo.com.br';
  return `${prefixo}+${Date.now()}@${domain}`;
}

function gerarCNPJ() {
  const randomDigits = () => Math.floor(Math.random() * 9);
  
  let cnpj = '';
  for (let i = 0; i < 12; i++) {
    cnpj += randomDigits();
  }
  
  const calcDigit = (cnpj, peso) => {
    let sum = 0;
    for (let i = 0; i < peso.length; i++) {
      sum += parseInt(cnpj[i]) * peso[i];
    }
    const resto = sum % 11;
    return resto < 2 ? 0 : 11 - resto;
  };
  
  const peso1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const digit1 = calcDigit(cnpj, peso1);
  cnpj += digit1;
  
  const peso2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const digit2 = calcDigit(cnpj, peso2);
  cnpj += digit2;
  
  return cnpj;
}

function gerarRazaoSocial() {
  return razoesSociais[Math.floor(Math.random() * razoesSociais.length)];
}

function gerarNomeFantasia() {
  return nomeFantasias[Math.floor(Math.random() * nomeFantasias.length)];
}

function gerarTelefone() {
  const ddd = Math.floor(Math.random() * 90) + 10;
  const isMovel = Math.random() < 0.5;
  if (isMovel) {
    const movel = Math.floor(Math.random() * 90000000) + 10000000;
    return `${ddd}9${movel}`;
  } else {
    const fixo = Math.floor(Math.random() * 90000000) + 10000000;
    return `${ddd}${fixo}`;
  }
}

function gerarCEP() {
  const cepsValidos = [
    '01310100', '04543907', '20040020', '30130100', '40010000',
    '50010000', '60010000', '70040902', '80010000', '90010000',
    '13010111', '88010000', '69005001', '66010010', '49010390',
    '58010000', '78010000', '79002001', '57020000', '64000100'
  ];
  
  return cepsValidos[Math.floor(Math.random() * cepsValidos.length)];
}

function gerarCodigo() {
  return Math.floor(Math.random() * 900000) + 100000;
}

function gerarIE() {
  return Math.floor(Math.random() * 9000000000) + 1000000000;
}

function gerarValorCredito() {
  return Math.floor(Math.random() * 901) + 100;
}

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

function formatarCPF(cpfDigits) {
  return cpfDigits.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

function gerarTipoEmpresa() {
  const tipos = ['Empresa', 'Rodoviária'];
  return tipos[Math.floor(Math.random() * tipos.length)];
}

function gerarTipoChavePix() {
  const tipos = ['Celular', 'CNPJ', 'E-mail', 'Aleatória'];
  return tipos[Math.floor(Math.random() * tipos.length)];
}

function gerarChavePix() {
  const tipos = ['11999999999', '12345678000190', 'teste@email.com', Math.random().toString(36).substring(7)];
  return tipos[Math.floor(Math.random() * tipos.length)];
}

function gerarTipoBalanceador() {
  const tipos = ['Rodosoft', 'Independente'];
  return tipos[Math.floor(Math.random() * tipos.length)];
}

function gerarPermissoesPorPerfil(perfil) {
  const permissoes = {
    integrador: ['Empresas', 'Usuários', 'Painel', 'Dashboard'],
    proprietario: ['Empresas', 'Usuários', 'Cartões', 'Saldos', 'Pedidos', 'Painel'],
    cliente: ['Usuários', 'Cartões', 'Saldos', 'Pedidos']
  };
  
  return permissoes[perfil.toLowerCase()] || permissoes.proprietario;
}

module.exports = {
  gerarNome,
  gerarEmail,
  gerarCNPJ,
  gerarRazaoSocial,
  gerarNomeFantasia,
  gerarTelefone,
  gerarCEP,
  gerarCodigo,
  gerarIE,
  gerarValorCredito,
  gerarCpf,
  formatarCPF,
  gerarTipoEmpresa,
  gerarTipoChavePix,
  gerarChavePix,
  gerarTipoBalanceador,
  gerarPermissoesPorPerfil
};
