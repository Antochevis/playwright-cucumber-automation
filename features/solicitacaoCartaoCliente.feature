@skip
Feature: Solicitacao de Cartao Virtual de Saldo Livre pelo Cliente
  Como cliente no sistema
  Quero solicitar cartoes virtuais de saldo livre para operadores
  Para permitir acesso deles ao sistema de transporte

  # Usuários Cadastrados
  Scenario: Solicitar cartao virtual de saldo livre para operador cadastrado
    Given que eu faco login como "cliente"
    And eu cadastro um novo usuario no sistema
    When eu solicito um cartao virtual de saldo livre para o operador cadastrado como cliente
    Then o cartao virtual de saldo livre deve ser solicitado com sucesso pelo cliente

  Scenario: Solicitar 1 cartao fisico de saldo livre para operador cadastrado
    Given que eu faco login como "cliente"
    And eu cadastro um novo usuario no sistema
    When eu solicito 1 cartao fisico de saldo livre para o operador cadastrado como cliente
    Then o pedido de cartao fisico deve ser gerado com sucesso pelo cliente

  Scenario: Solicitar 2 cartoes fisicos de saldo livre para operador cadastrado
    Given que eu faco login como "cliente"
    And eu cadastro um novo usuario no sistema
    When eu solicito 2 cartoes fisicos de saldo livre para o operador cadastrado como cliente
    Then o pedido de cartoes fisicos deve ser gerado com sucesso pelo cliente

  # Usuários Não Cadastrados
  Scenario: Solicitar cartao virtual de saldo livre para operador nao cadastrado
    Given que eu faco login como "cliente"
    When eu solicito um cartao virtual de saldo livre para um operador nao cadastrado como cliente
    Then o cartao virtual de saldo livre deve ser solicitado com sucesso pelo cliente

  Scenario: Solicitar 1 cartao fisico de saldo livre para operador nao cadastrado
    Given que eu faco login como "cliente"
    When eu solicito 1 cartao fisico de saldo livre para um operador nao cadastrado como cliente
    Then o pedido de cartao fisico deve ser gerado com sucesso pelo cliente

  Scenario: Solicitar 2 cartoes fisicos de saldo livre para operador nao cadastrado
    Given que eu faco login como "cliente"
    When eu solicito 2 cartoes fisicos de saldo livre para um operador nao cadastrado como cliente
    Then o pedido de cartoes fisicos deve ser gerado com sucesso pelo cliente
