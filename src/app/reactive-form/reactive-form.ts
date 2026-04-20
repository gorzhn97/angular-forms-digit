import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormArray,
  FormControl,
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
export class ReactiveFormComponent {
  private fb = inject(FormBuilder);

  // ═══════════════════════════════════════════════════════
  // STEP 1 — FormGroup: group multiple FormControls together
  //   Each key becomes a FormControl automatically via FormBuilder.
  // ═══════════════════════════════════════════════════════
  form = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],

      // STEP 4 — Nested FormGroup: logically group related controls
      profile: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }),

      // STEP 5 — FormArray: dynamic list of controls (add/remove at runtime)
      skills: this.fb.array([this.fb.control('', Validators.required)]),
    },
    {
      // STEP 3 — Cross-field validator: runs against the whole group
      validators: passwordMatchValidator,
    }
  );

  // ═══════════════════════════════════════════════════════
  // STEP 6 — valueChanges: the form is an Observable stream
  //   Every keystroke emits the full form value.
  //   debounceTime waits 300ms of silence before emitting.
  // ═══════════════════════════════════════════════════════
  lastChange = signal<Record<string, unknown> | null>(null);

  constructor() {
    this.form.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed())
      .subscribe((value) => {
        console.log('Form value changed:', value);
        this.lastChange.set(value);
      });
  }

  // ═══════════════════════════════════════════════════════
  // STEP 7 — setValue vs patchValue
  //   setValue: must supply ALL controls (errors if you miss one)
  //   patchValue: supply only the controls you want to update
  // ═══════════════════════════════════════════════════════
  fillWithSetValue() {
    // This would throw if any key were missing!
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
    // Only updates the controls you specify — the rest stay untouched
    this.form.patchValue({
      name: 'Patched Name',
      email: 'patched@example.com',
    });
  }

  resetForm() {
    this.form.reset();
    this.lastChange.set(null);
  }

  // ═══════════════════════════════════════════════════════
  // STEP 8 — Derived state with computed()
  //   Password strength calculated reactively from the signal.
  // ═══════════════════════════════════════════════════════
  passwordStrength = computed(() => {
    const pw = (this.lastChange()?.['password'] as string) ?? '';
    if (pw.length === 0) return { label: '', level: 0 };
    if (pw.length < 6) return { label: 'Weak', level: 1 };
    if (pw.length < 10) return { label: 'Medium', level: 2 };
    return { label: 'Strong', level: 3 };
  });

  // ═══════════════════════════════════════════════════════
  // STEP 5 helpers — FormArray add / remove
  // ═══════════════════════════════════════════════════════
  get skills(): FormArray<FormControl<string | null>> {
    return this.form.controls.skills;
  }

  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  // ═══════════════════════════════════════════════════════
  // Submit handler
  // ═══════════════════════════════════════════════════════
  onSubmit() {
    console.log('Reactive form submitted!');
    console.log('Form value:', this.form.value);
  }
}

// ═══════════════════════════════════════════════════════
// STEP 3 — Custom cross-field validator (pure function)
//   Compares password and confirmPassword across controls.
//   Returns null if valid, or an error object if not.
// ═══════════════════════════════════════════════════════
function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
}
