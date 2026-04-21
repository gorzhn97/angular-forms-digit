import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { PasswordsMatchValidatorDirective } from "./passwords-match-validator.directive";
import { EmbgValidatorDirective } from './embg-validator.directive';

@Component({
  selector: 'app-template-driven-form',
  imports: [FormsModule, JsonPipe, PasswordsMatchValidatorDirective,EmbgValidatorDirective
  ],
  templateUrl: './template-driven-form.html',
  styleUrl: './template-driven-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateDrivenFormComponent {
  
  // Step 1

  // Step 2: enable two-way binding
  // name = '';

  // Step 3: add more fields
  // email = '';
  // password = '';

  // Step 4: cross-field validation
  // confirmPassword = '';

  // Step 5:  "no name attr" demo
  // unmapped = '';

  // STEP 8: EMBG custom validator demo
  // embg = '';

  onSubmit(form: NgForm) {
    // this.name = '2'
    console.log('Template-driven form submitted!');
    console.log('Form value:', form.value);
  }
}