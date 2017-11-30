import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PedidosComponent } from './pedidos.component';
import { PedidoService } from './pedido.service';

@NgModule({
  declarations: [
    AppComponent,
    PedidosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'pedidos',
        component: PedidosComponent
      },
    ])
  ],
  providers: [PedidoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
