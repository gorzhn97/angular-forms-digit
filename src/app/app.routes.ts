import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'template-driven',
    loadComponent: () =>
      import('./template-driven-form/template-driven-form').then(
        (m) => m.TemplateDrivenFormComponent
      ),
  },
  {
    path: 'reactive',
    loadComponent: () =>
      import('./reactive-form/reactive-form').then(
        (m) => m.ReactiveFormComponent
      ),
  },
   {
    path: 'plain-reactive',
    loadComponent: () =>
      import('./reactive-form/reactive-form-plain').then(
        (m) => m.ReactiveFormPlainComponent
      ),
  },
  { path: '', redirectTo: 'template-driven', pathMatch: 'full' },
];
