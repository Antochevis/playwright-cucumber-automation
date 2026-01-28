const { Given, When, Then } = require('@cucumber/cucumber');
const DistribuirSaldoClientePage = require('../pages/DistribuirSaldoCliente.page');

When('eu verifico meu saldo de proprietario', async function () {
  const distribuirSaldoClientePage = new DistribuirSaldoClientePage(this.page);
  this.saldosAnteriores = await distribuirSaldoClientePage.capturarSaldoProprietarioECliente();
  console.log(`Saldo inicial proprietario: R$ ${this.saldosAnteriores.saldoProprietario.toFixed(2)}`);
  console.log(`Saldo inicial cliente: R$ ${this.saldosAnteriores.saldoCliente.toFixed(2)}`);
});

When('eu distribuo saldo aleatorio para um cliente', async function () {
  const distribuirSaldoClientePage = new DistribuirSaldoClientePage(this.page);
  
  this.valorDistribuido = await distribuirSaldoClientePage.distribuirSaldo();
  
  console.log(`Valor distribuido para cliente: R$ ${this.valorDistribuido},00`);
});

When('eu confirmo o pagamento com saldo', async function () {
  const distribuirSaldoClientePage = new DistribuirSaldoClientePage(this.page);
  await distribuirSaldoClientePage.confirmarPagamento();
});

Then('o saldo deve ser distribuido com sucesso', async function () {
  const distribuirSaldoClientePage = new DistribuirSaldoClientePage(this.page);
  await distribuirSaldoClientePage.validarDistribuicaoSucesso();
});

Then('meu saldo de proprietario deve ser atualizado corretamente', async function () {
  const distribuirSaldoClientePage = new DistribuirSaldoClientePage(this.page);
  await distribuirSaldoClientePage.validarSaldosAtualizados(this.saldosAnteriores, this.valorDistribuido);
});
