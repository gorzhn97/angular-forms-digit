import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';


//   1. Implement the Validator interface (validate method)
//   2. Provide as NG_VALIDATORS 
//   3. Apply the directive as an attribute on the input
//


@Directive({
  selector: '[embgValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmbgValidatorDirective,
      multi: true,
    },
  ],
})
export class EmbgValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value ?? '';

    if (!value) return null; 

    if (!/^\d{13}$/.test(value)) {
      return { embg: { message: 'EMBG must be exactly 13 digits.' } };
    }

    const day = parseInt(value.substring(0, 2), 10);
    const month = parseInt(value.substring(2, 4), 10);

    if (day < 1 || day > 31) {
      return { embg: { message: 'First 2 digits (day) must be between 01 and 31.' } };
    }

    if (month < 1 || month > 12) {
      return { embg: { message: 'Month needs to be 2 digits and must be between 01 and 12.' } };
    }

    return null;
  }
}
