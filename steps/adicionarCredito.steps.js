const { Given, When, Then } = require('@cucumber/cucumber');
const AdicionarCreditoPage = require('../pages/AdicionarCredito.page');

When('eu adiciono credito aleatorio via PIX', async function () {
  const adicionarCreditoPage = new AdicionarCreditoPage(this.page, this.context);
  
  this.valorCredito = await adicionarCreditoPage.adicionarCredito();
  this.codigoPix = await adicionarCreditoPage.copiarCodigoPix();
  
  console.log(`💰 Valor de crédito gerado: R$ ${this.valorCredito},00`);
});

When('eu adiciono credito de {string} via PIX', async function (valor) {
  const adicionarCreditoPage = new AdicionarCreditoPage(this.page, this.context);
  
  const valorSemPonto = valor.replace('.', '').replace(',', '');
  
  this.valorCredito = await adicionarCreditoPage.adicionarCredito(valorSemPonto);
  this.codigoPix = await adicionarCreditoPage.copiarCodigoPix();
});

When('eu realizo o pagamento no gateway', async function () {
  const adicionarCreditoPage = new AdicionarCreditoPage(this.page, this.context);
  await adicionarCreditoPage.pagarNoGateway(this.codigoPix);
});

Then('o credito deve ser aprovado com sucesso', async function () {
  const adicionarCreditoPage = new AdicionarCreditoPage(this.page, this.context);
  await adicionarCreditoPage.validarPagamentoAprovado();
});
