class SolicitacaoCartaoClientePage {
  constructor(page) {
    this.page = page;
  }

  async solicitarCartao(cpf, dadosCartao = {}) {
    const {
      tipoCartao = 'Cartão Virtual - Livre',
      pin = '1234'
    } = dadosCartao;

    await this.page.getByRole('link', { name: 'Cartões' }).click();
    await this.page.getByRole('link', { name: 'Solicitar Cartão' }).click();
    await this.page.waitForTimeout(1000);
    
    const cpfInput = this.page.getByRole('textbox', { name: 'CPF*' });
    await cpfInput.click();
    await this.page.waitForTimeout(300);
    await cpfInput.fill(cpf);
    await this.page.waitForTimeout(2000);
    
    await this.page.getByText('Selecione um tipo de cartão').click();
    await this.page.waitForTimeout(500);
    await this.page.getByText(tipoCartao).click();
    
    await this.page.getByRole('textbox', { name: 'Pin*' }).click();
    await this.page.getByRole('textbox', { name: 'Pin*' }).fill(pin);
    
    // Tab para sair do campo e validar
    await this.page.keyboard.press('Tab');
    await this.page.waitForTimeout(1500);
    
    await this.page.getByRole('button', { name: 'Solicitar Cartão' }).click();

    return { cpf, tipoCartao, pin };
  }

  async validarSolicitacaoSucesso() {
    await this.page.getByText('Cartão solicitado com sucesso!').waitFor({ state: 'visible', timeout: 10000 });
  }
}

module.exports = SolicitacaoCartaoClientePage;
