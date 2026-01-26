Feature: Solicitacao de Cartao pelo Proprietario
  Como proprietario no sistema
  Quero solicitar cartoes para operadores cadastrados
  Para permitir acesso deles ao sistema de transporte

  Scenario: Solicitar cartao para operador cadastrado
    Given que eu faco login como "proprietario"
    And eu cadastro um novo usuario no sistema
    When eu solicito um cartao para o operador cadastrado como proprietario
    Then o cartao deve ser solicitado com sucesso pelo proprietario
