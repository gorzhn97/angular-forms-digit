import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven-form',
  imports: [FormsModule, JsonPipe],
  templateUrl: './template-driven-form.html',
  styleUrl: './template-driven-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateDrivenFormComponent {
  // ═══════════════════════════════════════════════════════
  // Model properties — uncomment as you progress
  //   Step 1 uses bare ngModel (no binding, no property).
  //   [(ngModel)]="name" two-way binding starts in Step 2.
  // ═══════════════════════════════════════════════════════

  // STEP 2: uncomment to enable two-way binding
  // name = '';

  // STEP 3: uncomment as you add more fields
  // email = '';
  // password = '';

  // STEP 4: uncomment for cross-field validation
  // confirmPassword = '';

  // STEP 5: uncomment for the "no name attr" demo
  // unmapped = '';

  // ═══════════════════════════════════════════════════════
  // Submit handler
  // ═══════════════════════════════════════════════════════
  onSubmit(form: NgForm) {
    console.log('Template-driven form submitted!');
    console.log('Form value:', form.value);
  }
}
