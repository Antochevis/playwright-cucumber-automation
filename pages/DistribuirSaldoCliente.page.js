const { gerarValorCredito } = require('../utils/gerador');

class DistribuirSaldoClientePage {
  constructor(page) {
    this.page = page;
  }

  async capturarSaldoProprietarioECliente() {
    await this.page.getByRole('link', { name: 'Saldos' }).click();
    await this.page.waitForTimeout(2000);
    
    // Captura todos os headings com valores (R$)
    const headings = await this.page.getByRole('heading').filter({ hasText: /^R\$\s*\d/ }).allTextContents();
    
    // Primeiro valor é do proprietário, segundo é do cliente
    const saldoProprietario = parseFloat(headings[0].replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    const saldoCliente = parseFloat(headings[1].replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    
    return { saldoProprietario, saldoCliente };
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

  async validarSaldosAtualizados(saldosAnteriores, valorDistribuido) {
    // Fecha o modal clicando no botão X (Fechar janela) - usa .last() pois pode haver múltiplos modais
    await this.page.getByRole('button', { name: 'Fechar janela' }).last().click();
    
    // Aguarda processamento do backend antes de recarregar
    await this.page.waitForTimeout(8000);
    
    // Recarrega a página para atualizar o saldo
    await this.page.reload();
    await this.page.waitForTimeout(2000);
    
    // Navega para Saldos para garantir que estamos na página certa
    await this.page.getByRole('link', { name: 'Saldos' }).click();
    await this.page.waitForTimeout(2000);
    
    // Captura os headings com valores (R$) - primeiro é proprietário, segundo é cliente
    const headings = await this.page.getByRole('heading').filter({ hasText: /^R\$\s*\d/ }).allTextContents();
    
    const saldoProprietarioAtual = parseFloat(headings[0].replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    const saldoClienteAtual = parseFloat(headings[1].replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    
    const saldoProprietarioEsperado = saldosAnteriores.saldoProprietario - valorDistribuido;
    const saldoClienteEsperado = saldosAnteriores.saldoCliente + valorDistribuido;
    
    console.log(`\nPROPRIETARIO:`);
    console.log(`   Saldo anterior: R$ ${saldosAnteriores.saldoProprietario.toFixed(2)}`);
    console.log(`   Saldo atual: R$ ${saldoProprietarioAtual.toFixed(2)}`);
    console.log(`   Saldo esperado: R$ ${saldoProprietarioEsperado.toFixed(2)}`);
    
    console.log(`\nCLIENTE:`);
    console.log(`   Saldo anterior: R$ ${saldosAnteriores.saldoCliente.toFixed(2)}`);
    console.log(`   Saldo atual: R$ ${saldoClienteAtual.toFixed(2)}`);
    console.log(`   Saldo esperado: R$ ${saldoClienteEsperado.toFixed(2)}`);
    
    console.log(`\nValor distribuido: R$ ${valorDistribuido.toFixed(2)}\n`);
    
    // Valida saldo do proprietário
    if (Math.abs(saldoProprietarioAtual - saldoProprietarioEsperado) > 0.01) {
      throw new Error(`Saldo do proprietário incorreto! Esperado: R$ ${saldoProprietarioEsperado.toFixed(2)}, Atual: R$ ${saldoProprietarioAtual.toFixed(2)}`);
    }
    
    // Valida saldo do cliente
    if (Math.abs(saldoClienteAtual - saldoClienteEsperado) > 0.01) {
      throw new Error(`Saldo do cliente incorreto! Esperado: R$ ${saldoClienteEsperado.toFixed(2)}, Atual: R$ ${saldoClienteAtual.toFixed(2)}`);
    }
    
    return true;
  }

  async validarSaldoAtualizado(saldoAnterior, valorDistribuido) {
    // Fecha o modal clicando no botão X (Fechar janela) - usa .last() pois pode haver múltiplos modais
    await this.page.getByRole('button', { name: 'Fechar janela' }).last().click();
    
    // Aguarda processamento do backend antes de recarregar
    await this.page.waitForTimeout(8000);
    
    // Recarrega a página para atualizar o saldo
    await this.page.reload();
    await this.page.waitForTimeout(2000);
    
    // Navega para Saldos para garantir que estamos na página certa
    await this.page.getByRole('link', { name: 'Saldos' }).click();
    await this.page.waitForTimeout(2000);
    
    const saldoAtual = await this.capturarSaldoSemNavegacao();
    const saldoEsperado = saldoAnterior - valorDistribuido;
    
    console.log(`Saldo anterior: R$ ${saldoAnterior.toFixed(2)}`);
    console.log(`Valor distribuido: R$ ${valorDistribuido.toFixed(2)}`);
    console.log(`Saldo atual: R$ ${saldoAtual.toFixed(2)}`);
    console.log(`Saldo esperado: R$ ${saldoEsperado.toFixed(2)}`);
    
    if (Math.abs(saldoAtual - saldoEsperado) > 0.01) {
      throw new Error(`Saldo incorreto! Esperado: R$ ${saldoEsperado.toFixed(2)}, Atual: R$ ${saldoAtual.toFixed(2)}`);
    }
    
    return true;
  }

  async distribuirSaldo(valor = null) {
    // Se não passar valor, gera aleatório entre 100 e 1000
    const valorDistribuicao = valor || gerarValorCredito();
    
    await this.page.getByRole('link', { name: 'Saldos' }).click();
    await this.page.getByRole('button', { name: 'Distribuir saldos' }).first().click();
    
    // Pega o primeiro cliente disponível da lista
    const primeiraLinha = this.page.getByRole('row').nth(1); // nth(0) é o header
    const inputValor = primeiraLinha.getByPlaceholder('300,00');
    
    await inputValor.click();
    await inputValor.fill(valorDistribuicao.toString());
    
    await this.page.waitForTimeout(500);
    
    return valorDistribuicao;
  }

  async confirmarPagamento() {
    await this.page.getByRole('button', { name: 'Fazer pagamento' }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('button', { name: 'Pagar com saldo' }).click();
  }

  async validarDistribuicaoSucesso() {
    await this.page.getByText('Saldo distribuído com sucesso!').waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByRole('heading', { name: 'Pagamento aprovado' }).waitFor({ state: 'visible', timeout: 10000 });
  }
}

module.exports = DistribuirSaldoClientePage;
