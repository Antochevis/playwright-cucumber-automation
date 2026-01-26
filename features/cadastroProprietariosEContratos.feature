Feature: Cadastro de Proprietarios e Contratos

  Scenario: Cadastrar proprietario com contrato
    Given que eu faco login como "integrador"
    When eu cadastro um novo proprietario com contrato
    Then o proprietario e contrato devem ser cadastrados com sucesso

  Scenario: Cadastrar apenas proprietario
    Given que eu faco login como "integrador"
    When eu cadastro um novo proprietario sem contrato
    Then o proprietario deve ser cadastrado com sucesso

  Scenario: Cadastrar contrato para proprietario existente
    Given que eu faco login como "integrador"
    And existe um proprietario cadastrado
    When eu cadastro um novo contrato para o proprietario
    Then o contrato deve ser cadastrado com sucesso
