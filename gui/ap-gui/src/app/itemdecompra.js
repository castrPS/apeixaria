"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const produto_1 = require("./produto");
class ItemDeCompra {
    constructor() {
        this.clean();
    }
    clean() {
        this.produto = new produto_1.Produto();
        this.quantidade = 0;
        this.valor = 0;
    }
    clone() {
        var item = new ItemDeCompra();
        item.copyFrom(this);
        return item;
    }
    copyFrom(from) {
        this.produto = from.produto;
        this.quantidade = from.quantidade;
        this.valor = from.valor;
    }
    getProduto() {
        return this.produto;
    }
    getQuantidade() {
        return this.quantidade;
    }
    getValor() {
        return this.valor;
    }
    setProduto(produto) {
        this.produto = produto;
    }
    setQuantidade(quantidade) {
        this.quantidade = quantidade;
    }
    setValor(valor) {
        this.valor = valor;
    }
}
exports.ItemDeCompra = ItemDeCompra;
//# sourceMappingURL=itemdecompra.js.map