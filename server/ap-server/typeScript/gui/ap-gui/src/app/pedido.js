"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cliente_1 = require("./cliente");
class Pedido {
    constructor() {
        this.clean();
    }
    clean() {
        this.codigo = 0;
        this.cliente = new cliente_1.Cliente();
        this.lista = [];
        this.valorTotal = 0;
        this.desconto = 0;
        this.tipoDesconto = "";
        this.dataPedido = new Date(0, 0, 0);
        this.dataEntrega = new Date(0, 0, 0);
        this.condicaoPagamento = "";
        this.localRetirada = "";
        this.cancelado = false;
        this.entregue = false;
        this.pago = false;
    }
    clone() {
        var pedido = new Pedido();
        pedido.copyFrom(this);
        return pedido;
    }
    copyFrom(from) {
        this.codigo = from.codigo;
        this.cliente = from.cliente;
        this.valorTotal = from.valorTotal;
        this.desconto = from.desconto;
        this.tipoDesconto = from.tipoDesconto;
        this.dataPedido = from.dataPedido;
        this.dataEntrega = from.dataEntrega;
        this.condicaoPagamento = from.condicaoPagamento;
        this.localRetirada = this.localRetirada;
        this.cancelado = from.cancelado;
        this.entregue = from.entregue;
        this.pago = from.pago;
        this.copyListaFrom(from.lista);
    }
    copyListaFrom(from) {
        this.lista = [];
        if (from) {
            for (var i = 0; i < from.length; i++) {
                this.lista[i] = from[i];
            }
        }
    }
}
exports.Pedido = Pedido;
//# sourceMappingURL=pedido.js.map