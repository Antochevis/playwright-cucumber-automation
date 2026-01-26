Feature: Cadastro de Clientes e Contratos
  Como proprietario no sistema
  Quero cadastrar clientes e seus contratos
  Para gerenciar relacionamentos com clientes

  Scenario: Cadastrar cliente com contrato
    Given que eu faco login como "proprietario"
    When eu cadastro um novo cliente com contrato
    Then o cliente e contrato devem ser cadastrados com sucesso

  Scenario: Cadastrar apenas cliente
    Given que eu faco login como "proprietario"
    When eu cadastro um novo cliente sem contrato
    Then o cliente deve ser cadastrado com sucesso

  Scenario: Cadastrar contrato para cliente existente
    Given que eu faco login como "proprietario"
    And existe um cliente cadastrado
    When eu cadastro um novo contrato para o cliente
    Then o contrato deve ser cadastrado com sucesso para o cliente
