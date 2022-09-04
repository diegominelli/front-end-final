import { LocalStorageUtils } from './../../utils/localstorage';
import { CadastroComponent } from './../cadastro/cadastro.component';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class ContaGuard
  implements CanDeactivate<CadastroComponent>, CanActivate
{
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) {}

  canDeactivate(component: CadastroComponent) {
    if (component.mudancasNaoSalvas) {
      return window.confirm(
        'Tem certeza que deseja abandonas o preenchimento do formulário?'
      );
    }
    return true;
  }

  canActivate() {
    if (this.localStorageUtils.obterTokenUsuario()) {
      this.router.navigate(['./home']);
    }

    return true;
  }
}
