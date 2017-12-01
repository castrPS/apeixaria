"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const CadastroDePedidos_1 = require("./CadastroDePedidos");
var app = express();
exports.app = app;
var cadastroPedidos = new CadastroDePedidos_1.CadastroDePedidos();
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.get('/pedidos', function (req, res) {
    res.send(JSON.stringify(cadastroPedidos.getPedidos()));
});
app.post('/pedidos', function (req, res) {
    var pedido = req.body;
    pedido = cadastroPedidos.criar(pedido);
    if (pedido) {
        res.send({ "success": "O pedido foi cadastrado com sucesso" });
    }
    else {
        res.send({ "failure": "O pedido não pode ser cadastrado" });
    }
});
app.put('/pedidos', function (req, res) {
    var pedido = req.body;
    pedido = cadastroPedidos.atualizar(pedido);
    if (pedido) {
        res.send({ "success": "O pedido foi atualizado com sucesso" });
    }
    else {
        res.send({ "failure": "O pedido não pode ser atualizado" });
    }
});
var server = app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
exports.server = server;
function closeServer() {
    server.close();
}
exports.closeServer = closeServer;
//# sourceMappingURL=ap-server.js.map