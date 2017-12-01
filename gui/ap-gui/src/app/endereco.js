"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Endereco {
    constructor() {
        this.clean();
    }
    clean() {
        this.rua = '';
        this.numero = '';
        this.cidade = '';
        this.bairro = '';
        this.ponto_referencia = '';
    }
    copyFrom(from) {
        this.rua = from.rua;
        this.numero = from.numero;
        this.cidade = from.cidade;
        this.bairro = from.bairro;
        this.ponto_referencia = from.ponto_referencia;
    }
}
exports.Endereco = Endereco;
//# sourceMappingURL=endereco.js.map