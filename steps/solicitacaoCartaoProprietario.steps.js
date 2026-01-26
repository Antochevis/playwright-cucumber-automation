const { When, Then } = require('@cucumber/cucumber');

When('eu solicito um cartao para o operador cadastrado como proprietario', async function() {
  await this.solicitacaoCartaoProprietarioPage.solicitarCartao(this.cpfOperadorCadastrado);
});

Then('o cartao deve ser solicitado com sucesso pelo proprietario', async function() {
  await this.solicitacaoCartaoProprietarioPage.validarSolicitacaoSucesso();
});
