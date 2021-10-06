import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';



import { MainComponent } from './paginas/main/main.component';
import { IndexComponent } from './paginas/index/index.component';
import { HomeComponent } from './paginas/home/home.component';
import { ServicioComponent } from './paginas/servicio/servicio.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { NosotrosComponent } from './paginas/nosotros/nosotros.component';


const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
  onSameUrlNavigation: 'reload'
};


const routes: Routes = [

  { path: 'main', component: MainComponent },
  { path: 'servicio', component: ServicioComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'home', component: HomeComponent },
  { path: 'index', component: IndexComponent },
  { path: 'solicitud', loadChildren: () => import('./modulos/solicitud/solicitud.module').then(m => m.SolicitudModule)},
  { path: 'cotizar', loadChildren: () => import('./modulos/cotizador/cotizador.module').then(m => m.CotizadorModule) },
  { path: '**', pathMatch: 'full', redirectTo: 'index' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
