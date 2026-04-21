import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';


@Directive({
  selector: '[passwordsMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordsMatchValidatorDirective,
      multi: true,
    },
  ],
})
export class PasswordsMatchValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;

    return password === confirm ? null : { passwordsMatch: true };
  }
}
