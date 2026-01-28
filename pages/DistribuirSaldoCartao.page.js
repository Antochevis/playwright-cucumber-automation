const { gerarValorCredito } = require('../utils/gerador');

class DistribuirSaldoCartaoPage {
  constructor(page, context) {
    this.page = page;
    this.context = context;
  }

  async distribuirSaldo(perfil, valor = null) {
    // Se não passar valor, gera aleatório entre 100 e 1000
    const valorDistribuicao = valor || gerarValorCredito();
    
    await this.page.getByRole('link', { name: 'Saldos' }).click();
    
    // Proprietário usa o segundo botão, Cliente usa o primeiro
    if (perfil === 'proprietario') {
      await this.page.getByRole('button', { name: 'Distribuir saldos' }).nth(1).click();
    } else {
      await this.page.getByRole('button', { name: 'Distribuir saldos' }).click();
    }
    
    // Pega o primeiro cartão disponível da lista
    const primeiraLinha = this.page.getByRole('row').nth(1); // nth(0) é o header
    const inputValor = primeiraLinha.getByPlaceholder('300,00');
    
    await inputValor.click();
    await inputValor.fill(valorDistribuicao.toString());
    
    await this.page.waitForTimeout(500);
    
    return valorDistribuicao;
  }

  async confirmarPagamentoComSaldo() {
    await this.page.getByRole('button', { name: 'Fazer pagamento' }).click();
    await this.page.waitForTimeout(1000);
    
    // Seleciona aba Saldo
    await this.page.getByRole('tab', { name: 'Saldo' }).click();
    await this.page.waitForTimeout(500);
    
    await this.page.getByRole('button', { name: 'Pagar com saldo' }).click();
  }

  async confirmarPagamentoComPIX() {
    await this.page.getByRole('button', { name: 'Fazer pagamento' }).click();
    await this.page.waitForTimeout(1000);
    
    // Aba PIX já vem selecionada por padrão
    await this.page.getByRole('button', { name: 'Gerar QR Code' }).click();
    await this.page.waitForTimeout(2000);
  }

  async copiarCodigoPix() {
    await this.page.getByRole('tabpanel', { name: 'PIX' }).getByRole('button').click();
    await this.page.waitForTimeout(500);
    
    const codigoPix = await this.page.evaluate(() => navigator.clipboard.readText());
    return codigoPix;
  }

  async pagarNoGateway(codigoPix) {
    const gatewayUrl = process.env.PAYMENT_GATEWAY_URL;
    
    const paginaGateway = await this.context.newPage();
    await paginaGateway.goto(gatewayUrl);
    await paginaGateway.waitForTimeout(1000);
    
    await paginaGateway.getByRole('textbox').click();
    await paginaGateway.getByRole('textbox').fill(codigoPix);
    await paginaGateway.getByRole('button', { name: 'Pagar' }).click();
    
    await paginaGateway.waitForTimeout(2000);
    
    await paginaGateway.close();
  }

  async validarDistribuicaoSucesso() {
    // Validação para pagamento com SALDO
    await this.page.getByText('Saldo distribuído com sucesso!').waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByRole('heading', { name: 'Pagamento aprovado' }).waitFor({ state: 'visible', timeout: 10000 });
  }

  async validarDistribuicaoSucessoViaPIX() {
    // Validação para pagamento via PIX (webhook pode demorar)
    await this.page.bringToFront();
    await this.page.waitForTimeout(2000);
    
    await this.page.getByText('Pagamento confirmado! Em').waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('heading', { name: 'Pagamento aprovado' }).waitFor({ state: 'visible', timeout: 10000 });
  }
}

module.exports = DistribuirSaldoCartaoPage;
