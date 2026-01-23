const nomes = [
  'Ana Silva', 'Bruno Santos', 'Carla Oliveira', 'Daniel Costa', 'Eduardo Lima',
  'Fernanda Souza', 'Gabriel Alves', 'Helena Rodrigues', 'Igor Fernandes', 'Julia Martins',
  'Lucas Pereira', 'Mariana Carvalho', 'Nicolas Barbosa', 'Patricia Gomes', 'Rafael Ribeiro',
  'Sofia Dias', 'Thiago Araujo', 'Vanessa Castro', 'William Rocha', 'Yasmin Cardoso'
];

function gerarNome() {
  return nomes[Math.floor(Math.random() * nomes.length)];
}

function gerarEmail(prefixo = 'teste') {
  const domain = process.env.EMAIL_DOMAIN || 'exemplo.com.br';
  return `${prefixo}+${Date.now()}@${domain}`;
}

module.exports = { gerarNome, gerarEmail };
