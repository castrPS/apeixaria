import express = require('express');
import bodyParser = require("body-parser");

import {Pedido} from '../../gui/ap-gui/src/app/pedido';
import {CadastroDePedidos} from './CadastroDePedidos';

var app = express();

var cadastroPedidos: CadastroDePedidos = new CadastroDePedidos();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

app.get('/pedidos', function (req, res) {
  res.send(JSON.stringify(cadastroPedidos.getPedidos()));
})

app.post('/pedidos', function (req: express.Request, res: express.Response) {
  var pedido: Pedido= <Pedido> req.body;
  pedido = cadastroPedidos.criar(pedido);
  if (pedido) {
    res.send({"success": "O pedido foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O pedido não pode ser cadastrado"});
  }
})

app.put('/pedidos', function (req: express.Request, res: express.Response) {
  var pedido: Pedido = <Pedido> req.body;
  pedido = cadastroPedidos.atualizar(pedido);
  if (pedido) {
    res.send({"success": "O pedido foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O pedido não pode ser atualizado"});
  }
})

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void {
   server.close();
}

export { app, server, closeServer }