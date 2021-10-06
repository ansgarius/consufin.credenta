import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ComponentesModule } from '../componentes/componentes.module';
import { CotizadorRoutingModule } from './cotizador-routing.module';
import { CotizadorComponent } from './cotizador/cotizador.component';

//revisar q no haya coladas
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';//EL Q USAN EN CURSO
//import { HttpModule } from '@angular/http';
//import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  declarations: [CotizadorComponent],
  imports: [
    CommonModule,
    CotizadorRoutingModule,

    FormsModule,
  //  HttpModule,
    HttpClientModule,
  //  AngularFontAwesomeModule,
    ReactiveFormsModule,
    ComponentesModule
  ]
})
export class CotizadorModule { }
