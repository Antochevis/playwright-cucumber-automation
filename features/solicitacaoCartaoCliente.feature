Feature: Solicitacao de Cartao pelo Cliente

  Scenario: Solicitar cartao para operador cadastrado
    Given que eu faco login como "cliente"
    And eu cadastro um novo usuario no sistema
    When eu solicito um cartao para o operador cadastrado como cliente
    Then o cartao deve ser solicitado com sucesso pelo cliente
