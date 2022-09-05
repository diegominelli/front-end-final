import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacaoModule } from './navegacao/navegacao.module';
import { DetalhesComponent } from './fornecedor/detalhes/detalhes.component';
import { EditarComponent } from './fornecedor/editar/editar.component';
import { ExcluirComponent } from './fornecedor/excluir/excluir.component';
import { ListaComponent } from './fornecedor/lista/lista.component';
import { NovoComponent } from './fornecedor/novo/novo.component';

@NgModule({
  declarations: [AppComponent, DetalhesComponent, EditarComponent, ExcluirComponent, ListaComponent, NovoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavegacaoModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
