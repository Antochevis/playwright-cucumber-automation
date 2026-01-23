Feature: Login no Pontopass
  Como usuario do sistema Pontopass
  Quero realizar login com diferentes perfis
  Para acessar as funcionalidades do sistema

  Scenario: Login com perfil Integrador
    Given que eu acesso a pagina de login
    When eu faco login como "integrador"
    Then devo estar autenticado no sistema

  Scenario: Login com perfil Proprietario
    Given que eu acesso a pagina de login
    When eu faco login como "proprietario"
    Then devo estar autenticado no sistema

  Scenario: Login com perfil Cliente
    Given que eu acesso a pagina de login
    When eu faco login como "cliente"
    Then devo estar autenticado no sistema

  Scenario: Login com perfil Passageiro
    Given que eu acesso a pagina de login
    When eu faco login como "passageiro"
    Then devo estar autenticado no sistema
