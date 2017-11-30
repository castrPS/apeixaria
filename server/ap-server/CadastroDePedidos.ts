import { Pedido } from '../../gui/ap-gui/src/app/pedido';

export class CadastroDePedidos {
  pedidos: Pedido[] = [];
  numero=1;

  criar(pedido: Pedido): Pedido {
    var result = null;
    result = new Pedido();
    result.copyFrom(pedido);
    result.codigo = this.numero;
    this.numero = this.numero+1;
    this.pedidos.push(result);
    return result;
  }

  atualizar(pedido: Pedido): Pedido {
    var result: Pedido = this.pedidos.find(a => a.codigo == pedido.codigo);
    if (result) result.copyFrom(pedido);
    return result;
  }

  getPedidos(): Pedido[] {
    return this.pedidos;
  }

  getPedido(codigo: number){
  	var result: Pedido = this.pedidos.find(a => a.codigo === codigo);
    return result;
  }

}
