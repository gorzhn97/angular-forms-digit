import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-form-intro',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './reactive-form-intro.html',
  styleUrl: './reactive-form-intro.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormIntroComponent {

  // STEP 1 — FormControl

  nameControl = new FormControl('');

  // STEP 2 — FormGroup
  
  simpleGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
  });

  // STEP 3 — Built-in validators
  //   Validators.required, Validators.email, Validators.minLength
  //   are just functions that return null (valid) or an error object.
  //   Pass them as the second argument to FormControl.
  validatedForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

}
