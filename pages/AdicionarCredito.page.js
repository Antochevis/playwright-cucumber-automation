const { gerarValorCredito } = require('../utils/gerador');

class AdicionarCreditoPage {
  constructor(page, context) {
    this.page = page;
    this.context = context;
  }

  async capturarSaldoAtual() {
    // Vai para a tela de Saldos
    await this.page.getByRole('link', { name: 'Saldos' }).click();
    await this.page.waitForTimeout(2000);
    
    // Pega o valor do saldo que está na tela
    let saldoTexto;
    
    try {
      // Primeiro tenta encontrar em tags comuns como <p> ou <strong>
      saldoTexto = await this.page.locator('p, strong').filter({ hasText: /^R\$\s*\d/ }).first().textContent({ timeout: 5000 });
    } catch (error) {
      // Se não achar, procura de outra forma
      saldoTexto = await this.page.locator('text=/R\\$\\s*\\d/').first().textContent({ timeout: 5000 });
    }
    
    // Transforma o texto "R$ 1.234,56" em número 1234.56
    const saldoNumero = parseFloat(saldoTexto.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    
    return saldoNumero;
  }

  async capturarSaldoSemNavegacao() {
    // Mesma coisa que capturarSaldoAtual, mas sem clicar em "Saldos"
    // Útil quando já estamos na página de saldos
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
    // Fecha a mensagem de "Pagamento aprovado"
    // Usa .last() porque às vezes tem mais de um botão X na tela
    await this.page.getByRole('button', { name: 'Fechar janela' }).last().click();
    
    // Espera 8 segundos pro backend processar tudo
    // O saldo não atualiza na hora, precisa esperar
    await this.page.waitForTimeout(8000);
    
    // Atualiza a página pra pegar o saldo novo
    await this.page.reload();
    await this.page.waitForTimeout(2000);
    
    // Vai pra tela de Saldos pra conferir
    await this.page.getByRole('link', { name: 'Saldos' }).click();
    await this.page.waitForTimeout(2000);
    
    // Pega o saldo atualizado e calcula quanto deveria ser
    const saldoAtual = await this.capturarSaldoSemNavegacao();
    const saldoEsperado = saldoAnterior + valorAdicionado;
    
    // Mostra no console pra gente acompanhar
    console.log(`Saldo anterior: R$ ${saldoAnterior.toFixed(2)}`);
    console.log(`Valor adicionado: R$ ${valorAdicionado.toFixed(2)}`);
    console.log(`Saldo atual: R$ ${saldoAtual.toFixed(2)}`);
    console.log(`Saldo esperado: R$ ${saldoEsperado.toFixed(2)}`);
    
    // Confere se o saldo bateu (com margem de 1 centavo pra não dar erro por arredondamento)
    if (Math.abs(saldoAtual - saldoEsperado) > 0.01) {
      throw new Error(`Saldo incorreto! Esperado: R$ ${saldoEsperado.toFixed(2)}, Atual: R$ ${saldoAtual.toFixed(2)}`);
    }
    
    return true;
  }

  async adicionarCredito(valor = null) {
    const valorCredito = valor || gerarValorCredito();
    
    await this.page.getByRole('link', { name: 'Saldos' }).click();
    await this.page.getByRole('button', { name: 'Adicionar Crédito' }).click();
    
    await this.page.getByRole('spinbutton', { name: 'Valor a adicionar' }).click();
    await this.page.getByRole('spinbutton', { name: 'Valor a adicionar' }).fill(valorCredito.toString());
    
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
