import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../servicios/api.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css']
})
export class CotizadorComponent implements OnInit {
  cotizado = false;
  pago: any = 0;
  monto: any = 0;
  frecuencia: any = 0;
  pagos: any = 0;
  saldoFinal: any = 0;
  iva = 0;
  finicio = 0;
  domiciliacion = 0;
  ffin = 0;
  periodo = 0;
  comicionApertura: any = 0;
  tasaAnual: any = 0;
  cargando = false;
  cotizarHabilitado = false;
  error = false;
  errorMensaje = null;
  tabla = null;
  telCodeValidation: string = "";
  codeSent = false;
showForm = false;
success=false;
mensajeExito=null;
  /**
   *Almacena los datos del formulario de la solicitud.
   */
  forma: FormGroup;
  constructor(private api: ApiService) {
    this.forma = new FormGroup({
      'clave': new FormControl(''),
      'longitud': new FormControl('', [Validators.required]),
      'latitud': new FormControl('', [Validators.required]),
      'garantia_hip': new FormControl(false, [Validators.required]),
      'politicas': new FormControl(false, [Validators.required]),
      'credito_destino': new FormControl('', [Validators.required,Validators.maxLength(255)]),
      'Nombre1': new FormControl('', [Validators.required]),
      'Nombre2': new FormControl(''),
      'Apel1': new FormControl('', [Validators.required]),
      'Apel2': new FormControl(''),
      'Tpersona': new FormControl('fisica', [Validators.required]),
      'monto': new FormControl("", [Validators.required]),
      'plazo': new FormControl(6, [Validators.required]),
      'frecuencaPago': new FormControl('mensual', [Validators.required]),
      'telefonos': new FormArray([
        new FormGroup({
          'telefono': new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
          'telTipo': new FormControl('', [Validators.required, Validators.pattern('(Fijo|Celular)')])
        })
      ], [Validators.required]),
      'mails': new FormArray([
        new FormGroup({
          'mail': new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$")]),
        })
      ]),
    });

        this.getLocation();
  }

  ngOnInit(): void {
  }

  /*cotizacionPrestamo(x) {
    this.cotizarHabilitado = true;
    this.cargando = true;
    this.error = false;
    this.errorMensaje = ""
    this.api.cotizacionPrestamo(x).subscribe(res => {
      this.tabla = res["tabla"];
      //console.log("?????????????????????????????????????");

      //console.log("?????????????????????????????????????");
      this.pago = res["pago"];

      this.periodo = res["periodo"];
      this.monto = res["monto"];
      this.iva = res["iva"];
      this.finicio = res["fechaInicio"];
      this.ffin = res["fechaFin"];
      this.frecuencia = res["frecuencia"];
      this.pagos = res["numero de pagos"];

      this.domiciliacion = res["domiciliacion"];
      this.saldoFinal = this.pagos * this.pago;
      this.comicionApertura = res["comicionApertura"];
      this.tasaAnual = res["tasaAnual"];
      //console.log(this.pago);
      this.cotizado = true;
      this.cargando = false;
      this.cotizarHabilitado = false;
    }, (error) => {
      this.error = true;
      this.cargando = false;
      this.errorMensaje = error._body;
      this.cotizarHabilitado = false;
    });
  }*/


    store() {
      console.log(this.forma.value);
      this.cargando = true;
      this.error = false;
      this.errorMensaje = ""
      this.success = false;
      this.api.credentaStore(this.forma.value).subscribe(res => {
        this.cargando = false;
        this.success = true;
      /*
        this.docDownload = true;
        */
        this.mensajeExito = res;
      //  window.scroll(0, 0);
      }, (error) => {

        this.error = true;
        this.cargando = false;
        this.errorMensaje = error.error.errors //Object.values(JSON.parse(error.error));

    //    window.scroll(0, 0);
      });
    }
  getLocation() {
    this.api.getPosition().then(pos => {
      this.forma.controls['latitud'].setValue(pos.lat);
      this.forma.controls['longitud'].setValue(pos.lng);
    });
  }

  validarTel() {

      //  this.showForm = true;
      //this.telCodeValidation="1234abcd";
    this.cargando = true;

    this.api.sendSms(this.forma.controls['telefonos'].value[0].telefono).subscribe((res) => {
      this.showForm = true;
      this.cargando = false;
      this.telCodeValidation = res;
      this.codeSent = true;
    //  window.scroll(0, 0);
    }, (err) => console.log(err)
  );
  }

  /*
    print() {
      let printContents, popupWin;
      printContents = this.tabla;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      popupWin.document.open();
      popupWin.document.write(`
          <html>
            <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
              <style>
              //........Customized style.......
              </style>
            </head>
        <body onload="window.print();window.close()" style="margin:5%;";>`);
      popupWin.document.write(`
          <div class="row" style="margin-top:4%;">
          <div class="col-md-2"></div>
          <div class="col-md-6">
          <div class="row text-center" ><h5>CONSUFIN SERVICIOS, S.A. DE C.V. SOFOM E.N.R.</h5></div>
          <div class="row" style="margin-top:10%;">
          <div class="col-md-6">
          <small>Monto:  $${this.monto}</small>
          <br>
          <small>Periodos:  ${this.periodo} meses</small>
          <br>
          <small>Tasa Anual:  ${this.tasaAnual}%</small>
          <br>
          <small>Iva:  ${this.iva}</small>

          </div>
          <div class="col-md-6">
          <small>Fecha de inicio:  ${this.finicio}</small>
          <br>
          <small>Domiciliacion:  ${this.domiciliacion}%</small>
          <br>
          <small>Comicion ap:  ${this.comicionApertura}%</small>
          <br>
          <small>Pago:  $${this.pago}</small>
          </div>
          </div>
          </div>
          <div class="col-md-2">  <img  src="assets/logoSolicitid.jpg" style="max-width:100%; "></div>

          </div>
          <br><br>
          <div class="row">
  <div class="col-md-4"></div>
  <div class="col-md-4" ><h6>TABLA DE AMORTIZACIONES</h6></div>
          </div>
          <br>
          <table class="table table-striped ">
            <thead class="  " style="   ">
              <tr>


                <th scope="col" style="font-size:11px; font-weight:400;">N. pago</th>
                <th style="font-size:11px; font-weight:400;">Pago</th>
                <th style="font-size:11px; font-weight:400;">Saldo Inicial</th>
                <th style="font-size:11px; font-weight:400;">Fecha</th>
                <th style="font-size:11px; font-weight:400;">Dias</th>
                <th style="font-size:11px; font-weight:400;">Interes</th>
                <th style="font-size:11px; font-weight:400;">Iva</th>
                <th style="font-size:11px; font-weight:400;">Total</th>
                <th style="font-size:11px; font-weight:400;">Capital</th>
                <th style="font-size:11px; font-weight:400;">Saldo Final</th>
              </tr>
            </thead>
            <tbody>
            `);
      for (let i = 0; i < this.tabla.length; i++) {
        //              console.log(this.tabla[i]);
        popupWin.document.write(`
                        <tr >


                          <td style="font-size:15px; font-weight:400;">${this.tabla[i]["0"] + 1}</td>


                          <td style="font-size:15px; font-weight:400;">${Math.round(this.tabla[i]["1"] * 100) / 100}</td>
                          <td style="font-size:15px; font-weight:400;">${Math.round(this.tabla[i]["2"] * 100) / 100}</td>
                          <td style="font-size:15px; font-weight:400;">${this.tabla[i]["3"]}</td>
                          <td style="font-size:15px; font-weight:400;">${this.tabla[i]["4"]}</td>
                          <td style="font-size:15px; font-weight:400;">${Math.round(this.tabla[i]["5"] * 100) / 100}</td>
                          <td style="font-size:15px; font-weight:400;">${Math.round(this.tabla[i]["6"] * 100) / 100}</td>
                          <td style="font-size:15px; font-weight:400;">${Math.round(this.tabla[i]["7"] * 100) / 100}</td>
                          <td style="font-size:15px; font-weight:400;">${Math.round(this.tabla[i]["8"] * 100) / 100}</td>
                          <td style="font-size:15px; font-weight:400;">${Math.round(this.tabla[i]["9"] * 100) / 100}</td>
                          </tr>
                          `);
      }

      popupWin.document.write(`
            </tbody>
          </table>
          <br>
          <div class="col-md-4" ><h4>Terminara pagando:$${this.saldoFinal}</h4></div>
          </body>
            </html>
            `);
      popupWin.document.close();
    }*/

}
