"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Produto {
    constructor() {
        this.clean();
    }
    clean() {
        this.codigo = 0;
        this.nome = '';
        this.valor = 0;
        this.unid = '';
        this.categoria = '';
    }
    clone() {
        const produto = new Produto();
        produto.copyFrom(this);
        return produto;
    }
    copyFrom(from) {
        this.codigo = from.codigo;
        this.nome = from.nome;
        this.valor = from.valor;
        this.unid = from.unid;
        this.categoria = from.categoria;
    }
}
exports.Produto = Produto;
//# sourceMappingURL=produto.js.map