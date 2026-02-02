const { gerarCPF } = require('../utils/gerador');

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
    // Tentar ambas as mensagens de sucesso
    try {
      await this.page.getByText('Cartão criado com sucesso!').waitFor({ state: 'visible', timeout: 5000 });
    } catch {
      await this.page.getByText('Cartão solicitado com sucesso!').waitFor({ state: 'visible', timeout: 10000 });
    }

    const botaoTexto = quantidade === 1 ? 'Gerar pedido agora' : 'Gerar pedido';
    await this.page.getByRole('button', { name: botaoTexto }).click();

    await this.page.getByRole('dialog').getByRole('button', { name: 'Gerar pedido' }).click();

    await this.page.getByRole('textbox', { name: 'Descrição*' }).click();
    await this.page.getByRole('textbox', { name: 'Descrição*' }).fill(descricao);

    await this.page.getByRole('button', { name: 'Confirmar' }).click();

    return { descricao, quantidade };
  }

  async validarSolicitacaoSucesso() {
    // Tentar diferentes mensagens de sucesso
    try {
      await this.page.getByText('Cartão criado com sucesso!').waitFor({ state: 'visible', timeout: 5000 });
    } catch {
      await this.page.getByText('Cartão solicitado com sucesso!').waitFor({ state: 'visible', timeout: 10000 });
    }
  }

  async validarPedidoGeradoSucesso() {
    await this.page.getByText('Pedido de cartão enviado para').waitFor({ state: 'visible', timeout: 15000 });
  }

  async solicitarCartaoParaUsuarioNaoCadastrado(dadosCartao = {}) {
    const cpf = gerarCPF();
    const nomeCompleto = 'Usuário Teste Automatizado';
    const email = `andrey+${Date.now()}@rodosoft.com.br`;
    
    return await this.solicitarCartaoCompleto(cpf, nomeCompleto, email, dadosCartao);
  }

  async solicitarCartaoCompleto(cpf, nomeCompleto, email, dadosCartao = {}) {
    const {
      tipoCartao = 'Cartão Virtual - Saldo Livre',
      pin = '1234'
    } = dadosCartao;

    await this.page.getByRole('link', { name: 'Cartões' }).click();
    await this.page.getByRole('link', { name: 'Solicitar Cartão' }).click();

    // Preencher CPF
    const cpfInput = this.page.getByRole('textbox', { name: 'CPF*' });
    await cpfInput.click();
    await cpfInput.fill(cpf);
    await this.page.waitForTimeout(1000);

    // Preencher Nome Completo (usuário não cadastrado)
    const nomeInput = this.page.getByRole('textbox', { name: 'Nome completo*' });
    await nomeInput.click();
    await nomeInput.fill(nomeCompleto);

    // Preencher Email
    const emailInput = this.page.getByRole('textbox', { name: 'Email*' });
    await emailInput.click();
    await emailInput.fill(email);

    // Selecionar Perfil
    await this.page.getByRole('textbox', { name: 'Perfil*' }).click();
    await this.page.getByText('Operador').click();
    await this.page.waitForTimeout(500);

    // Selecionar Tipo de Cartão
    await this.page.getByText('Selecione um tipo de cartão').click();
    await this.page.getByText(tipoCartao).click();

    // Preencher PIN se for Virtual
    if (tipoCartao.includes('Virtual')) {
      await this.page.getByRole('textbox', { name: 'Pin*' }).click();
      await this.page.getByRole('textbox', { name: 'Pin*' }).fill(pin);
    }

    // Solicitar Cartão
    await this.page.getByRole('button', { name: 'Solicitar Cartão' }).click();

    return { cpf, nomeCompleto, email, tipoCartao, pin };
  }

  async solicitarCartoesFisicosParaUsuarioNaoCadastrado(quantidade = 1) {
    const cpf = gerarCPF();
    const nomeCompleto = 'Usuário Teste Automatizado';
    const email = `andrey+${Date.now()}@rodosoft.com.br`;
    
    return await this.solicitarCartoesFisicosCompletos(cpf, nomeCompleto, email, quantidade);
  }

  async solicitarCartoesFisicosCompletos(cpf, nomeCompleto, email, quantidade = 1) {
    await this.page.getByRole('link', { name: 'Cartões' }).click();
    await this.page.getByRole('link', { name: 'Solicitar Cartão' }).click();

    // Preencher CPF
    const cpfInput = this.page.getByRole('textbox', { name: 'CPF*' });
    await cpfInput.click();
    await cpfInput.fill(cpf);
    await this.page.waitForTimeout(1000);

    // Preencher Nome Completo
    const nomeInput = this.page.getByRole('textbox', { name: 'Nome completo*' });
    await nomeInput.click();
    await nomeInput.fill(nomeCompleto);

    // Preencher Email
    const emailInput = this.page.getByRole('textbox', { name: 'Email*' });
    await emailInput.click();
    await emailInput.fill(email);

    // Selecionar Perfil
    await this.page.getByRole('textbox', { name: 'Perfil*' }).click();
    await this.page.getByText('Operador').click();
    await this.page.waitForTimeout(500);

    // Selecionar Tipo de Cartão (Físico)
    await this.page.getByText('Selecione um tipo de cartão').click();
    await this.page.getByText('Cartão Físico - Saldo Livre').click();
    await this.page.waitForTimeout(500);

    // Solicitar Cartão
    await this.page.getByRole('button', { name: 'Solicitar Cartão' }).click();
    await this.page.waitForTimeout(2000);

    // Solicitar mais cartões se necessário
    for (let i = 1; i < quantidade; i++) {
      await this.page.waitForTimeout(1000);
      await this.page.getByRole('button', { name: 'Solicitar mais cartões' }).click();

      // Preencher CPF novamente
      const cpfInputAdicional = this.page.getByRole('textbox', { name: 'CPF*' });
      await cpfInputAdicional.click();
      await cpfInputAdicional.fill(cpf);
      await this.page.waitForTimeout(1000);

      // Preencher Nome Completo novamente
      const nomeInputAdicional = this.page.getByRole('textbox', { name: 'Nome completo*' });
      await nomeInputAdicional.click();
      await nomeInputAdicional.fill(nomeCompleto);

      // Preencher Email novamente
      const emailInputAdicional = this.page.getByRole('textbox', { name: 'Email*' });
      await emailInputAdicional.click();
      await emailInputAdicional.fill(email);

      // Selecionar Perfil novamente
      await this.page.getByRole('textbox', { name: 'Perfil*' }).click();
      await this.page.getByText('Operador').click();
      await this.page.waitForTimeout(500);

      // Selecionar Tipo de Cartão (Físico) novamente
      await this.page.getByText('Selecione um tipo de cartão').click();
      await this.page.getByText('Cartão Físico - Saldo Livre').click();
      await this.page.waitForTimeout(500);

      // Solicitar Cartão novamente
      await this.page.getByRole('button', { name: 'Solicitar Cartão' }).click();
    }

    return { cpf, nomeCompleto, email, tipoCartao: 'Cartão Físico - Saldo Livre', quantidade };
  }
}

module.exports = SolicitacaoCartaoClientePage;
