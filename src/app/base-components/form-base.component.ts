import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, fromEvent, merge } from 'rxjs';

import {
  genericValidator,
  DisplayMessage,
  ValidationMessages,
} from '../utils/generic-form-validator';

export abstract class FormBaseComponent {
  displayMessage: DisplayMessage = {};
  genericValidator: genericValidator;
  validationMessages: ValidationMessages;

  mudancasNaoSalvas: boolean;

  protected configurarMensagensValidacaoBase(
    validationMessages: ValidationMessages
  ) {
    this.genericValidator = new genericValidator(validationMessages);
  }

  protected configurarValidacaoFormularioBase(
    formInputElements: ElementRef[],
    formGroup: FormGroup
  ) {
    let controlBlurs: Observable<any>[] = formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    merge(...controlBlurs).subscribe(() => {
      this.validarFormulario(formGroup);
    });
  }

  protected validarFormulario(formGroup: FormGroup) {
    this.displayMessage = this.genericValidator.processarMensagens(formGroup);
    this.mudancasNaoSalvas = true;
  }
}
