
import { Cliente } from './cliente';
import { ItemDeCompra } from './itemdecompra';

export class Pedido {
  codigo: number;
  cliente: Cliente;
  lista: ItemDeCompra[];
  valorTotal: number;
  desconto: number;
  tipoDesconto: string;
  dataPedido: Date;
  dataEntrega: Date;
  condicaoPagamento: string;
  localRetirada: string;
  cancelado: boolean;
  entregue: boolean;
  pago: boolean;

  constructor() {
    this.clean();
  }

  clean(): void {
    this.codigo=0;
    this.cliente= new Cliente();
    this.lista = [];
    this.valorTotal = 0;
    this.desconto =0;
    this.tipoDesconto = "";
    this.dataPedido = new Date(0,0,0);
    this.dataEntrega = new Date(0,0,0);
    this.condicaoPagamento = "";
    this.localRetirada = "";
    this.cancelado = false;
    this.entregue = false;
    this.pago = false;
  }

  clone(): Pedido {
    var pedido: Pedido = new Pedido();
    pedido.copyFrom(this);
    return pedido;
  }

  copyFrom(from: Pedido): void {
    this.codigo= from.codigo;
    this.cliente = from.cliente;
    this.valorTotal = from.valorTotal;
    this.desconto=from.desconto;
    this.tipoDesconto=from.tipoDesconto;
    this.dataPedido=from.dataPedido;
    this.dataEntrega=from.dataEntrega;
    this.condicaoPagamento=from.condicaoPagamento;
    this.localRetirada=this.localRetirada;
    this.cancelado=from.cancelado;
    this.entregue=from.entregue;
    this.pago=from.pago;
    this.copyListaFrom(from.lista);
  }

  copyListaFrom(from: ItemDeCompra[]): void {
    this.lista = [];
    if(from){
      for (var i=0; i<from.length;i++){
        this.lista[i] = from[i];
      }
    }
  }
}


