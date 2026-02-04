class BasePage {
  constructor(page) {
    this.page = page;
  }

  async click(selector) {
    if (selector.includes('role')) {
      const match = selector.match(/getByRole\(['"](\w+)['"],\s*{\s*name:\s*['"]([^'"]+)['"]\s*}\)/);
      if (match) {
        const [, role, name] = match;
        await this.page.getByRole(role, { name }).click();
        return;
      }
    }
    await this.page.locator(selector).click();
  }

  async fill(selector, text) {
    const locator = this.page.getByRole('textbox', { name: selector }) || this.page.locator(selector);
    await locator.click();
    await locator.fill(text);
  }

  async waitForElement(selector, timeout = 5000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  async waitForMessage(message, timeout = 5000) {
    try {
      await this.page.getByText(message).waitFor({ state: 'visible', timeout });
      return true;
    } catch (error) {
      throw new Error(`Mensagem não encontrada: "${message}" dentro de ${timeout}ms`);
    }
  }

  async waitForOneOfMessages(messages, timeout = 5000) {
    for (const message of messages) {
      try {
        await this.page.getByText(message).waitFor({ state: 'visible', timeout });
        return message;
      } catch {
      }
    }
    throw new Error(`Nenhuma das mensagens encontradas: ${messages.join(', ')}`);
  }

  async getText(selector) {
    return await this.page.locator(selector).textContent();
  }
  async waitForURL(pattern, timeout = 15000) {
    await this.page.waitForURL(pattern, { timeout });
  }

  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForElementHidden(selector, timeout = 5000) {
    await this.page.locator(selector).waitFor({ state: 'hidden', timeout });
  }

  log(message) {
    console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
  }

  logSuccess(message) {
    console.log(`${message}`);
  }

  logError(message) {
    console.error(`${message}`);
  }
}

module.exports = BasePage;
