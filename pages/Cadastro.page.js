const { gerarCpf } = require('../utils/gerador');
const { gerarNome, gerarEmail } = require('../utils/gerador');

class CadastroPage {
  constructor(page) {
    this.page = page;
  }

  async irParaCriarConta() {
    const loginUrl = process.env.BASE_URL;
    await this.page.goto(loginUrl, { waitUntil: 'domcontentloaded' });
    await this.page.getByRole('link', { name: 'Criar Conta' }).click();
    await this.page.waitForURL('**/criar_conta*', { waitUntil: 'domcontentloaded' });
  }

  async cadastrarNovo(dados = {}) {
    const {
      cpf = gerarCpf(),
      nome = gerarNome(),
      email = gerarEmail('andrey')
    } = dados;

    await this.irParaCriarConta();

    const cpfInput = this.page.getByRole('textbox', { name: 'CPF*' });
    await cpfInput.click();
    await this.page.waitForTimeout(300);
    await cpfInput.fill(cpf);
    await this.page.waitForTimeout(500);
    
    await this.page.getByRole('textbox', { name: 'Nome completo*' }).click();
    await this.page.getByRole('textbox', { name: 'Nome completo*' }).fill(nome);
    
    await this.page.getByRole('textbox', { name: 'Email*' }).click();
    await this.page.getByRole('textbox', { name: 'Email*' }).fill(email);
    
    await this.page.locator('div').nth(2).click();
    await this.page.getByRole('button', { name: 'Cadastrar' }).click();
    await this.validarCadastroSucesso();

    return { cpf, nome, email };
  }

  async validarCadastroSucesso() {
    await this.page.getByText('Cadastro realizado com sucesso').waitFor({ state: 'visible', timeout: 10000 });
  }
}

module.exports = CadastroPage;
