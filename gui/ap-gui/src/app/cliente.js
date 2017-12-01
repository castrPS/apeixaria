"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cliente {
    constructor() {
        this.clean();
    }
    clean() {
        this.nome = '';
        this.cpf_cnpj = '';
        this.data_nascimento = '';
        this.telefone = '';
        this.email = '';
        this.consumidor_final = false;
        this.lojista = false;
    }
    copyFrom(from) {
        this.nome = from.nome;
        this.cpf_cnpj = from.cpf_cnpj;
        this.data_nascimento = from.data_nascimento;
        this.telefone = from.telefone;
        this.email = from.email;
        this.consumidor_final = from.consumidor_final;
        this.lojista = from.lojista;
        this.endereco = from.endereco;
    }
}
exports.Cliente = Cliente;
//# sourceMappingURL=cliente.js.map