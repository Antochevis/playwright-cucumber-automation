Feature: Cadastro de novo usuario
  Como visitante na tela de login
  Quero criar uma nova conta de passageiro
  Para acessar o sistema

  @skip
  Scenario: Criar conta via login
    Given que eu acesso a pagina de login
    When eu cadastro um novo usuario
    Then devo ver o usuario criado com sucesso
