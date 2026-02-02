const BasePage = require('../support/BasePage');
const { gerarCPF } = require('../utils/gerador');

class SolicitacaoCartaoPage extends BasePage {
  constructor(page) {
    super(page);
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

    this.logSuccess(`Cartão virtual solicitado com sucesso para CPF ${cpf}`);
    return { cpf, tipoCartao, pin };
  }

  async solicitarCartoesFisicos(cpf, quantidade = 1) {
    await this.page.getByRole('link', { name: 'Cartões' }).click();
    await this.page.getByRole('link', { name: 'Solicitar Cartão' }).click();

    const cpfInput = this.page.getByRole('textbox', { name: 'CPF*' });
    await cpfInput.click();
    await cpfInput.fill(cpf);
    await this.page.waitForTimeout(1000);

    await this.page.getByText('Selecione um tipo de cartão').click();
    await this.page.getByText('Cartão Físico - Saldo Livre').click();

    await this.page.getByRole('button', { name: 'Solicitar Cartão' }).click();

    for (let i = 1; i < quantidade; i++) {
      await this.page.getByRole('button', { name: 'Solicitar mais cartões' }).click();

      const cpfInputAdicional = this.page.getByRole('textbox', { name: 'CPF*' });
      await cpfInputAdicional.click();
      await cpfInputAdicional.fill(cpf);
      await this.page.waitForTimeout(1000);

      await this.page.getByText('Selecione um tipo de cartão').click();
      await this.page.getByText('Cartão Físico - Saldo Livre').click();

      await this.page.getByRole('button', { name: 'Solicitar Cartão' }).click();
    }

    this.logSuccess(`${quantidade} cartão(ões) físico(s) solicitado(s) com sucesso para CPF ${cpf}`);
    return { cpf, tipoCartao: 'Cartão Físico - Saldo Livre', quantidade };
  }

  async gerarPedidoCartaoFisico(descricao = 'Pedido de cartão físico - teste automatizado', quantidade = 1) {

    await this.waitForOneOfMessages([
      'Cartão criado com sucesso!',
      'Cartão solicitado com sucesso!'
    ], 10000);

    const botaoTexto = quantidade === 1 ? 'Gerar pedido agora' : 'Gerar pedido';
    await this.page.getByRole('button', { name: botaoTexto }).click();

    await this.page.getByRole('dialog').getByRole('button', { name: 'Gerar pedido' }).click();

    await this.page.getByRole('textbox', { name: 'Descrição*' }).click();
    await this.page.getByRole('textbox', { name: 'Descrição*' }).fill(descricao);

    await this.page.getByRole('button', { name: 'Confirmar' }).click();

    this.logSuccess('Pedido de cartão gerado com sucesso');
    return { descricao, quantidade };
  }

  async validarSolicitacaoSucesso() {
    await this.waitForOneOfMessages([
      'Cartão solicitado com sucesso!',
      'Cartão criado com sucesso!',
      'E-mail para criação de senha'
    ], 15000);
    this.logSuccess('Solicitação de cartão validada com sucesso');
  }

  async validarPedidoGeradoSucesso() {
    await this.waitForMessage('Pedido de cartão enviado para', 15000);
    this.logSuccess('Pedido de cartão validado com sucesso');
  }

  async solicitarCartaoParaUsuarioNaoCadastrado(dadosCartao = {}) {
    const cpf = gerarCPF();
    const nomeCompleto = 'Usuário Teste Automatizado';
    const email = `andrey+${Date.now()}@rodosoft.com.br`;
    
    this.log(`Gerando CPF: ${cpf}`);
    return await this.solicitarCartaoCompleto(cpf, nomeCompleto, email, dadosCartao);
  }

  async solicitarCartaoCompleto(cpf, nomeCompleto, email, dadosCartao = {}) {
    const {
      tipoCartao = 'Cartão Virtual - Saldo Livre',
      pin = '1234'
    } = dadosCartao;

    await this.page.getByRole('link', { name: 'Cartões' }).click();
    await this.page.getByRole('link', { name: 'Solicitar Cartão' }).click();

    const cpfInput = this.page.getByRole('textbox', { name: 'CPF*' });
    await cpfInput.click();
    await cpfInput.fill(cpf);
    await this.page.waitForTimeout(1000);

    const nomeInput = this.page.getByRole('textbox', { name: 'Nome completo*' });
    await nomeInput.click();
    await nomeInput.fill(nomeCompleto);

    const emailInput = this.page.getByRole('textbox', { name: 'Email*' });
    await emailInput.click();
    await emailInput.fill(email);

    await this.page.getByRole('textbox', { name: 'Perfil*' }).click();
    await this.page.getByText('Operador').click();
    await this.page.waitForTimeout(500);

    await this.page.getByText('Selecione um tipo de cartão').click();
    await this.page.getByText(tipoCartao).click();

    if (tipoCartao.includes('Virtual')) {
      await this.page.getByRole('textbox', { name: 'Pin*' }).click();
      await this.page.getByRole('textbox', { name: 'Pin*' }).fill(pin);
    }

    await this.page.getByRole('button', { name: 'Solicitar Cartão' }).click();

    this.logSuccess(`Cartão ${tipoCartao} solicitado para novo usuário: ${email}`);
    return { cpf, nomeCompleto, email, tipoCartao, pin };
  }

  async solicitarCartoesFisicosParaUsuarioNaoCadastrado(quantidade = 1) {
    const cpf = gerarCPF();
    const nomeCompleto = 'Usuário Teste Automatizado';
    const email = `andrey+${Date.now()}@rodosoft.com.br`;
    
    this.log(`Gerando CPF: ${cpf}`);
    return await this.solicitarCartoesFisicosCompletos(cpf, nomeCompleto, email, quantidade);
  }

  async solicitarCartoesFisicosCompletos(cpf, nomeCompleto, email, quantidade = 1) {
    await this.page.getByRole('link', { name: 'Cartões' }).click();
    await this.page.getByRole('link', { name: 'Solicitar Cartão' }).click();

    const cpfInput = this.page.getByRole('textbox', { name: 'CPF*' });
    await cpfInput.click();
    await cpfInput.fill(cpf);
    await this.page.waitForTimeout(1000);

    const nomeInput = this.page.getByRole('textbox', { name: 'Nome completo*' });
    await nomeInput.click();
    await nomeInput.fill(nomeCompleto);

    const emailInput = this.page.getByRole('textbox', { name: 'Email*' });
    await emailInput.click();
    await emailInput.fill(email);

    await this.page.getByRole('textbox', { name: 'Perfil*' }).click();
    await this.page.getByText('Operador').click();
    await this.page.waitForTimeout(500);

    await this.page.getByText('Selecione um tipo de cartão').click();
    await this.page.getByText('Cartão Físico - Saldo Livre').click();

    await this.page.getByRole('button', { name: 'Solicitar Cartão' }).click();
    await this.page.waitForTimeout(2000);

    for (let i = 1; i < quantidade; i++) {
      await this.page.waitForTimeout(1000);
      await this.page.getByRole('button', { name: 'Solicitar mais cartões' }).click();

      const cpfInputAdicional = this.page.getByRole('textbox', { name: 'CPF*' });
      await cpfInputAdicional.click();
      await cpfInputAdicional.fill(cpf);
      await this.page.waitForTimeout(1000);

      const nomeInputAdicional = this.page.getByRole('textbox', { name: 'Nome completo*' });
      await nomeInputAdicional.click();
      await nomeInputAdicional.fill(nomeCompleto);

      const emailInputAdicional = this.page.getByRole('textbox', { name: 'Email*' });
      await emailInputAdicional.click();
      await emailInputAdicional.fill(email);

      await this.page.getByRole('textbox', { name: 'Perfil*' }).click();
      await this.page.getByText('Operador').click();
      await this.page.waitForTimeout(500);

      await this.page.getByText('Selecione um tipo de cartão').click();
      await this.page.getByText('Cartão Físico - Saldo Livre').click();

      await this.page.getByRole('button', { name: 'Solicitar Cartão' }).click();
      await this.page.waitForTimeout(2000);
    }

    this.logSuccess(`${quantidade} cartão(ões) físico(s) solicitado(s) para novo usuário: ${email}`);
    return { cpf, nomeCompleto, email, tipoCartao: 'Cartão Físico - Saldo Livre', quantidade };
  }

  /**
   * Solicita cartão(ões) físico(s) para usuário não cadastrado E gera o pedido
   * Fluxo completo: login > navegação > preenchimento > solicitação > geração de pedido
   */
  async solicitarCartoesFisicosCompletosComPedido(cpfBase, nomeCompleto, email, quantidade = 1, descricao = 'descricao') {
    // Navega para Cartões > Solicitar Cartão
    await this.page.getByRole('link', { name: 'Cartões' }).click();
    await this.page.getByRole('link', { name: 'Solicitar Cartão' }).click();
    await this.page.waitForTimeout(1000);

    // Preenche formulário para usuário novo
    for (let i = 0; i < quantidade; i++) {
      const cpf = gerarCPF(); // Gera um novo CPF a cada cartão
      const nomeUnico = `${nomeCompleto} ${i + 1}`;
      const emailBase = email.split('+')[0]; // Pega só "andrey" antes do primeiro +
      const emailDomain = email.split('@')[1]; // Pega "rodosoft.com.br"
      const emailUnico = `${emailBase}+${Date.now() + i}@${emailDomain}`;

      const cpfInput = this.page.getByRole('textbox', { name: 'CPF*' });
      await cpfInput.click();
      await this.page.waitForTimeout(800);
      await cpfInput.fill(cpf);
      await this.page.waitForTimeout(500);

      const nomeInput = this.page.getByRole('textbox', { name: 'Nome completo*' });
      await nomeInput.click();
      await this.page.waitForTimeout(500);
      await nomeInput.fill(nomeUnico);
      await this.page.waitForTimeout(500);

      const emailInput = this.page.getByRole('textbox', { name: 'Email*' });
      await emailInput.click();
      await this.page.waitForTimeout(500);
      await emailInput.fill(emailUnico);
      await this.page.waitForTimeout(500);

      await this.page.getByRole('textbox', { name: 'Perfil*' }).click();
      await this.page.waitForTimeout(400);
      await this.page.getByText('Operador').click();
      await this.page.waitForTimeout(500);

      await this.page.getByText('Selecione um tipo de cartão').click();
      await this.page.getByText('Cartão Físico - Saldo Livre').click();

      await this.page.getByRole('button', { name: 'Solicitar Cartão' }).click();
      await this.page.waitForTimeout(2000);

      // Valida sucesso da solicitação
      await this.waitForOneOfMessages([
        'Cartão solicitado com sucesso!',
        'E-mail para criação de senha'
      ], 10000);

      if (i < quantidade - 1) {
        // Se há mais cartões, clica "Solicitar mais cartões"
        await this.page.getByRole('button', { name: 'Solicitar mais cartões' }).click();
        await this.page.waitForTimeout(1000);
      }
    }

    // Gera pedido de cartão (após o último cartão)
    await this.page.getByRole('button', { name: 'Gerar pedido' }).click();
    await this.page.waitForTimeout(500);

    // Dialog: clica em Gerar pedido
    await this.page.getByRole('dialog').getByRole('button', { name: 'Gerar pedido' }).click();
    await this.page.waitForTimeout(500);

    // Preenche descrição e confirma
    const descricaoInput = this.page.getByRole('textbox', { name: 'Descrição*' });
    await descricaoInput.click();
    await this.page.waitForTimeout(300);
    await descricaoInput.fill(descricao);

    await this.page.getByRole('button', { name: 'Confirmar' }).click();
    await this.page.waitForTimeout(1000);

    // Valida sucesso do pedido
    await this.waitForMessage('Pedido de cartão enviado para', 10000);
    this.logSuccess(`Pedido de ${quantidade} cartão(ões) físico(s) gerado com sucesso`);

    return { cpfBase, nomeCompleto, email, tipoCartao: 'Cartão Físico - Saldo Livre', quantidade, descricao };
  }
}

module.exports = SolicitacaoCartaoPage;
