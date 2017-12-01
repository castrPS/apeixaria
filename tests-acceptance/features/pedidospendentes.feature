Feature:
As usuario do sistema
I want to ver os pedidos pendentes e marca-los como entregues, pagos ou cancela-los
So that eles permaneceram como pendentes ou serao enviados para historicos correspondentes aos seus determinados estados.

Scenario: Marcando um pedido apenas como entregue
Given eu estou na pagina de pedidos pendentes
And eu vejo o pedido "1" cadastrado ao cliente "Paulo" na lista de pendentes
And o pedido "1" nao esta marcado como pago
And o pedido "1" nao esta marcado como entregue
When eu marcar o pedido "1" como entregue
Then eu vejo o pedido "1" na lista de pedidos pendentes