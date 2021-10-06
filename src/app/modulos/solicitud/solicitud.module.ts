import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentesModule } from '../componentes/componentes.module';

import { SolicitudRoutingModule } from './solicitud-routing.module';

@NgModule({
  declarations: [SolicitudComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SolicitudRoutingModule,
    ComponentesModule
  ]
})
export class SolicitudModule { }
