Feature: Solicitacao de Cartao pelo Cliente
  Como cliente no sistema
  Quero solicitar cartoes para operadores cadastrados
  Para permitir acesso deles ao sistema de transporte

  @skip
  Scenario: Solicitar cartao para operador cadastrado
    Given que eu faco login como "cliente"
    And eu cadastro um novo usuario no sistema
    When eu solicito um cartao para o operador cadastrado como cliente
    Then o cartao deve ser solicitado com sucesso pelo cliente
