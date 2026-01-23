# Automação de Testes com Playwright e Cucumber

Projeto de automação de testes usando Playwright e Cucumber (BDD) em JavaScript com padrão Page Object Model.

## 🚀 Estrutura do Projeto

```
automacao_pontopass/
├── features/               # Cenários em Gherkin (*.feature)
│   ├── login.feature       # Testes de login (4 perfis)
│   └── cadastro.feature    # Cadastro de novo usuário
├── steps/                  # Step definitions
│   ├── login.steps.js
│   └── cadastro.steps.js
├── pages/                  # Page Object Model (POM)
│   ├── Login.page.js
│   └── Cadastro.page.js
├── support/                # Hooks e configurações
│   └── hooks.js            # Before/After + setup de pages
├── utils/                  # Utilitários
│   ├── cpf.js              # Gerador de CPF válido
│   └── gerador.js          # Gerador de nomes e emails
├── .env                    # Credenciais (NÃO COMMITADO)
├── .env.example            # Exemplo de configuração
├── cucumber.js             # Configuração do Cucumber
└── package.json
```

## 📦 Instalação

```bash
npm install
```

## ⚙️ Configuração

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Preencha as credenciais no arquivo `.env`:
```env
BASE_URL=https://sua-aplicacao.com.br/login

INTEGRADOR_EMAIL=seu_email@exemplo.com
INTEGRADOR_PASSWORD=SuaSenhaSegura123

PROPRIETARIO_EMAIL=seu_email@exemplo.com
PROPRIETARIO_PASSWORD=SuaSenhaSegura123

CLIENTE_EMAIL=seu_email@exemplo.com
CLIENTE_PASSWORD=SuaSenhaSegura123

PASSAGEIRO_EMAIL=seu_email@exemplo.com
PASSAGEIRO_PASSWORD=SuaSenhaSegura123
```

⚠️ **IMPORTANTE**: O arquivo `.env` contém informações sensíveis e já está no `.gitignore`. Nunca commite credenciais reais!

## 🧪 Executando os Testes

**Todos os testes:**
```bash
npm test
```

**Apenas login:**
```bash
npm test -- features/login.feature
```

**Apenas cadastro:**
```bash
npm test -- features/cadastro.feature
```

## 🛠️ Usando o Codegen

Para gerar novos passos automaticamente:

```bash
npx playwright codegen <SUA_URL_BASE>
```

Interaja com a aplicação e:
1. Copie o código gerado
2. Adapte para o POM correspondente em `pages/`
3. Crie/atualize os steps em `steps/`

## ✅ Funcionalidades Implementadas

### Login
- Login com 4 perfis diferentes (Integrador, Proprietário, Cliente, Passageiro)
- Validação de autenticação bem-sucedida
- Page Object: `Login.page.js`

### Cadastro de Usuário
- Cadastro via página "Criar Conta"
- Geração automática de CPF válido
- Geração automática de nomes aleatórios
- Email único com timestamp
- Page Object: `Cadastro.page.js`

## 📐 Padrões e Boas Práticas

### Page Object Model (POM)
- Toda lógica de UI está encapsulada nos POMs (`pages/`)
- Steps apenas orquestram chamadas aos POMs
- Seletores e ações centralizados

### Geração de Dados
- CPF válido gerado automaticamente (11 dígitos com validação)
- Nomes aleatórios de uma lista de 20 nomes
- Emails únicos: `prefixo+{timestamp}@{EMAIL_DOMAIN}`

### Hooks
- `Before`: Inicializa browser e POMs (`this.loginPage`, `this.cadastroPage`)
- `After`: Fecha browser
- Timeout padrão: 60 segundos

## 🔒 Segurança

Este projeto está configurado para uso seguro em repositórios públicos:
- ✅ Arquivo `.env` no `.gitignore`
- ✅ URLs hardcoded removidas (usam variáveis de ambiente)
- ✅ Arquivo `.env.example` com valores de exemplo
- ✅ Sem credenciais reais commitadas

## 📝 Tecnologias

- **Playwright**: 1.48.0
- **Cucumber**: 10.0.0
- **Node.js**: 24.12.0
- **dotenv**: 17.2.3

## Próximos Passos

- [ ] Cadastro de usuários logados (Integrador/Proprietário/Cliente)
- [ ] Testes de navegação pós-login
- [ ] Relatórios HTML customizados
- [ ] Integração CI/CD

