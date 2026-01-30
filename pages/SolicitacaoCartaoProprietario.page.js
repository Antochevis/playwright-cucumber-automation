class SolicitacaoCartaoProprietarioPage {
  constructor(page) {
    this.page = page;
  }

  async solicitarCartao(cpf, dadosCartao = {}) {
    const {
      tipoCartao = 'Cartão Virtual - Saldo Livre',
      pin = '1234'
    } = dadosCartao;

    await this.page.getByRole('link', { name: 'Cartões' }).click();
    await this.page.getByRole('link', { name: 'Solicitar Cartão' }).click();
    
    const cpfInput = this.page.getByRole('textbox', { name: 'CPF*' });
    await cpfInput.click();
    await cpfInput.pressSequentially(cpf, { delay: 100 });
    await this.page.waitForTimeout(1000);
    
    await this.page.getByText('Selecione um tipo de cartão').click();
    await this.page.getByText(tipoCartao).click();
    
    await this.page.getByRole('textbox', { name: 'Pin*' }).click();
    await this.page.getByRole('textbox', { name: 'Pin*' }).fill(pin);
    
    await this.page.getByRole('button', { name: 'Solicitar Cartão' }).click();

    return { cpf, tipoCartao, pin };
  }

  async validarSolicitacaoSucesso() {
    await this.page.getByText('Cartão criado com sucesso!').waitFor({ state: 'visible', timeout: 10000 });
  }
}

module.exports = SolicitacaoCartaoProprietarioPage;
