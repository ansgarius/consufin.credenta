import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from './spinner/spinner.component';
import { ErrorComponent } from './error/error.component';
import { ExitoComponent } from './exito/exito.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ErrorComponent,
    ExitoComponent],
  exports: [
    SpinnerComponent,
    ErrorComponent,
    ExitoComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentesModule { }
