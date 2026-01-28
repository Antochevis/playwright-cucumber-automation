const { gerarValorCredito } = require('../utils/gerador');

class DistribuirSaldoClientePage {
  constructor(page) {
    this.page = page;
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
