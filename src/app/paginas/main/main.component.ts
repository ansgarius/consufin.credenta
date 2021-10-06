import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


declare var AOS;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {




  meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
  diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
  catCargado = true;
  leyenda = "TU CRÉDITO SEGURO Y RÁPIDO";
  f = new Date();
  anio: any = this.f.getFullYear();
  diaNumero = this.f.getDate();
  diaNombre = this.diasSemana[this.f.getDay()];
  mes = this.meses[this.f.getMonth()];
  idacred = "";
  cotizado = false;
  pago: any = 0;
  monto: any = 0;
  responseCat:any={};
  frecuencia: any = 0;
  pagos: any = 0;
  saldoFinal: any = 0;
  comicionApertura: any = 0;
  tasaAnual: any = 0;
  tabla = "cat";
  error = false;
  mensajeError = "";
  cats = new Array();
  forma: FormGroup;
  archivo: File = null; /* property of File type */

  archivo1: File = null; /* property of File type */

  archivo2: File = null; /* property of File type */
  constructor(private api: ApiService) {
  //  let x = null;
  this.forma = new FormGroup({
    'usuario': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required]),
  });
  localStorage.clear();
    this.api.getCat().subscribe(x => {
      this.responseCat = x;
          this.catCargado = false;
  /*    for (var i in x["0"]) {
        //console.log(x["0"][i].Fecha);

        var mesAnterior = new Date().getMonth() - 1;
        var year = new Date().getFullYear();
        if (mesAnterior == -1) {
          mesAnterior = 11;
          year = year - 1;
        }
        if (new Date(x["0"][i].Fecha).getMonth() == mesAnterior && new Date(x["0"][i].Fecha).getFullYear() == year) {
          this.responseCat = x["0"][i];
        }

      }
      if (this.responseCat == null) {
        for (var i in x["0"]) {
          if (new Date().getMonth() - 1 == 0) {
            if (new Date(x["0"][i].Fecha).getMonth() == 11 && new Date(x["0"][i].Fecha).getFullYear() == new Date().getFullYear() - 1) {
              this.responseCat = x["0"][i].Fecha;
            }

          }
          else {
            if (new Date(x["0"][i].Fecha).getMonth() == new Date().getMonth() - 2 && new Date(x["0"][i].Fecha).getFullYear() == new Date().getFullYear()) {
              this.responseCat = x["0"][i];
            }
          }
        };

      }*/
      //console.log(this.responseCat);
      //console.log("_________________");

    }, (error) => { this.error = true; this.mensajeError = error; });

    //***********************************************************************************
  /*  this.api.reporteGeneral(this.tabla).subscribe(
      res => {
        JSON.parse(res["_body"]).forEach(function(element) {
          var mesAnterior = new Date().getMonth() - 1;
          var year = new Date().getFullYear();
          if (mesAnterior == -1) {
            mesAnterior = 11;
            year = year - 1;
          }
          if (new Date(element["Fecha"]).getMonth() == mesAnterior && new Date(element["Fecha"]).getFullYear() == year) {
            x = element;
          }
        });
        if (x == null) {
          JSON.parse(res["_body"]).forEach(function(element) {
            if (new Date().getMonth() - 1 == 0) {
              if (new Date(element["Fecha"]).getMonth() == 11 && new Date(element["Fecha"]).getFullYear() == new Date().getFullYear() - 1) {
                x = element;
              }

            }
            else {
              if (new Date(element["Fecha"]).getMonth() == new Date().getMonth() - 2 && new Date(element["Fecha"]).getFullYear() == new Date().getFullYear()) {
                x = element;
              }
            }
          });
        }
        this.cats = x;
        //console.log(this.cats);
        this.catCargado = false;
      });*/
  }

  ngOnInit() {
      AOS.init();
  }
  fileChange(data) {
    this.archivo = <File>data.target.files[0];

  }
  fileChange1(data) {
    this.archivo1 = <File>data.target.files[0];

  }
  fileChange2(data) {
    this.archivo2 = <File>data.target.files[0];

  }

  registrarProspecto(xd) {
    this.idacred = xd.Apel1.substring(0, 3) + xd.Apel2.substring(0, 3) + xd.Nombre1.substring(0, 3);
    var fileExtension = '.' + this.archivo.name.split('.').pop();

    Object.defineProperty(this.archivo, 'name', {
      writable: true,
      value: "Comprobante_de_domicilio_" + this.idacred + fileExtension
    });
    Object.defineProperty(this.archivo1, 'name', {
      writable: true,
      value: "Ife_" + this.idacred + fileExtension
    });
    Object.defineProperty(this.archivo2, 'name', {
      writable: true,
      value: "Curp_" + this.idacred + fileExtension
    });
    xd.Idacred = this.idacred;

    xd.file1 = this.archivo;
    xd.file2 = this.archivo1;
    xd.file3 = this.archivo2;


  }
/*  cotizacionPrestamo(x) {
    this.api.cotizacionPrestamo(x).subscribe(res => {
      this.pago = res["pago"];
      this.monto = res["monto"];
      this.frecuencia = res["frecuencia"];
      this.pagos = res["numero de pagos"];
      this.saldoFinal = this.pagos * this.pago;
      this.comicionApertura = res["comicionApertura"];
      this.tasaAnual = res["tasaAnual"];
     this.cotizado = true;
    });
  }*/
  onClickMe() {  this.cotizado = false; }
  /*registrarIrregularidad(data) {
    this.api.registrarIrregularidad(data);
  }
  registrarCv(data) {
    this.api.registrarCv(data);
  }*/

}
