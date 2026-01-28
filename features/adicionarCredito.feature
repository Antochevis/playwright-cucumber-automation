Feature: Adicionar Credito
  Como proprietario ou cliente no sistema
  Quero adicionar credito via PIX
  Para disponibilizar saldo para meus usuarios

  Scenario Outline: Adicionar credito com pagamento PIX aprovado como <perfil>
    Given que eu faco login como "<perfil>"
    When eu adiciono credito aleatorio via PIX
    And eu realizo o pagamento no gateway
    Then o credito deve ser aprovado com sucesso

    Examples:
      | perfil       |
      | proprietario |
      | cliente      |
