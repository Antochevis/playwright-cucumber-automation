class SolicitacaoCartaoClientePage {
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

    await this.page.keyboard.press('Tab');
    await this.page.waitForTimeout(1500);

    await this.page.getByRole('button', { name: 'Solicitar Cartão' }).click();

    return { cpf, tipoCartao, pin };
  }

  async solicitarCartoesFisicos(cpf, quantidade = 1) {
    await this.page.getByRole('link', { name: 'Cartões' }).click();
    await this.page.getByRole('link', { name: 'Solicitar Cartão' }).click();
    await this.page.waitForTimeout(1000);

    // Solicitar o primeiro cartão
    const cpfInput = this.page.getByRole('textbox', { name: 'CPF*' });
    await cpfInput.click();
    await this.page.waitForTimeout(300);
    await cpfInput.fill(cpf);
    await this.page.waitForTimeout(2000);

    await this.page.getByText('Selecione um tipo de cartão').click();
    await this.page.waitForTimeout(500);
    await this.page.getByText('Cartão Físico - Saldo Livre').click();

    await this.page.keyboard.press('Tab');
    await this.page.waitForTimeout(1500);

    await this.page.getByRole('button', { name: 'Solicitar Cartão' }).click();

    // Se quantidade > 1, solicitar cartões adicionais
    for (let i = 1; i < quantidade; i++) {
      await this.page.getByRole('button', { name: 'Solicitar mais cartões' }).click();

      const cpfInputAdicional = this.page.getByRole('textbox', { name: 'CPF*' });
      await cpfInputAdicional.click();
      await this.page.waitForTimeout(300);
      await cpfInputAdicional.fill(cpf);
      await this.page.waitForTimeout(2000);

      await this.page.getByText('Selecione um tipo de cartão').click();
      await this.page.waitForTimeout(500);
      await this.page.getByText('Cartão Físico - Saldo Livre').click();

      await this.page.keyboard.press('Tab');
      await this.page.waitForTimeout(1500);

      await this.page.getByRole('button', { name: 'Solicitar Cartão' }).click();
    }

    return { cpf, tipoCartao: 'Cartão Físico - Saldo Livre', quantidade };
  }

  async gerarPedidoCartaoFisico(descricao = 'Pedido de cartão físico - teste automatizado', quantidade = 1) {
    // Aguardar mensagem de sucesso dos cartões
    await this.page.getByText('Cartão criado com sucesso!').waitFor({ state: 'visible', timeout: 10000 });

    // Para 1 cartão: "Gerar pedido agora", para múltiplos: "Gerar pedido"
    const botaoTexto = quantidade === 1 ? 'Gerar pedido agora' : 'Gerar pedido';
    await this.page.getByRole('button', { name: botaoTexto }).click();

    // No modal, clicar em "Gerar pedido"
    await this.page.getByRole('dialog').getByRole('button', { name: 'Gerar pedido' }).click();

    // Preencher descrição
    await this.page.getByRole('textbox', { name: 'Descrição*' }).click();
    await this.page.getByRole('textbox', { name: 'Descrição*' }).fill(descricao);

    // Confirmar
    await this.page.getByRole('button', { name: 'Confirmar' }).click();

    return { descricao, quantidade };
  }

  async validarSolicitacaoSucesso() {
    await this.page.getByText('Cartão criado com sucesso!').waitFor({ state: 'visible', timeout: 10000 });
  }

  async validarPedidoGeradoSucesso() {
    await this.page.getByText('Pedido de cartão enviado para').waitFor({ state: 'visible', timeout: 15000 });
  }
}

module.exports = SolicitacaoCartaoClientePage;
