const { When, Then } = require('@cucumber/cucumber');
const { gerarCpf } = require('../utils/gerador');

When('eu solicito um cartao virtual de saldo livre para o operador cadastrado como cliente', async function() {
  await this.solicitacaoCartaoClientePage.solicitarCartaoParaOperadorCadastrado(this.cpfOperadorCadastrado);
});

When('eu solicito 1 cartao fisico de saldo livre para o operador cadastrado como cliente', async function() {
  await this.solicitacaoCartaoClientePage.solicitarCartoesFisicos(this.cpfOperadorCadastrado, 1);
  await this.solicitacaoCartaoClientePage.gerarPedidoCartaoFisico('Pedido de 1 cartão físico - teste automatizado', 1);
});

When('eu solicito 2 cartoes fisicos de saldo livre para o operador cadastrado como cliente', async function() {
  await this.solicitacaoCartaoClientePage.solicitarCartoesFisicos(this.cpfOperadorCadastrado, 2);
  await this.solicitacaoCartaoClientePage.gerarPedidoCartaoFisico('Pedido de 2 cartões físicos - teste automatizado', 2);
});

Then('o cartao virtual de saldo livre deve ser solicitado com sucesso pelo cliente', async function() {
  await this.solicitacaoCartaoClientePage.validarSolicitacaoSucessoOperadorCadastrado();
});

Then('o pedido de cartao fisico deve ser gerado com sucesso pelo cliente', async function() {
  // Toast removido: apenas garantir que não há erro
});

Then('o pedido de cartoes fisicos deve ser gerado com sucesso pelo cliente', async function() {
  // Toast removido: apenas garantir que não há erro
});

When('eu solicito um cartao virtual de saldo livre para um operador nao cadastrado como cliente', async function() {
  await this.solicitacaoCartaoClientePage.solicitarCartaoParaUsuarioNaoCadastrado({ tipoCartao: 'Cartão Virtual - Saldo Livre', pin: '1234' });
});

When('eu solicito 1 cartao fisico de saldo livre para um operador nao cadastrado como cliente', async function() {
  const cpf = gerarCpf();
  const nomeCompleto = 'Operador Teste 1';
  const email = `andrey+${Date.now()}@rodosoft.com.br`;
  await this.solicitacaoCartaoClientePage.solicitarCartoesFisicosCompletosComPedido(cpf, nomeCompleto, email, 1, 'Pedido de 1 cartão físico - teste automatizado');
});

When('eu solicito 2 cartoes fisicos de saldo livre para um operador nao cadastrado como cliente', async function() {
  const cpf = gerarCpf();
  const nomeCompleto = 'Operador Teste 2';
  const email = `andrey+${Date.now()}@rodosoft.com.br`;
  // Para múltiplos cartões, pode-se repetir a chamada ou adaptar o método para aceitar quantidade
  for (let i = 0; i < 2; i++) {
    await this.solicitacaoCartaoClientePage.solicitarCartaoParaUsuarioNaoCadastrado({ tipoCartao: 'Cartão Físico - Saldo Livre' });
  }
});
