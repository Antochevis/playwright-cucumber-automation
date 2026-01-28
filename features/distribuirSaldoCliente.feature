Feature: Distribuir Saldo para Cliente
  Como proprietario no sistema
  Quero distribuir saldo para meus clientes
  Para que eles possam utilizar os servicos

  Scenario: Distribuir saldo para cliente com pagamento aprovado
    Given que eu faco login como "proprietario"
    When eu verifico meu saldo de proprietario
    And eu distribuo saldo aleatorio para um cliente
    And eu confirmo o pagamento com saldo
    Then o saldo deve ser distribuido com sucesso
    And meu saldo de proprietario deve ser atualizado corretamente
