const { Given, When, Then } = require('@cucumber/cucumber');

Given('que eu acesso a pagina de criar conta', async function() {
  await this.cadastroPage.irParaCriarConta();
});

When('eu cadastro um novo usuario', async function() {
  await this.cadastroPage.cadastrarNovo();
});

Then('devo ver o usuario criado com sucesso', async function() {
  await this.cadastroPage.validarCadastroSucesso();
});

When('eu cadastro um novo usuario:', async function(table) {
  const row = table.hashes()[0];
  await this.cadastroPage.cadastrarNovo(row);
});
