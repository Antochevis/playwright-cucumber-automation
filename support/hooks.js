require('dotenv').config();
const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const LoginPage = require('../pages/Login.page');
const CadastroPage = require('../pages/Cadastro.page');
const CadastroUsuarioPage = require('../pages/CadastroUsuario.page');
const CadastroProprietariosEContratosPage = require('../pages/CadastroProprietariosEContratos.page');
const CadastroClientesEContratosPage = require('../pages/CadastroClientesEContratos.page');
const SolicitacaoCartaoPage = require('../pages/SolicitacaoCartao.page');

setDefaultTimeout(60000);

let browser;
let context;
let page;

Before(async function(scenario) {
  console.log(`\n${'='.repeat(20)}`);
  console.log(`CENARIO: ${scenario.pickle.name}`);
  console.log(`${'='.repeat(20)}\n`);
  
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  
  page = await context.newPage();
  this.browser = browser;
  this.context = context;
  this.page = page;
  this.loginPage = new LoginPage(page);
  this.cadastroPage = new CadastroPage(page);
  this.cadastroUsuarioPage = new CadastroUsuarioPage(page);
  this.cadastroProprietariosEContratosPage = new CadastroProprietariosEContratosPage(page);
  this.cadastroClientesEContratosPage = new CadastroClientesEContratosPage(page);
  this.solicitacaoCartaoProprietarioPage = new SolicitacaoCartaoPage(page);
  this.solicitacaoCartaoClientePage = new SolicitacaoCartaoPage(page);
});

After(async () => {
  if (browser) {
    await browser.close();
  }
});

module.exports = {};
