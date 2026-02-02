const { When, Then } = require('@cucumber/cucumber');
const { gerarCPF } = require('../utils/gerador');

When('eu solicito um cartao virtual de saldo livre para o operador cadastrado como cliente', async function() {
  await this.solicitacaoCartaoClientePage.solicitarCartao(this.cpfOperadorCadastrado);
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
  await this.solicitacaoCartaoClientePage.validarSolicitacaoSucesso();
});

Then('o pedido de cartao fisico deve ser gerado com sucesso pelo cliente', async function() {
  await this.solicitacaoCartaoClientePage.validarPedidoGeradoSucesso();
});

Then('o pedido de cartoes fisicos deve ser gerado com sucesso pelo cliente', async function() {
  await this.solicitacaoCartaoClientePage.validarPedidoGeradoSucesso();
});

When('eu solicito um cartao virtual de saldo livre para um operador nao cadastrado como cliente', async function() {
  await this.solicitacaoCartaoClientePage.solicitarCartaoParaUsuarioNaoCadastrado();
});

When('eu solicito 1 cartao fisico de saldo livre para um operador nao cadastrado como cliente', async function() {
  const cpf = gerarCPF();
  const nomeCompleto = 'Operador Teste 1';
  const email = `andrey+${Date.now()}@rodosoft.com.br`;
  await this.solicitacaoCartaoClientePage.solicitarCartoesFisicosCompletosComPedido(cpf, nomeCompleto, email, 1, 'Pedido de 1 cartão físico - teste automatizado');
});

When('eu solicito 2 cartoes fisicos de saldo livre para um operador nao cadastrado como cliente', async function() {
  const cpf = gerarCPF();
  const nomeCompleto = 'Operador Teste 2';
  const email = `andrey+${Date.now()}@rodosoft.com.br`;
  await this.solicitacaoCartaoClientePage.solicitarCartoesFisicosCompletosComPedido(cpf, nomeCompleto, email, 2, 'Pedido de 2 cartões físicos - teste automatizado');
});
