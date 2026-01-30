const { When, Then } = require('@cucumber/cucumber');

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
