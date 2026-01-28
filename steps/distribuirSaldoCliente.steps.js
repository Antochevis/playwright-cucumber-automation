const { Given, When, Then } = require('@cucumber/cucumber');
const DistribuirSaldoClientePage = require('../pages/DistribuirSaldoCliente.page');

When('eu distribuo saldo aleatorio para um cliente', async function () {
  const distribuirSaldoClientePage = new DistribuirSaldoClientePage(this.page);
  
  this.valorDistribuido = await distribuirSaldoClientePage.distribuirSaldo();
  
  console.log(`💰 Valor distribuído para cliente: R$ ${this.valorDistribuido},00`);
});

When('eu confirmo o pagamento com saldo', async function () {
  const distribuirSaldoClientePage = new DistribuirSaldoClientePage(this.page);
  await distribuirSaldoClientePage.confirmarPagamento();
});

Then('o saldo deve ser distribuido com sucesso', async function () {
  const distribuirSaldoClientePage = new DistribuirSaldoClientePage(this.page);
  await distribuirSaldoClientePage.validarDistribuicaoSucesso();
});
