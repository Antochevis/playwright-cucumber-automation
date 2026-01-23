require('dotenv').config();

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL);
  }

  async login(email, senha) {
    await this.goto();
    await this.page.getByRole('textbox', { name: 'Email*' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Senha*' }).fill(senha);
    await this.page.getByRole('button', { name: 'Entrar' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectAuthenticated() {
    await this.page.waitForURL(/.*\/admin|.*\/dashboard|.*\/home|.*\/empresas|.*\/cartoes/, { timeout: 15000 });
  }
}

module.exports = LoginPage;