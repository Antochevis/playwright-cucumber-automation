const { When, Then } = require('@cucumber/cucumber');

When('eu solicito um cartao para o operador cadastrado como cliente', async function() {
  await this.solicitacaoCartaoClientePage.solicitarCartao(this.cpfOperadorCadastrado);
});

Then('o cartao deve ser solicitado com sucesso pelo cliente', async function() {
  await this.solicitacaoCartaoClientePage.validarSolicitacaoSucesso();
});
