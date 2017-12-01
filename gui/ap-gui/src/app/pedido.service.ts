import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Pedido } from './pedido';

@Injectable()
export class PedidoService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: Http) { }

  criar(pedido: Pedido): Promise<Pedido> {
    return this.http.post(this.taURL + "/pedidos",JSON.stringify(pedido), {headers: this.headers})
           .toPromise()
           .then(res => {
              if (res.json().success) {return pedido;} else {return null;}
           })
           .catch(this.tratarErro);
  }

  atualizar(pedido: Pedido): Promise<Pedido> {
    return this.http.put(this.taURL + "/pedidos",JSON.stringify(pedido), {headers: this.headers})
         .toPromise()
         .then(res => {
            if (res.json().success) {return pedido;} else {return null;}
         })
         .catch(this.tratarErro);
  }

  getPedidos(): Promise<Pedido[]> {
    return this.http.get(this.taURL + "/pedidos")
             .toPromise()
             .then(res => res.json() as Pedido[])
             .catch(this.tratarErro);
  }

  private tratarErro(erro: any): Promise<any>{
    console.error('Acesso mal sucedido ao serviço de pedidos',erro);
    return Promise.reject(erro.message || erro);
  }
}