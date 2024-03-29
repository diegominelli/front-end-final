import { ContaGuard } from './services/conta.guard';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContaAppComponent } from './conta.app.component';

const ContaRoutingConfig: Routes = [
  {
    path: '',
    component: ContaAppComponent,
    children: [
      {
        path: 'cadastro',
        component: CadastroComponent,
        canActivate: [ContaGuard],
        canDeactivate: [ContaGuard],
      },
      { path: 'login', component: LoginComponent, canActivate: [ContaGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ContaRoutingConfig)],
  exports: [RouterModule],
})
export class ContaRoutingModule {}
