import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fornecedor } from '../models/fornecedor';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css'],
})
export class ExcluirComponent {
  fornecedor: Fornecedor = new Fornecedor();
  errors: any[] = [];

  constructor(
    private fornecedorService: FornecedorService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.fornecedor = this.route.snapshot.data['fornecedor'];
  }

  excluirEvento() {
    this.fornecedorService.excluirFornecedor(this.fornecedor.id).subscribe(
      (fornecedor) => {
        this.sucessoExclusao(fornecedor);
      },
      (error) => {
        this.falha(error);
      }
    );
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success(
      'Fornecedor excluido com Sucesso!',
      'Good bye :D'
    );
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/fornecedores/listar-todos']);
      });
    }
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
