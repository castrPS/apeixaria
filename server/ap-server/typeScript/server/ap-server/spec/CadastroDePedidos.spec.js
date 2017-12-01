"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CadastroDePedidos_1 = require("../CadastroDePedidos");
const pedido_1 = require("../../../gui/ap-gui/src/app/pedido");
const cliente_1 = require("../../../gui/ap-gui/src/app/cliente");
const produto_1 = require("../../../gui/ap-gui/src/app/produto");
const itemdecompra_1 = require("../../../gui/ap-gui/src/app/itemdecompra");
describe("O cadastro de pedidos", () => {
    var cadastro;
    beforeEach(() => cadastro = new CadastroDePedidos_1.CadastroDePedidos());
    it("é inicialmente vazio", () => {
        expect(cadastro.getPedidos().length).toBe(0);
    });
    it("cadastra pedidos corretamente", () => {
        var client = new cliente_1.Cliente();
        client.nome = "Paulo";
        client.telefone = "(81)98825";
        var pedido = new pedido_1.Pedido();
        pedido.cliente = client;
        pedido.dataPedido = new Date(2017, 7, 31);
        pedido.dataEntrega = new Date(2018, 1, 1);
        pedido.condicaoPagamento = "À vista";
        pedido.localRetirada = "Rua Professor Gabriel, 181";
        pedido.cancelado = false;
        pedido.entregue = false;
        pedido.pago = false;
        var product = new produto_1.Produto();
        product.codigo = 100;
        product.nome = "Camarão";
        product.valor = 12;
        var item = new itemdecompra_1.ItemDeCompra();
        item.produto = product;
        item.quantidade = 1;
        pedido.lista.push(item);
        pedido.valorTotal = (pedido.lista[0].quantidade * pedido.lista[0].produto.valor);
        cadastro.criar(pedido);
        expect(cadastro.getPedidos().length).toBe(1);
        pedido = cadastro.getPedidos()[0];
        expect(pedido.cliente.nome).toBe("Paulo");
        expect(pedido.codigo).toBe(1);
        expect(pedido.cliente.telefone).toBe("(81)98825");
        expect(pedido.dataEntrega).toBe((new Date(2018, 1, 1)));
        expect(pedido.cancelado).toBe(false);
        expect(pedido.entregue).toBe(false);
        expect(pedido.pago).toBe(false);
        expect(pedido.valorTotal).toBe(12);
    });
    it("atualiza pedidos corretamente"), () => {
        var atualizar = cadastro.getPedidos()[0];
        atualizar.entregue = true;
        cadastro.atualizar(atualizar);
        var pedido = cadastro.getPedidos()[0];
        expect(pedido.entregue).toBe(true);
    };
});
//# sourceMappingURL=CadastroDePedidos.spec.js.map