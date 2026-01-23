require('dotenv').config();
const { Given, When, Then } = require('@cucumber/cucumber');

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
  },
  passageiro: {
    email: process.env.PASSAGEIRO_EMAIL,
    senha: process.env.PASSAGEIRO_PASSWORD
  }
};

Given('que eu acesso a pagina de login', async function() {
  await this.loginPage.goto();
});

When('eu faco login como {string}', async function(perfil) {
  const { email, senha } = credenciais[perfil];
  await this.loginPage.login(email, senha);
});

Then('devo estar autenticado no sistema', async function() {
  await this.loginPage.expectAuthenticated();
});