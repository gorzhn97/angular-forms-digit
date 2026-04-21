import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormPlainComponent {

  form = new FormGroup(
    {
      name: new FormControl<string | null>('', [
        Validators.required,
        forbiddenNameValidator(/admin/i),
      ]),

      email: new FormControl<string | null>('', [
        Validators.required,
        Validators.email,
      ]),

      password: new FormControl<string | null>('', [
        Validators.required,
        Validators.minLength(6),
      ]),

      confirmPassword: new FormControl<string | null>('', [
        Validators.required,
      ]),

      profile: new FormGroup({
        firstName: new FormControl<string | null>('', Validators.required),
        lastName: new FormControl<string | null>('', Validators.required),
      }),

      skills: new FormArray<FormControl<string | null>>([
        new FormControl<string | null>('', Validators.required),
      ]),
    },
    {
      validators: [passwordMatchValidator, passwordContainsNameValidator],
    }
  );

  // valueChanges demo (same as before)
  lastChange = signal<Record<string, unknown> | null>(null);

  constructor() {
    this.form.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed())
      .subscribe((value) => {
        console.log('Form value changed:', value);
        this.lastChange.set(value);
      });
  }

  // setValue vs patchValue
  fillWithSetValue() {
    this.form.setValue({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'secret123',
      confirmPassword: 'secret123',
      profile: { firstName: 'Jane', lastName: 'Doe' },
      skills: ['Angular'],
    });
  }

  fillWithPatchValue() {
    this.form.patchValue({
      name: 'Patched Name',
      email: 'patched@example.com',
    });
  }

  resetForm() {
    this.form.reset();
    this.lastChange.set(null);
  }

  // Derived state
  passwordStrength = computed(() => {
    const pw = (this.lastChange()?.['password'] as string) ?? '';
    if (pw.length === 0) return { label: '', level: 0 };
    if (pw.length < 6) return { label: 'Weak', level: 1 };
    if (pw.length < 10) return { label: 'Medium', level: 2 };
    return { label: 'Strong', level: 3 };
  });

  // FormArray helpers
  get skills(): FormArray<FormControl<string | null>> {
    return this.form.controls.skills as FormArray<FormControl<string | null>>;
  }

  addSkill() {
    this.skills.push(new FormControl<string | null>('', Validators.required));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  // Submit
  onSubmit() {
    console.log('Reactive form submitted!');
    console.log('Form value:', this.form.value);
  }
}

// Validators (unchanged)
function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string | null;
    const forbidden = value ? nameRe.test(value) : false;
    return forbidden ? { forbiddenName: { value } } : null;
  };
}

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
}

function passwordContainsNameValidator(group: AbstractControl): ValidationErrors | null {
  const name = (group.get('name')?.value as string | null)?.trim().toLowerCase();
  const password = (group.get('password')?.value as string | null)?.toLowerCase();

  if (!name || !password) return null;

  return password.includes(name) ? { passwordContainsName: true } : null;
}