"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
var base_url = "http://localhost:3000/";
describe("O servidor", () => {
    var server;
    beforeAll(() => { server = require('../ap-server'); });
    afterAll(() => { server.closeServer(); });
    it("inicialmente retorna uma lista de alunos vazia", () => {
        return request.get(base_url + "pedidos").then(body => expect(body).toBe("[]")).catch(e => expect(e).toEqual(null));
    });
    it("não cadastra alunos com CPF duplicado", () => {
        return request.post(base_url + "pedidos", { "json": { "cliente": { "nome": "Paulo" }, "entregue": false, "pago": false } }).then(body => {
            expect(body).toEqual({ success: "O aluno foi cadastrado com sucesso" });
            expect(body).toEqual({ failure: "O aluno não pode ser cadastrado" });
            return request.get(base_url + "alunos").then(body => {
                expect(body).toContain('{"cliente": {"nome": "Paulo"}, "entregue" : false, "pago": false}');
            });
        });
    });
});
//# sourceMappingURL=ap-server.spec.js.map