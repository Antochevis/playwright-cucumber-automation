const { gerarCNPJ, gerarRazaoSocial, gerarNomeFantasia, gerarEmail, gerarTelefone, gerarCEP, gerarCodigo, gerarIE } = require('../utils/gerador');

class CadastroClientesEContratosPage {
  constructor(page) {
    this.page = page;
  }

  async cadastrarClienteComContrato(dadosCliente = {}, dadosContrato = {}) {
    const {
      codigo = gerarCodigo(),
      cnpj = gerarCNPJ(),
      ie = gerarIE(),
      razaoSocial = gerarRazaoSocial(),
      nomeFantasia = gerarNomeFantasia(),
      email = gerarEmail('andrey'),
      cep = gerarCEP(),
      numero = Math.floor(Math.random() * 9000) + 1000,
      telefone = gerarTelefone(),
      emailContato = gerarEmail('andrey')
    } = dadosCliente;

    const {
      chavePix = 'chavepixexemplo',
      tipoChave = 'exemplo'
    } = dadosContrato;

    await this.page.getByRole('link', { name: 'Clientes e contratos' }).click();
    await this.page.getByRole('link', { name: 'Cadastrar' }).click();
    
    await this.page.getByRole('textbox', { name: 'Código' }).click();
    await this.page.getByRole('textbox', { name: 'Código' }).fill(codigo.toString());
    
    const cnpjInput = this.page.getByRole('textbox', { name: 'CNPJ' });
    await cnpjInput.click();
    await this.page.waitForTimeout(300);
    await cnpjInput.fill(cnpj);
    await this.page.waitForTimeout(500);
    
    await this.page.getByRole('textbox', { name: 'Inscrição Estadual (IE)' }).click();
    await this.page.getByRole('textbox', { name: 'Inscrição Estadual (IE)' }).fill(ie.toString());
    
    await this.page.getByRole('textbox', { name: 'Razão Social' }).click();
    await this.page.getByRole('textbox', { name: 'Razão Social' }).fill(razaoSocial);
    
    await this.page.getByRole('textbox', { name: 'Nome Fantasia' }).click();
    await this.page.getByRole('textbox', { name: 'Nome Fantasia' }).fill(nomeFantasia);
    
    await this.page.getByRole('textbox', { name: 'E-mail' }).click();
    await this.page.getByRole('textbox', { name: 'E-mail' }).fill(email);
    
    const cepInput = this.page.getByRole('textbox', { name: 'CEP' });
    await cepInput.click();
    await this.page.waitForTimeout(300);
    await cepInput.fill(cep);
    await this.page.keyboard.press('Tab');
    await this.page.waitForTimeout(3000);
    
    await this.page.getByRole('spinbutton', { name: 'Número' }).click();
    await this.page.getByRole('spinbutton', { name: 'Número' }).fill(numero.toString());
    
    await this.page.getByRole('textbox', { name: 'Telefone' }).click();
    await this.page.getByRole('textbox', { name: 'Telefone' }).fill(telefone);
    
    await this.page.getByRole('textbox', { name: 'Email para contato' }).click();
    await this.page.getByRole('textbox', { name: 'Email para contato' }).fill(emailContato);
    
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(500);
    
    await this.page.getByRole('button', { name: 'Cadastrar' }).click();
    await this.page.getByText('Empresa cadastrada com sucesso', { exact: true }).waitFor({ state: 'visible', timeout: 10000 });
    
    await this.page.getByRole('button', { name: 'Sim' }).click();
    
    await this.page.getByRole('checkbox', { name: 'Saldo Livre' }).check();
    await this.page.getByRole('checkbox', { name: 'Vale Saúde' }).check();
    await this.page.getByRole('checkbox', { name: 'Vale Transporte' }).check();
    await this.page.getByRole('checkbox', { name: 'Compras presenciais (Cartão F' }).check();
    await this.page.getByRole('checkbox', { name: 'Compras online (Cartão' }).check();
    await this.page.getByRole('checkbox', { name: 'PIX' }).check();
    
    await this.page.getByRole('textbox', { name: 'Chave PIX*' }).click();
    await this.page.getByRole('textbox', { name: 'Chave PIX*' }).fill(chavePix);
    
    await this.page.getByRole('textbox', { name: 'Tipo de Chave*' }).click();
    await this.page.getByRole('textbox', { name: 'Tipo de Chave*' }).fill(tipoChave);
    
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('button', { name: 'Salvar' }).click();

    return { 
      cliente: { codigo, cnpj, ie, razaoSocial, nomeFantasia, email, cep, numero, telefone, emailContato },
      contrato: { chavePix, tipoChave }
    };
  }

  async cadastrarCliente(dadosCliente = {}) {
    const {
      codigo = gerarCodigo(),
      cnpj = gerarCNPJ(),
      ie = gerarIE(),
      razaoSocial = gerarRazaoSocial(),
      nomeFantasia = gerarNomeFantasia(),
      email = gerarEmail('andrey'),
      cep = gerarCEP(),
      numero = Math.floor(Math.random() * 9000) + 1000,
      telefone = gerarTelefone(),
      emailContato = gerarEmail('andrey')
    } = dadosCliente;

    await this.page.getByRole('link', { name: 'Clientes e contratos' }).click();
    await this.page.getByRole('link', { name: 'Cadastrar' }).click();
    
    await this.page.getByRole('textbox', { name: 'Código' }).click();
    await this.page.getByRole('textbox', { name: 'Código' }).fill(codigo.toString());
    
    const cnpjInput = this.page.getByRole('textbox', { name: 'CNPJ' });
    await cnpjInput.click();
    await this.page.waitForTimeout(300);
    await cnpjInput.fill(cnpj);
    await this.page.waitForTimeout(500);
    
    await this.page.getByRole('textbox', { name: 'Inscrição Estadual (IE)' }).click();
    await this.page.getByRole('textbox', { name: 'Inscrição Estadual (IE)' }).fill(ie.toString());
    
    await this.page.getByRole('textbox', { name: 'Razão Social' }).click();
    await this.page.getByRole('textbox', { name: 'Razão Social' }).fill(razaoSocial);
    
    await this.page.getByRole('textbox', { name: 'Nome Fantasia' }).click();
    await this.page.getByRole('textbox', { name: 'Nome Fantasia' }).fill(nomeFantasia);
    
    await this.page.getByRole('textbox', { name: 'E-mail' }).click();
    await this.page.getByRole('textbox', { name: 'E-mail' }).fill(email);
    
    const cepInput = this.page.getByRole('textbox', { name: 'CEP' });
    await cepInput.click();
    await this.page.waitForTimeout(300);
    await cepInput.fill(cep);
    await this.page.keyboard.press('Tab');
    await this.page.waitForTimeout(3000);
    
    await this.page.getByRole('spinbutton', { name: 'Número' }).click();
    await this.page.getByRole('spinbutton', { name: 'Número' }).fill(numero.toString());
    
    await this.page.getByRole('textbox', { name: 'Telefone' }).click();
    await this.page.getByRole('textbox', { name: 'Telefone' }).fill(telefone);
    
    await this.page.getByRole('textbox', { name: 'Email para contato' }).click();
    await this.page.getByRole('textbox', { name: 'Email para contato' }).fill(emailContato);
    
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(500);
    
    await this.page.getByRole('button', { name: 'Cadastrar' }).click();
    await this.page.getByText('Empresa cadastrada com sucesso', { exact: true }).waitFor({ state: 'visible', timeout: 10000 });
    
    await this.page.getByRole('button', { name: 'Não' }).click();

    return { codigo, cnpj, ie, razaoSocial, nomeFantasia, email, cep, numero, telefone, emailContato };
  }

  async cadastrarContrato(dadosContrato = {}) {
    const {
      chavePix = 'chavepixexemplo',
      tipoChave = 'exemplo'
    } = dadosContrato;

    await this.page.getByRole('link', { name: 'Clientes e contratos' }).click();
    await this.page.waitForTimeout(1000);
    
    let botaoEncontrado = false;
    let tentativas = 0;
    const maxTentativas = 10;
    
    while (!botaoEncontrado && tentativas < maxTentativas) {
      const botaoGerarContrato = this.page.getByRole('button', { name: 'Gerar Contrato' }).first();
      const isBotaoVisivel = await botaoGerarContrato.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (isBotaoVisivel) {
        await botaoGerarContrato.click();
        botaoEncontrado = true;
      } else {
        const botaoProxima = this.page.getByRole('button', { name: 'Próxima página' });
        const temProxima = await botaoProxima.isEnabled({ timeout: 1000 }).catch(() => false);
        
        if (temProxima) {
          await botaoProxima.click();
          await this.page.waitForTimeout(1000);
          tentativas++;
        } else {
          throw new Error('Botão "Gerar Contrato" não encontrado em nenhuma página');
        }
      }
    }
    
    if (!botaoEncontrado) {
      throw new Error('Botão "Gerar Contrato" não encontrado após ' + maxTentativas + ' páginas');
    }
    
    await this.page.getByRole('checkbox', { name: 'Saldo Livre' }).check();
    await this.page.getByRole('checkbox', { name: 'Vale Saúde' }).check();
    await this.page.getByRole('checkbox', { name: 'Vale Transporte' }).check();
    await this.page.getByRole('checkbox', { name: 'Compras presenciais (Cartão F' }).check();
    await this.page.getByRole('checkbox', { name: 'Compras online (Cartão' }).check();
    await this.page.getByRole('checkbox', { name: 'PIX' }).check();
    
    await this.page.getByRole('textbox', { name: 'Chave PIX*' }).click();
    await this.page.getByRole('textbox', { name: 'Chave PIX*' }).fill(chavePix);
    
    await this.page.getByRole('textbox', { name: 'Tipo de Chave*' }).click();
    await this.page.getByRole('textbox', { name: 'Tipo de Chave*' }).fill(tipoChave);
    
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('button', { name: 'Salvar' }).click();

    return { chavePix, tipoChave };
  }

  async validarCadastroClienteSucesso() {
    await this.page.getByText('Empresa cadastrada com sucesso', { exact: true }).waitFor({ state: 'visible', timeout: 10000 });
  }

  async validarCadastroContratoSucesso() {
    await this.page.getByText('Contrato salvo com sucesso!').waitFor({ state: 'visible', timeout: 10000 });
  }

  async validarCadastroCompletoSucesso() {
    await this.page.getByText('Contrato salvo com sucesso!').waitFor({ state: 'visible', timeout: 10000 });
  }
}

module.exports = CadastroClientesEContratosPage;
