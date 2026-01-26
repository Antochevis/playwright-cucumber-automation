const { Given, When, Then } = require('@cucumber/cucumber');

When('eu cadastro um novo cliente com contrato', async function() {
  this.dadosCadastro = await this.cadastroClientesEContratosPage.cadastrarClienteComContrato();
});

When('eu cadastro um novo cliente sem contrato', async function() {
  this.dadosCliente = await this.cadastroClientesEContratosPage.cadastrarCliente();
});

Given('existe um cliente cadastrado', async function() {
    // Assume que já existem clientes cadastrados no sistema
});

When('eu cadastro um novo contrato para o cliente', async function() {
  this.dadosContrato = await this.cadastroClientesEContratosPage.cadastrarContrato();
});

Then('o cliente e contrato devem ser cadastrados com sucesso', async function() {
  await this.cadastroClientesEContratosPage.validarCadastroCompletoSucesso();
});

Then('o cliente deve ser cadastrado com sucesso', async function() {
  await this.cadastroClientesEContratosPage.validarCadastroClienteSucesso();
});

Then('o contrato deve ser cadastrado com sucesso para o cliente', async function() {
  await this.cadastroClientesEContratosPage.validarCadastroContratoSucesso();
});
