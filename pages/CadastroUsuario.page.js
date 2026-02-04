const { gerarCpf } = require('../utils/gerador');
const { gerarNome, gerarEmail } = require('../utils/gerador');

class CadastroUsuarioPage {
  constructor(page) {
    this.page = page;
  }

  async cadastrarUsuario(dados = {}) {
    const {
      cpf = gerarCpf(),
      nome = gerarNome(),
      email = gerarEmail('andrey'),
      perfil = 'Operador'
    } = dados;

    await this.page.getByRole('link', { name: 'Usuários' }).click();
    await this.page.getByRole('link', { name: 'Cadastrar' }).click();
    
    const cpfInput = this.page.getByRole('textbox', { name: 'CPF*' });
    await cpfInput.click();
    await this.page.waitForTimeout(300);
    await cpfInput.fill(cpf);
    await this.page.waitForTimeout(500);
    
    await this.page.getByRole('textbox', { name: 'Nome completo*' }).click();
    await this.page.getByRole('textbox', { name: 'Nome completo*' }).fill(nome);
    
    await this.page.getByRole('textbox', { name: 'Email*' }).click();
    await this.page.getByRole('textbox', { name: 'Email*' }).fill(email);
    
    await this.page.getByRole('textbox', { name: 'Perfil*' }).click();
    await this.page.getByText(perfil).click();
    
    await this.page.getByRole('button', { name: 'Cadastrar' }).click();

    return { cpf, nome, email, perfil };
  }

  async validarCadastroSucesso() {
    await this.page.getByText('Cadastro realizado com sucesso').waitFor({ state: 'visible', timeout: 10000 });
  }
}

module.exports = CadastroUsuarioPage;
