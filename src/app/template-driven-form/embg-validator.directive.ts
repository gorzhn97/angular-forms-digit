import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';


//   1. Implement the Validator interface (validate method)
//   2. Provide yourself as NG_VALIDATORS (multi: true)
//   3. Apply the directive as an attribute on the input
//
// EMBG rules:
//   - Exactly 13 digits
//   - Digits only (no letters or symbols)
//   - First 2 digits = day   → must be 01–31
//   - Next  2 digits = month → must be 01–12
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

    if (!value) return null; // let required handle the empty case

    if (!/^\d{13}$/.test(value)) {
      return { embg: { message: 'EMBG must be exactly 13 digits.' } };
    }

    const day = parseInt(value.substring(0, 2), 10);
    const month = parseInt(value.substring(2, 4), 10);

    if (day < 1 || day > 31) {
      return { embg: { message: 'First 2 digits (day) must be between 01 and 31.' } };
    }

    if (month < 1 || month > 12) {
      return { embg: { message: 'Next 2 digits (month) must be between 01 and 12.' } };
    }

    return null;
  }
}
