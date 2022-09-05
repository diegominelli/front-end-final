import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Fornecedor } from './../models/fornecedor';
import { map } from 'rxjs/operators';
import { fromEvent, merge, Observable } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgBrazilValidators } from 'ng-brazil';
import {
  DisplayMessage,
  GenericValidation,
  ValidationMessages,
} from 'src/app/utils/generic-form-validation';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css'],
})
export class NovoComponent implements OnInit {
  @ViewChild(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  errors: any[] = [];
  fornecedorForm: FormGroup;
  fornecedor: Fornecedor = new Fornecedor();

  validationMessages: ValidationMessages;
  genericValidator: GenericValidation;
  displayMessage: DisplayMessage;

  formResult: string;

  mudancasNaoSalvas: boolean;

  constructor(
    private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fornecedorForm = this.fb.group({
      nome: ['', [Validators.required]],
      documento: ['', [Validators.required, NgBrazilValidators.cpf]],
      ativo: ['', [Validators.required]],
      tipoFornecedor: ['', [Validators.required]],

      endereco: this.fb.group({
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        cep: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]],
      }),
    });

    this.fornecedorForm.patchValue({ tipoFornecedor: '1', ativo: true });
  }

  ngAterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(
        this.fornecedorForm
      );
      this.mudancasNaoSalvas = true;
    });
  }
}
