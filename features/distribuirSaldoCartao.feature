Feature: Distribuir Saldo para Cartao
  Como proprietario ou cliente no sistema
  Quero distribuir saldo para cartoes de usuarios
  Para que eles possam utilizar os servicos de transporte

  Scenario Outline: Distribuir saldo para cartao com pagamento via saldo como <perfil>
    Given que eu faco login como "<perfil>"
    When eu verifico meu saldo atual
    And eu distribuo saldo aleatorio para um cartao
    And eu confirmo o pagamento com saldo disponivel
    Then o saldo deve ser distribuido para o cartao com sucesso
    And meu saldo deve ser atualizado corretamente

    Examples:
      | perfil       |
      | proprietario |
      | cliente      |

  Scenario Outline: Distribuir saldo para cartao com pagamento via PIX como <perfil>
    Given que eu faco login como "<perfil>"
    When eu verifico meu saldo atual
    And eu distribuo saldo aleatorio para um cartao
    And eu confirmo o pagamento via PIX no gateway
    Then o saldo deve ser distribuido para o cartao com sucesso
    And meu saldo deve ser atualizado corretamente

    Examples:
      | perfil       |
      | proprietario |
      | cliente      |
