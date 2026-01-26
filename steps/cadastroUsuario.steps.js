const { Given, When, Then } = require('@cucumber/cucumber');

Given('que eu faco login como {string}', async function(perfil) {
  const credenciais = {
    integrador: {
      email: process.env.INTEGRADOR_EMAIL,
      senha: process.env.INTEGRADOR_PASSWORD
    },
    proprietario: {
      email: process.env.PROPRIETARIO_EMAIL,
      senha: process.env.PROPRIETARIO_PASSWORD
    },
    cliente: {
      email: process.env.CLIENTE_EMAIL,
      senha: process.env.CLIENTE_PASSWORD
    }
  };

  const { email, senha } = credenciais[perfil];
  await this.loginPage.login(email, senha);
});

When('eu cadastro um novo usuario no sistema', async function() {
  this.dadosUsuario = await this.cadastroUsuarioPage.cadastrarUsuario();
  this.cpfOperadorCadastrado = this.dadosUsuario.cpf; // Salva CPF para solicitação de cartão
  
  // Aguarda validação e redirecionamento completar
  await this.cadastroUsuarioPage.validarCadastroSucesso();
  await this.page.waitForTimeout(5000); // Aguarda redirecionamento para listagem
});

Then('o usuario deve ser cadastrado com sucesso', async function() {
  await this.cadastroUsuarioPage.validarCadastroSucesso();
});
