Feature: Solicitacao de Cartao Virtual de Saldo Livre pelo Proprietario
  Como proprietario no sistema
  Quero solicitar cartoes virtuais de saldo livre para operadores
  Para permitir acesso deles ao sistema de transporte

  # Usuários Cadastrados
  Scenario: Solicitar cartao virtual de saldo livre para operador cadastrado
    Given que eu faco login como "proprietario"
    And eu cadastro um novo usuario no sistema
    When eu solicito um cartao virtual de saldo livre para o operador cadastrado como proprietario
    Then o cartao virtual de saldo livre deve ser solicitado com sucesso pelo proprietario

  Scenario: Solicitar 1 cartao fisico de saldo livre para operador cadastrado
    Given que eu faco login como "proprietario"
    And eu cadastro um novo usuario no sistema
    When eu solicito 1 cartao fisico de saldo livre para o operador cadastrado como proprietario
    Then o pedido de cartao fisico deve ser gerado com sucesso pelo proprietario

  Scenario: Solicitar 2 cartoes fisicos de saldo livre para operador cadastrado
    Given que eu faco login como "proprietario"
    And eu cadastro um novo usuario no sistema
    When eu solicito 2 cartoes fisicos de saldo livre para o operador cadastrado como proprietario
    Then o pedido de cartoes fisicos deve ser gerado com sucesso pelo proprietario

  # Usuários Não Cadastrados
  Scenario: Solicitar cartao virtual de saldo livre para operador nao cadastrado
    Given que eu faco login como "proprietario"
    When eu solicito um cartao virtual de saldo livre para um operador nao cadastrado como proprietario
    Then o cartao virtual de saldo livre deve ser solicitado com sucesso pelo proprietario

  Scenario: Solicitar 1 cartao fisico de saldo livre para operador nao cadastrado
    Given que eu faco login como "proprietario"
    When eu solicito 1 cartao fisico de saldo livre para um operador nao cadastrado como proprietario
    Then o pedido de cartao fisico deve ser gerado com sucesso pelo proprietario

  Scenario: Solicitar 2 cartoes fisicos de saldo livre para operador nao cadastrado
    Given que eu faco login como "proprietario"
    When eu solicito 2 cartoes fisicos de saldo livre para um operador nao cadastrado como proprietario
    Then o pedido de cartoes fisicos deve ser gerado com sucesso pelo proprietario
