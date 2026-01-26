# language: en
Feature: Cadastro de Usuarios no Sistema

  Scenario: Cadastrar usuario como Integrador
    Given que eu faco login como "integrador"
    When eu cadastro um novo usuario no sistema
    Then o usuario deve ser cadastrado com sucesso

  Scenario: Cadastrar usuario como Proprietario
    Given que eu faco login como "proprietario"
    When eu cadastro um novo usuario no sistema
    Then o usuario deve ser cadastrado com sucesso

  Scenario: Cadastrar usuario como Cliente
    Given que eu faco login como "cliente"
    When eu cadastro um novo usuario no sistema
    Then o usuario deve ser cadastrado com sucesso
