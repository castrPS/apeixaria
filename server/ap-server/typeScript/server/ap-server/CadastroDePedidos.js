"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pedido_1 = require("../../gui/ap-gui/src/app/pedido");
class CadastroDePedidos {
    constructor() {
        this.pedidos = [];
        this.numero = 1;
    }
    criar(pedido) {
        var result = null;
        result = new pedido_1.Pedido();
        result.copyFrom(pedido);
        result.codigo = this.numero;
        this.numero = this.numero + 1;
        this.pedidos.push(result);
        return result;
    }
    atualizar(pedido) {
        var result = this.pedidos.find(a => a.codigo == pedido.codigo);
        if (result)
            result.copyFrom(pedido);
        return result;
    }
    getPedidos() {
        return this.pedidos;
    }
    getPedido(codigo) {
        var result = this.pedidos.find(a => a.codigo === codigo);
        return result;
    }
}
exports.CadastroDePedidos = CadastroDePedidos;
//# sourceMappingURL=CadastroDePedidos.js.map