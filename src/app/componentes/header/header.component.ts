import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  correo = "";
  id = 0;
  error = false;
  errorMensaje = "";
  cargando = false;
  showlogin = false;
  panelFind = false;
  sendCode = false;
  getCode = true;
  sistemaUrl = "http://consufin.com.mx/SysView/index.html";
  codeSucces = false;
  mensajeExito = null;
  openSecion = false;
  nc = false;

  /**
   *Almacena los datos del formulario de la solicitud.
   */
  formLogin: FormGroup;
  formRegistro: FormGroup;

  constructor(private router: Router, private api: ApiService) {
    this.formLogin = new FormGroup({
      'usuario': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
    });
    this.formRegistro = new FormGroup({
      'mail': new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
      'pass': new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }


  validarCode(x) {
    x.mail = localStorage.getItem('correo');
    this.error = false;
    this.codeSucces = false;
    this.cargando = true;
    this.api.validarCode(x).subscribe(res => {
      this.codeSucces = true;
      this.cargando = false;
      this.mensajeExito = res;
      window.scrollTo(0, 0);
    }, (error) => {
      this.codeSucces = false;
      this.error = true;
      this.cargando = false;
      this.errorMensaje = error._body;
      window.scrollTo(0, 0);
    });
  }

  nuevaCuenta() {
    window.scrollTo(0, 0);
    this.cargando = false;
    this.error = false;
    this.showlogin = false;
    this.nc = !this.nc;
  }

  entrar() {
    window.scrollTo(0, 0);
    this.cargando = false;
    this.codeSucces = false;
    this.error = false;
    this.showlogin = !this.showlogin;
    this.nc = false;
  }
  cerrarSecion() {
    this.api.logoOut().subscribe(x => {
      localStorage.clear();
      this.openSecion = false;
      this.router.navigate(['/main']);
    }, (error) => { this.error = true; this.errorMensaje = error._body; });
  }

  login() {

    this.cargando = true;
    this.error = false;
    this.errorMensaje = ""
    this.api.Login(this.formLogin.value).subscribe((res: any) => {
      this.cargando = false;
      if (res.success) {
        this.showlogin = false;
        this.openSecion = true;
        localStorage.setItem('token', res.token);
        localStorage.setItem('id', res.cliente.id);
        if (res.tipo == "Cliente") {
          this.router.navigate(['/EdoCta/' + res.cliente.id]);
        }
        if (res.tipo == "Coni") {
          this.router.navigate(['/Menu']);
        }
      }
    }, (error) => {
      this.error = true;
      this.cargando = false;
      this.errorMensaje = error.error.errors;
    });
  }

  crearCuenta() {
    this.cargando = true;
    localStorage.setItem('correo', this.formRegistro.controls['mail'].value);
    this.correo = localStorage.getItem('correo');
    this.api.crearCuenta(this.formRegistro.value).subscribe(res => {
      this.sendCode = true;
      this.getCode = false;
      this.cargando = false;
      this.error = false;
      localStorage.setItem('code', res["data"]);
      window.scrollTo(0, 0);
    }, (error) => {
      console.log(error.error);

      this.error = true;
      this.cargando = false;
      this.errorMensaje = error.error[0];
      window.scrollTo(0, 0);
    });
  }
  /*
      search(x) {
        this.router.navigate(['/search/' + x]);
      }

  */
}
