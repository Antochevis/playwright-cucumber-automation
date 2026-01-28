const { Given, When, Then } = require('@cucumber/cucumber');
const DistribuirSaldoCartaoPage = require('../pages/DistribuirSaldoCartao.page');

When('eu verifico meu saldo atual', async function () {
  const distribuirSaldoCartaoPage = new DistribuirSaldoCartaoPage(this.page, this.context);
  
  // Detecta o perfil do usuário logado (salvo no step de login)
  const perfil = this.perfilLogado || 'proprietario';
  
  this.saldosAnteriores = await distribuirSaldoCartaoPage.capturarSaldoUsuarioECartoes(perfil);
  console.log(`Saldo inicial usuario: R$ ${this.saldosAnteriores.saldoUsuario.toFixed(2)}`);
  console.log(`Saldo inicial cartoes: R$ ${this.saldosAnteriores.saldoCartoes.toFixed(2)}`);
});

When('eu distribuo saldo aleatorio para um cartao', async function () {
  const distribuirSaldoCartaoPage = new DistribuirSaldoCartaoPage(this.page, this.context);
  
  // Detecta o perfil do usuário logado (salvo no step de login)
  const perfil = this.perfilLogado || 'proprietario';
  
  this.valorDistribuido = await distribuirSaldoCartaoPage.distribuirSaldo(perfil);
  
  console.log(`Valor distribuido para cartao (${perfil}): R$ ${this.valorDistribuido},00`);
});

When('eu confirmo o pagamento com saldo disponivel', async function () {
  console.log(`Metodo de pagamento: SALDO`);
  const distribuirSaldoCartaoPage = new DistribuirSaldoCartaoPage(this.page, this.context);
  await distribuirSaldoCartaoPage.confirmarPagamentoComSaldo();
  
  // Marca que foi pagamento com saldo (não PIX)
  this.pagamentoViaPIX = false;
});

When('eu confirmo o pagamento via PIX no gateway', async function () {
  console.log(`Metodo de pagamento: PIX`);
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

Then('meu saldo deve ser atualizado corretamente', async function () {
  const distribuirSaldoCartaoPage = new DistribuirSaldoCartaoPage(this.page, this.context);
  
  // Detecta o perfil do usuário logado
  const perfil = this.perfilLogado || 'proprietario';
  
  await distribuirSaldoCartaoPage.validarSaldosAtualizados(this.saldosAnteriores, this.valorDistribuido, perfil, this.pagamentoViaPIX);
});
