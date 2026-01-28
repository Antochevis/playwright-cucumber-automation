const { gerarValorCredito } = require('../utils/gerador');

class DistribuirSaldoCartaoPage {
  constructor(page, context) {
    this.page = page;
    this.context = context;
  }

  async capturarSaldoUsuarioECartoes(perfil) {
    await this.page.getByRole('link', { name: 'Saldos' }).click();
    await this.page.waitForTimeout(2000);
    
    let saldoUsuario, saldoCartoes;
    
    if (perfil === 'proprietario') {
      // Proprietário: captura "Saldo Total" e "Total em cartões"
      // Primeiro heading após "Saldo Total:", terceiro após "Total em cartões:"
      const headings = await this.page.getByRole('heading').filter({ hasText: /^R\$\s*\d/ }).allTextContents();
      saldoUsuario = parseFloat(headings[0].replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
      saldoCartoes = parseFloat(headings[2].replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    } else {
      // Cliente: primeiro heading é saldo do cliente, segundo é total em cartões
      const headings = await this.page.getByRole('heading').filter({ hasText: /^R\$\s*\d/ }).allTextContents();
      saldoUsuario = parseFloat(headings[0].replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
      saldoCartoes = parseFloat(headings[1].replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    }
    
    return { saldoUsuario, saldoCartoes };
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

  async validarSaldosAtualizados(saldosAnteriores, valorDistribuido, perfil, pagamentoViaPIX = false) {
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
    
    // Captura os headings com valores (R$)
    const headings = await this.page.getByRole('heading').filter({ hasText: /^R\$\s*\d/ }).allTextContents();
    
    let saldoUsuarioAtual, saldoCartoesAtual;
    
    if (perfil === 'proprietario') {
      // Proprietário: primeiro heading = Saldo Total, terceiro = Total em cartões
      saldoUsuarioAtual = parseFloat(headings[0].replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
      saldoCartoesAtual = parseFloat(headings[2].replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    } else {
      // Cliente: primeiro heading = saldo cliente, segundo = Total em cartões
      saldoUsuarioAtual = parseFloat(headings[0].replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
      saldoCartoesAtual = parseFloat(headings[1].replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    }
    
    // Se pagamento via PIX: saldo usuário não muda, apenas cartões aumenta
    // Se pagamento com saldo: saldo usuário diminui, cartões aumenta
    const saldoUsuarioEsperado = pagamentoViaPIX 
      ? saldosAnteriores.saldoUsuario 
      : saldosAnteriores.saldoUsuario - valorDistribuido;
    const saldoCartoesEsperado = saldosAnteriores.saldoCartoes + valorDistribuido;
    
    console.log(`\nUSUARIO (${pagamentoViaPIX ? 'PIX' : 'SALDO'}):`);
    console.log(`   Saldo anterior: R$ ${saldosAnteriores.saldoUsuario.toFixed(2)}`);
    console.log(`   Saldo atual: R$ ${saldoUsuarioAtual.toFixed(2)}`);
    console.log(`   Saldo esperado: R$ ${saldoUsuarioEsperado.toFixed(2)}`);
    
    console.log(`\nCARTOES:`);
    console.log(`   Saldo anterior: R$ ${saldosAnteriores.saldoCartoes.toFixed(2)}`);
    console.log(`   Saldo atual: R$ ${saldoCartoesAtual.toFixed(2)}`);
    console.log(`   Saldo esperado: R$ ${saldoCartoesEsperado.toFixed(2)}`);
    
    console.log(`\nValor distribuido: R$ ${valorDistribuido.toFixed(2)}\n`);
    
    // Valida saldo do usuário
    if (Math.abs(saldoUsuarioAtual - saldoUsuarioEsperado) > 0.01) {
      throw new Error(`Saldo do usuario incorreto! Esperado: R$ ${saldoUsuarioEsperado.toFixed(2)}, Atual: R$ ${saldoUsuarioAtual.toFixed(2)}`);
    }
    
    // Valida saldo em cartões
    if (Math.abs(saldoCartoesAtual - saldoCartoesEsperado) > 0.01) {
      throw new Error(`Saldo em cartoes incorreto! Esperado: R$ ${saldoCartoesEsperado.toFixed(2)}, Atual: R$ ${saldoCartoesAtual.toFixed(2)}`);
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
