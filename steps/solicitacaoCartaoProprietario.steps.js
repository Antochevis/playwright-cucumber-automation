const { When, Then } = require('@cucumber/cucumber');

When('eu solicito um cartao virtual de saldo livre para o operador cadastrado como proprietario', async function() {
  await this.solicitacaoCartaoProprietarioPage.solicitarCartao(this.cpfOperadorCadastrado);
});

When('eu solicito 1 cartao fisico de saldo livre para o operador cadastrado como proprietario', async function() {
  await this.solicitacaoCartaoProprietarioPage.solicitarCartoesFisicos(this.cpfOperadorCadastrado, 1);
  await this.solicitacaoCartaoProprietarioPage.gerarPedidoCartaoFisico('Pedido de 1 cartão físico - teste automatizado', 1);
});

When('eu solicito 2 cartoes fisicos de saldo livre para o operador cadastrado como proprietario', async function() {
  await this.solicitacaoCartaoProprietarioPage.solicitarCartoesFisicos(this.cpfOperadorCadastrado, 2);
  await this.solicitacaoCartaoProprietarioPage.gerarPedidoCartaoFisico('Pedido de 2 cartões físicos - teste automatizado', 2);
});

Then('o cartao virtual de saldo livre deve ser solicitado com sucesso pelo proprietario', async function() {
  await this.solicitacaoCartaoProprietarioPage.validarSolicitacaoSucesso();
});

Then('o pedido de cartao fisico deve ser gerado com sucesso pelo proprietario', async function() {
  await this.solicitacaoCartaoProprietarioPage.validarPedidoGeradoSucesso();
});

Then('o pedido de cartoes fisicos deve ser gerado com sucesso pelo proprietario', async function() {
  await this.solicitacaoCartaoProprietarioPage.validarPedidoGeradoSucesso();
});
