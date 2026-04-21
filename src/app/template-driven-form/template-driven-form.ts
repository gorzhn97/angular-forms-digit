import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { EmbgValidatorDirective } from './embg-validator.directive';

@Component({
  selector: 'app-template-driven-form',
  imports: [FormsModule, JsonPipe, EmbgValidatorDirective],
  templateUrl: './template-driven-form.html',
  styleUrl: './template-driven-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateDrivenFormComponent {
  
  // Step 1 uses bare ngModel (no binding, no property).

  // Step 2: uncomment to enable two-way binding
  // name = '';

  // Step 3: uncomment as you add more fields
  // email = '';
  // password = '';

  // Step 4: uncomment for cross-field validation
  // confirmPassword = '';

  // Step 5: uncomment for the "no name attr" demo
  // unmapped = '';

  // STEP 8: uncomment for the EMBG custom validator demo
//   embg = '';

  onSubmit(form: NgForm) {
    console.log('Template-driven form submitted!');
    console.log('Form value:', form.value);
  }
}