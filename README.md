# Automação de Testes - Pontopass
**Automação profissional usando Playwright e Cucumber (BDD) com Page Object Model**

---

## Visão Geral

Framework robusto e escalável para testes E2E de aplicações web, seguindo as **melhores práticas de engenharia de automação**:

- **Page Object Model (POM)** - Centralização de seletores e lógica de UI  
- **BDD com Cucumber** - Cenários descritivos e legíveis  
- **Padrão Page Base** - Métodos auxiliares reutilizáveis  
- **Geração de Dados Inteligente** - CPF válido, emails únicos, dados realistas  
- **Múltiplos Perfis** - Testes para Integrador, Proprietário, Cliente, Passageiro  
- **Code Quality** - ESLint, Prettier, formatação consistente  
- **CI/CD Ready** - Suporte a Jenkins, GitLab CI, GitHub Actions  
- **Relatórios HTML** - Visualização clara dos resultados  

---

## Estrutura do Projeto

```
automacao-pontopass/
├── features/                          # Cenários BDD (Gherkin)
│   ├── login.feature                  # 4 perfis diferentes
│   ├── cadastro*.feature              # Cadastro usuários/clientes/proprietários
│   ├── solicitacaoCartao*.feature     # Solicitação de cartões
│   ├── distribuirSaldo*.feature       # Distribuição de saldo
│   └── adicionarCredito.feature       # Adição de crédito
│
├── steps/                             # Step Definitions (orquestração)
│   ├── login.steps.js                 # Steps de login
│   ├── cadastro*.steps.js             # Steps de cadastro
│   └── ...
│
├── pages/                             # Page Object Model
│   ├── BasePage.js                    # Classe base com helpers
│   ├── Login.page.js                  # Page object para login
│   ├── SolicitacaoCartao.page.js      # Classe genérica (sem duplicação)
│   └── ...
│
├── support/
│   ├── hooks.js                       # Before/After + inicialização
│   └── BasePage.js                    # Métodos auxiliares para todas as pages
│
├── utils/                             # Utilitários
│   └── gerador.js                     # CPF, email, nomes, telefones
│
├── .env                               # Credenciais (gitignored)
├── .env.example                       # Exemplo de .env
├── .eslintrc.json                     # Configuração ESLint
├── .prettierrc                        # Configuração Prettier
├── cucumber.js                        # Configuração Cucumber com profiles
├── package.json                       # Dependências e scripts
└── README.md                          # Este arquivo
```

---

## Instalação

### Pré-requisitos
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Passos

```bash
# Clone o repositório
git clone <seu-repositorio>
cd automacao-pontopass

# Instale as dependências
npm install

# Copie o arquivo de configuração
cp .env.example .env

# Preencha as credenciais em .env
```

---

## ⚙️ Configuração

### 1. Arquivo `.env`

```env
# URL da aplicação
BASE_URL=https://pontopasshml.passagensweb.com.br/login

# Credenciais dos 4 perfis
INTEGRADOR_EMAIL=integrador@exemplo.com
INTEGRADOR_PASSWORD=SuaSenha123

PROPRIETARIO_EMAIL=proprietario@exemplo.com
PROPRIETARIO_PASSWORD=SuaSenha123

CLIENTE_EMAIL=cliente@exemplo.com
CLIENTE_PASSWORD=SuaSenha123

PASSAGEIRO_EMAIL=passageiro@exemplo.com
PASSAGEIRO_PASSWORD=SuaSenha123

# Configuração de email para geração automática
EMAIL_DOMAIN=rodosoft.com.br
```

**⚠️ IMPORTANTE**: Nunca commite o arquivo `.env` com credenciais reais!

---

## Executando os Testes

### Scripts Disponíveis

```bash
# Testes padrão (desenvolvimento)
npm test

# Testes com profile de desenvolvimento (mais verboso)
npm test:dev

# Testes para CI/CD (headless, paralelizado)
npm test:ci

# Debug: gera relatório JSON
npm test:debug

# Verificar código (linting)
npm run lint

# Corrigir código (auto-fix ESLint)
npm run lint:fix

# Formatar código (Prettier)
npm run format
```

### Exemplos

```bash
# Rodar apenas um arquivo de feature
npm test -- features/login.feature

# Rodar com tags específicas
npm test -- --tags "@focus"

# Pular testes marcados com @skip
npm test -- --tags "not @skip"
```

---

## 📚 Padrões e Arquitetura

### 1. **Page Object Model (POM)**

Toda lógica de UI está encapsulada nas `pages/`:

```javascript
class SolicitacaoCartaoPage extends BasePage {
  async solicitarCartao(cpf) {
    // Lógica encapsulada
  }
}
```

### 2. **BasePage - Métodos Auxiliares**

Classe base com helpers reutilizáveis:

```javascript
class BasePage {
  async waitForMessage(message, timeout = 5000) { /* ... */ }
  async click(selector) { /* ... */ }
  async fill(selector, text) { /* ... */ }
  logSuccess(message) { /* ... */ }
}
```

### 3. **BDD com Cucumber**

Cenários descritos em linguagem natural (Gherkin).

---

## Code Quality

### ESLint + Prettier

```bash
npm run lint        # Verificar problemas
npm run lint:fix    # Corrigir automaticamente
npm run format      # Formatar código
```

---

## Relatórios

Os testes geram relatórios HTML automaticamente em `reports/cucumber-report.html`

---

## Funcionalidades Implementadas

- Login (4 perfis)  
- Cadastro (Usuários, Proprietários, Clientes)  
- Solicitação de Cartão (Virtual e Físico)  
- Distribuição de Saldo  
- Adição de Crédito (com @skip)

---

## Tecnologias

| Ferramenta | Versão |
|-----------|--------|
| Playwright | 1.48.0 |
| Cucumber | 10.0.0 |
| Node.js | 24.12.0+ |
| ESLint | 8.56.0 |
| Prettier | 3.2.5 |

---

**Versão**: 1.0.0 (Refatorado - Profissional)  
**Atualizado**: Fevereiro 2026
