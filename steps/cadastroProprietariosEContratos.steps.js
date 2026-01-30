const { Given, When, Then } = require('@cucumber/cucumber');

When('eu cadastro um novo proprietario com contrato', async function() {
  this.dadosCadastro = await this.cadastroProprietariosEContratosPage.cadastrarProprietarioComContrato();
});

When('eu cadastro um novo proprietario sem contrato', async function() {
  this.dadosProprietario = await this.cadastroProprietariosEContratosPage.cadastrarProprietario();
});

Given('existe um proprietario cadastrado', async function() {
});

When('eu cadastro um novo contrato para o proprietario', async function() {
  this.dadosContrato = await this.cadastroProprietariosEContratosPage.cadastrarContrato();
});

Then('o proprietario e contrato devem ser cadastrados com sucesso', async function() {
  await this.cadastroProprietariosEContratosPage.validarCadastroCompletoSucesso();
});

Then('o proprietario deve ser cadastrado com sucesso', async function() {
  await this.cadastroProprietariosEContratosPage.validarCadastroProprietarioSucesso();
});

Then('o contrato deve ser cadastrado com sucesso', async function() {
  await this.cadastroProprietariosEContratosPage.validarCadastroContratoSucesso();
});
