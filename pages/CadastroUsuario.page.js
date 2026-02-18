const { gerarCpf, gerarNome, gerarEmail, gerarPermissoesPorPerfil } = require('../utils/gerador');

class CadastroUsuarioPage {
  constructor(page) {
    this.page = page;
  }

  async cadastrarUsuario(dados = {}, perfil = 'proprietario') {
    const {
      cpf = gerarCpf(),
      nome = gerarNome(),
      email = gerarEmail('test')
    } = dados;

    const permissoes = gerarPermissoesPorPerfil(perfil);

    await this.page.getByRole('link', { name: 'Usuários' }).click();
    await this.page.getByRole('button', { name: 'Cadastrar' }).click();
    
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
    await this.page.getByText('Operador').click();
    
    await this.page.getByRole('textbox', { name: 'Permissões de operador' }).click();
    
    // Selecionar permissões dinamicamente
    for (const permissao of permissoes) {
      const permissaoElement = this.page.getByText(permissao);
      const isVisible = await permissaoElement.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (isVisible) {
        await permissaoElement.click();
      }
    }
    
    await this.page.getByRole('button', { name: 'Cadastrar' }).click();
    await this.page.getByText('Cadastro realizado com sucesso').waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByText('E-mail para criação de senha').waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByRole('heading', { name: 'Usuários' }).waitFor({ state: 'visible', timeout: 10000 });

    return { cpf, nome, email, perfil, permissoes };
  }
}

module.exports = CadastroUsuarioPage;
