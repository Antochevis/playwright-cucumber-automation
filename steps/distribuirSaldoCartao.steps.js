const { Given, When, Then } = require('@cucumber/cucumber');
const DistribuirSaldoCartaoPage = require('../pages/DistribuirSaldoCartao.page');

When('eu distribuo saldo aleatorio para um cartao', async function () {
  const distribuirSaldoCartaoPage = new DistribuirSaldoCartaoPage(this.page, this.context);
  
  // Detecta o perfil do usuário logado (salvo no step de login)
  const perfil = this.perfilLogado || 'proprietario';
  
  this.valorDistribuido = await distribuirSaldoCartaoPage.distribuirSaldo(perfil);
  
  console.log(`💳 Valor distribuído para cartão (${perfil}): R$ ${this.valorDistribuido},00`);
});

When('eu confirmo o pagamento com saldo disponivel', async function () {
  const distribuirSaldoCartaoPage = new DistribuirSaldoCartaoPage(this.page, this.context);
  await distribuirSaldoCartaoPage.confirmarPagamentoComSaldo();
  
  // Marca que foi pagamento com saldo (não PIX)
  this.pagamentoViaPIX = false;
});

When('eu confirmo o pagamento via PIX no gateway', async function () {
  const distribuirSaldoCartaoPage = new DistribuirSaldoCartaoPage(this.page, this.context);
  
  await distribuirSaldoCartaoPage.confirmarPagamentoComPIX();
  this.codigoPix = await distribuirSaldoCartaoPage.copiarCodigoPix();
  await distribuirSaldoCartaoPage.pagarNoGateway(this.codigoPix);
  
  // Marca que foi pagamento via PIX
  this.pagamentoViaPIX = true;
});

Then('o saldo deve ser distribuido para o cartao com sucesso', async function () {
  const distribuirSaldoCartaoPage = new DistribuirSaldoCartaoPage(this.page, this.context);
  
  // Usa validação correta dependendo do tipo de pagamento
  if (this.pagamentoViaPIX) {
    await distribuirSaldoCartaoPage.validarDistribuicaoSucessoViaPIX();
  } else {
    await distribuirSaldoCartaoPage.validarDistribuicaoSucesso();
  }
});
