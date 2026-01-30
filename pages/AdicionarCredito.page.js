const { gerarValorCredito } = require('../utils/gerador');

class AdicionarCreditoPage {
  constructor(page, context) {
    this.page = page;
    this.context = context;
  }

  async capturarSaldoAtual() {
    await this.page.getByRole('link', { name: 'Saldos' }).click();
    await this.page.waitForTimeout(2000);
    
    let saldoTexto;
    
    try {
      saldoTexto = await this.page.locator('p, strong').filter({ hasText: /^R\$\s*\d/ }).first().textContent({ timeout: 5000 });
    } catch (error) {
      saldoTexto = await this.page.locator('text=/R\\$\\s*\\d/').first().textContent({ timeout: 5000 });
    }
    
    const saldoNumero = parseFloat(saldoTexto.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    
    return saldoNumero;
  }

  async capturarSaldoSemNavegacao() {
    await this.page.waitForTimeout(2000);
    
    let saldoTexto;
    
    try {
      saldoTexto = await this.page.locator('p, strong').filter({ hasText: /^R\$\s*\d/ }).first().textContent({ timeout: 5000 });
    } catch (error) {
      saldoTexto = await this.page.locator('text=/R\\$\\s*\\d/').first().textContent({ timeout: 5000 });
    }
    
    const saldoNumero = parseFloat(saldoTexto.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    
    return saldoNumero;
  }

  async validarSaldoAtualizado(saldoAnterior, valorAdicionado) {
    await this.page.getByRole('button', { name: 'Fechar janela' }).last().click();
    
    await this.page.waitForTimeout(15000);
    
    await this.page.reload();
    await this.page.waitForTimeout(3000);
    
    await this.page.getByRole('link', { name: 'Saldos' }).click();
    await this.page.waitForTimeout(3000);
    
    const saldoAtual = await this.capturarSaldoSemNavegacao();
    const saldoEsperado = saldoAnterior + valorAdicionado;
    
    console.log(`Saldo anterior: R$ ${saldoAnterior.toFixed(2)}`);
    console.log(`Valor adicionado: R$ ${valorAdicionado.toFixed(2)}`);
    console.log(`Saldo atual: R$ ${saldoAtual.toFixed(2)}`);
    console.log(`Saldo esperado: R$ ${saldoEsperado.toFixed(2)}`);
    
    if (Math.abs(saldoAtual - saldoEsperado) > 0.01) {
      throw new Error(`Saldo incorreto! Esperado: R$ ${saldoEsperado.toFixed(2)}, Atual: R$ ${saldoAtual.toFixed(2)}`);
    }
    
    return true;
  }

  async adicionarCredito(valor = null) {
    const valorCredito = valor || gerarValorCredito();
    
    await this.page.getByRole('link', { name: 'Saldos' }).click();
    await this.page.getByRole('button', { name: 'Adicionar Crédito' }).click();
    
    await this.page.getByRole('spinbutton', { name: 'Valor a ser adicionado' }).click();
    await this.page.getByRole('spinbutton', { name: 'Valor a ser adicionado' }).fill(valorCredito.toString());
    
    await this.page.getByRole('button', { name: 'Gerar QR Code' }).click();
    await this.page.waitForTimeout(2000);
    
    return valorCredito;
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

  async validarPagamentoAprovado() {
    await this.page.bringToFront();
    
    await this.page.getByText('Pagamento confirmado! Em').waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('heading', { name: 'Pagamento aprovado' }).waitFor({ state: 'visible', timeout: 10000 });
  }

  async validarCreditoAdicionado() {
    await this.page.getByRole('heading', { name: 'Pagamento aprovado' }).waitFor({ state: 'visible', timeout: 10000 });
  }
}

module.exports = AdicionarCreditoPage;
