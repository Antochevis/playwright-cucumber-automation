require('dotenv').config();
const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const LoginPage = require('../pages/Login.page');
const CadastroPage = require('../pages/Cadastro.page');
const CadastroUsuarioPage = require('../pages/CadastroUsuario.page');
const CadastroProprietariosEContratosPage = require('../pages/CadastroProprietariosEContratos.page');
const CadastroClientesEContratosPage = require('../pages/CadastroClientesEContratos.page');
const SolicitacaoCartaoProprietarioPage = require('../pages/SolicitacaoCartaoProprietario.page');
const SolicitacaoCartaoClientePage = require('../pages/SolicitacaoCartaoCliente.page');

setDefaultTimeout(60000);

let browser;
let page;

Before(async function() {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  this.browser = browser;
  this.page = page;
  this.loginPage = new LoginPage(page);
  this.cadastroPage = new CadastroPage(page);
  this.cadastroUsuarioPage = new CadastroUsuarioPage(page);
  this.cadastroProprietariosEContratosPage = new CadastroProprietariosEContratosPage(page);
  this.cadastroClientesEContratosPage = new CadastroClientesEContratosPage(page);
  this.solicitacaoCartaoProprietarioPage = new SolicitacaoCartaoProprietarioPage(page);
  this.solicitacaoCartaoClientePage = new SolicitacaoCartaoClientePage(page);
});

After(async function() {
  await browser.close();
});
After(async function() {
  if (browser) {
    await browser.close();
  }
});
module.exports = {};
