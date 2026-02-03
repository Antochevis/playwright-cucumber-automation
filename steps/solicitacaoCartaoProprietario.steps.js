const { When, Then } = require('@cucumber/cucumber');
const { gerarCPF } = require('../utils/gerador');

When('eu solicito um cartao virtual de saldo livre para o operador cadastrado como proprietario', async function() {
  await this.solicitacaoCartaoProprietarioPage.solicitarCartaoParaOperadorCadastrado(this.cpfOperadorCadastrado);
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
  await this.solicitacaoCartaoProprietarioPage.validarSolicitacaoSucessoOperadorCadastrado();
});

Then('o pedido de cartao fisico deve ser gerado com sucesso pelo proprietario', async function() {
  await this.solicitacaoCartaoProprietarioPage.validarPedidoGeradoSucesso();
});

Then('o pedido de cartoes fisicos deve ser gerado com sucesso pelo proprietario', async function() {
  await this.solicitacaoCartaoProprietarioPage.validarPedidoGeradoSucesso();
});

When('eu solicito um cartao virtual de saldo livre para um operador nao cadastrado como proprietario', async function() {
  await this.solicitacaoCartaoProprietarioPage.solicitarCartaoParaUsuarioNaoCadastrado();
});

When('eu solicito 1 cartao fisico de saldo livre para um operador nao cadastrado como proprietario', async function() {
  const cpf = gerarCPF();
  const nomeCompleto = 'Operador Teste 1';
  const email = `andrey+${Date.now()}@rodosoft.com.br`;
  await this.solicitacaoCartaoProprietarioPage.solicitarCartoesFisicosCompletosComPedido(cpf, nomeCompleto, email, 1, 'Pedido de 1 cartão físico - teste automatizado');
});

When('eu solicito 2 cartoes fisicos de saldo livre para um operador nao cadastrado como proprietario', async function() {
  const cpf = gerarCPF();
  const nomeCompleto = 'Operador Teste 2';
  const email = `andrey+${Date.now()}@rodosoft.com.br`;
  await this.solicitacaoCartaoProprietarioPage.solicitarCartoesFisicosCompletosComPedido(cpf, nomeCompleto, email, 2, 'Pedido de 2 cartões físicos - teste automatizado');
});
