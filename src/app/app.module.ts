import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { MainComponent } from './paginas/main/main.component';
import { environment } from '../environments/environment';
import { ComponentesModule } from './modulos/componentes/componentes.module';
import { IndexComponent } from './paginas/index/index.component';
import { HomeComponent } from './paginas/home/home.component';
import { NosotrosComponent } from './paginas/nosotros/nosotros.component';
import { ServicioComponent } from './paginas/servicio/servicio.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { Header2Component } from './componentes/header2/header2.component';
import { WattsappComponent } from './componentes/wattsapp/wattsapp.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    IndexComponent,
    HomeComponent,
    NosotrosComponent,
    ServicioComponent,
    ContactoComponent,
    Header2Component,
    WattsappComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ComponentesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
