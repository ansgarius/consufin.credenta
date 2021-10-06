import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { Cat } from '../modelos/cat';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  host = "consufin.com.mx";
//    host = "localhost";
  //  host = "192.168.1.65";
  baseRoute = "/cob2.0";
  protocolo = "https://";
  //protocolo = "http://";
  constructor(private http: HttpClient) { }


  getCat() {
    return this.http.get<Cat>(this.protocolo + this.host + this.baseRoute + "/public/api/getCat");//.map(res => res.json());
  }

  sendSms(tel){
    let code = Math.random().toString(36).substring(5);

    const $url='https://sms.nbxsoluciones.com:51943/sms/api/send/index.html?tkn=YVUy-Y0Fv-cnN4-SWcy-bmdu-bjgr-OUhr-QT09&tel='+tel+'&msg=Codigo: '+code;
    return this.http.get($url).pipe( map(res => { return code; }));;
  }

  //Revisa la validez de codigos de PreAutorizacion
  credentaStore(x) {
    return this.http.post(this.protocolo + this.host + this.baseRoute + "/public/api/Credenta", x);//.map(res => { return res.json() });
  }
  //Revisa la validez de codigos de PreAutorizacion
  validarCode(x) {
    return this.http.post(this.protocolo + this.host + this.baseRoute + "/public/api/validateClientAccount", x);//.map(res => { return res.json() });
  }

  Login(x) {
    return this.http.post(this.protocolo + this.host + this.baseRoute + "/public/api/ClientLogin", x);//.map(res => { return res.json() });
  }
  crearCuenta(x) {
    return this.http.post(this.protocolo + this.host + this.baseRoute + "/public/api/mail", x);//.map(res => { return res.json() });
  }

  logoOut() {
    var options = new Headers();
    options.append('Authorization', "Bearer " + localStorage.getItem('token'));
    return this.http.delete(this.protocolo + this.host + this.baseRoute + "/public/api/Token");//, { headers: options });//.map(res => console.log(res.json()));
  }

  findCp(cp) {
    var options = new HttpHeaders();
    options.append('Authorization', "Bearer " + localStorage.getItem('token'));
    return this.http.get(this.protocolo + this.host + this.baseRoute + "/public/api/Cp?pagination=false&search="+ cp,
    { headers: options });//.map(res => { return res.json() });
  }

  GrupoAll(x) {
  var options = new HttpHeaders();
  options.append('Authorization', "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.protocolo + this.host + this.baseRoute + "/public/api/Grupo?pagination=false&search=" + x,
   { headers: options });//.map(res => { return res.json(); });
}
coniAutorizacion(x) {
  return this.http.post(this.protocolo + this.host + this.baseRoute + "/public/api/PreValidarCredito", x);//.map(res => { return res.json() });
}
calcularRfc(apeMat, apePat, fnace, nom1, nom2) {
  nom1 = nom1.replace(" ", "+");
  nom2 = nom2.replace(" ", "+");
  var options = new Headers();
  options.append('X-RapidAPI-Key', '5a4a36ed73msh71ceb4b3c779bb3p102fbfjsn3f7960e0220c');
  return this.http.get("https://jfhe88-rfc-generator-mexico.p.rapidapi.com/rest1/rfc/get?solo_homoclave=0&apellido_materno=" + apeMat + " &apellido_paterno=" + apePat + "&fecha=" + fnace + "&nombre=" + nom1 + "+DE+JESUS");//, { headers: options }).map(r => { return r.json(); });
  //return this.http.get("https://jfhe88-rfc-generator-mexico.p.rapidapi.com/rest1/rfc/get?solo_homoclave=0&apellido_materno=CRUZ&apellido_paterno=ARGUELLES&fecha=1995-06-22&nombre=OSCAR+DE+JESUS", { headers: options }).map(r =>{ return r.json(); });
}

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });
  }
ValidarPrevalidacion(x) {
  var options = new Headers();
  options.append('Authorization', "Bearer " + localStorage.getItem('token'));
  return this.http.post(this.protocolo + this.host + this.baseRoute + "/public/api/ValidatePreAutorizacion", x);//, { headers: options }).map(res => { return res.json(); });
}
PaisAll(x) {
  var options = new Headers();
  options.append('Authorization', "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.protocolo + this.host + this.baseRoute + "/public/api/WebSiteCatalog");//, { headers: options }).map(res => { return res.json(); });
}

  ClienteStore(x) {
    var options = new HttpHeaders();
    options.append('Authorization', "Bearer " + localStorage.getItem('token'));

    const data = new FormData();
    data.append('Nombre1', x.Nombre1);
    data.append('Nombre2', x.Nombre2);
    data.append('Apel1', x.Apel1);
    data.append('Apel2', x.Apel2);
    data.append('Tpersona', x.Tpersona);
    data.append('Fnace', x.Fnace);
    data.append('ine', x.ine);
    data.append('firma', x.firma);
    data.append('ineBack', x.ineBack);
    data.append('selfie', x.selfie);
    data.append('comprobante', x.comprobante);
    data.append('no_ife_passport', x.no_ife_passport);
    data.append('facebook', x.facebook);
    data.append('escolaridad', x.escolaridad);
    data.append('casa', x.casa);
    data.append('tiempo_residencia', x.tiempo_residencia);
    data.append('empresa', x.empresa);
    data.append('clve_empleado', x.clve_empleado);
    data.append('puesto', x.puesto);
    data.append('sueldo_mensual', x.sueldo_mensual);
    data.append('instagram', x.instagram);
    data.append('f_ingreso_empresa', x.f_ingreso_empresa);
    data.append('num_tarjeta', x.num_tarjeta);
    data.append('clabe', x.clabe);
    data.append('monto', x.monto);
    data.append('frecuencaPago', x.frecuencaPago);
    data.append('plazo', x.plazo);
    data.append('banco', x.banco);
    data.append('Rfc', x.Rfc);
    data.append('Curp', x.Curp);
    data.append('paisorigen', x.paisorigen);
    data.append('estados_edoNace', x.estados_edoNace);
    data.append('nss', x.nss);
    data.append('latitud', x.latitud);
    data.append('longitud', x.longitud);
    data.append('genero', x.genero);
    data.append('sucursals_id', x.sucursals_id);
    data.append('status','prospecto');
    x.estFinanc.forEach((item, index) => {
      data.append('estFinanc[' + index + '][concepto_id]', item.concepto_id);
      data.append('estFinanc[' + index + '][monto]', item.monto);
      data.append('estFinanc[' + index + '][tipopago]', item.tipopago);
    });
    x.dependientesEconomicos.forEach((item, index) => {
      data.append('dependientesEconomicos[' + index + '][nombre]', item.nombre);
      data.append('dependientesEconomicos[' + index + '][parentesco]', item.parentesco);
      data.append('dependientesEconomicos[' + index + '][edad]', item.edad);
      data.append('dependientesEconomicos[' + index + '][ocupacion]', item.ocupacion);
    });

    if ( x.estadoCivil=="Casado/a") {
      x.conyuge.forEach((item, index) => {
        data.append('conyuge[' + index + '][nombre1]', item.nombre1);
        data.append('conyuge[' + index + '][nombre2]', item.nombre2);
        data.append('conyuge[' + index + '][apel1]', item.apel1);
        data.append('conyuge[' + index + '][apel2]', item.apel2);
        data.append('conyuge[' + index + '][edad]', item.edad);
        x.conyuge[index].telefonos.forEach((itemT, indexT) => {
          //console.log(itemT);
          data.append('conyuge[' + index + '][telefonos][' + indexT + '][telefono]', itemT.telefono);
          data.append('conyuge[' + index + '][telefonos][' + indexT + '][telTipo]', itemT.telTipo);
        });
      });
    }

    data.append('conocimiento_cliente[residencia_extranjero]', x.conocimiento_cliente.residencia_extranjero);
    data.append('conocimiento_cliente[propietario_real]', x.conocimiento_cliente.propietario_real);
    data.append('conocimiento_cliente[negocio_propio]', x.conocimiento_cliente.negocio_propio);
    data.append('conocimiento_cliente[pep]', x.conocimiento_cliente.pep);
    data.append('conocimiento_cliente[pb]', x.conocimiento_cliente.pb);
    data.append('conocimiento_cliente[pago7500]', x.conocimiento_cliente.pago7500);
    data.append('conocimiento_cliente[num_inmuebles]', x.conocimiento_cliente.num_inmuebles);
    data.append('conocimiento_cliente[tiene_auto]', x.conocimiento_cliente.tiene_auto);
    data.append('conocimiento_cliente[auto_marca]', x.conocimiento_cliente.auto_marca);
    data.append('conocimiento_cliente[auto_modelo]', x.conocimiento_cliente.auto_modelo);
    data.append('conocimiento_cliente[auto_valor]', x.conocimiento_cliente.auto_valor);
    data.append('conocimiento_cliente[inmuebles_valor]', x.conocimiento_cliente.inmuebles_valor);
    data.append('conocimiento_cliente[por_cuenta_propia]', x.conocimiento_cliente.por_cuenta_propia);
    data.append('conocimiento_cliente[nombre_tercero]', x.conocimiento_cliente.nombre_tercero);
    data.append('conocimiento_cliente[familiar_funciones_publicas]', x.conocimiento_cliente.familiar_funciones_publicas);
    data.append('conocimiento_cliente[familiar_funciones_publicas_nombre]', x.conocimiento_cliente.familiar_funciones_publicas_nombre);
    data.append('conocimiento_cliente[familiar_funciones_publicas_parentesco]', x.conocimiento_cliente.familiar_funciones_publicas_parentesco);
    data.append('conocimiento_cliente[familiar_funciones_publicas_puesto]', x.conocimiento_cliente.familiar_funciones_publicas_puesto);
    data.append('conocimiento_cliente[credito]', x.conocimiento_cliente.credito);
    data.append('conocimiento_cliente[fideicomiso]', x.conocimiento_cliente.fideicomiso);
    data.append('conocimiento_cliente[otro_servicio]', x.conocimiento_cliente.otro_servicio);
    data.append('conocimiento_cliente[pagos_distintas]', x.conocimiento_cliente.pagos_distintas);
    data.append('conocimiento_cliente[forma_pago]', x.conocimiento_cliente.forma_pago);
    data.append('conocimiento_cliente[forma_pago_especificacion]', x.conocimiento_cliente.forma_pago_especificacion);
    data.append('conocimiento_cliente[importe_credito]', x.conocimiento_cliente.importe_credito);
    data.append('conocimiento_cliente[destino_credito]', x.conocimiento_cliente.destino_credito);
    data.append('estadoCivil', x.estadoCivil);
    x.mails.forEach((item, index) => {
      data.append('mails[' + index + '][mail]', item.mail);
    });
    x.telefonos.forEach((item, index) => {
      data.append('telefonos[' + index + '][telefono]', item.telefono);
      data.append('telefonos[' + index + '][telTipo]', item.telTipo);
    });
    x.direcciones.forEach((item, index) => {
      data.append('direcciones[' + index + '][calle]', item.calle);
      data.append('direcciones[' + index + '][Ncalle]', item.Ncalle);
      data.append('direcciones[' + index + '][Ninterior]', item.Ninterior);
      data.append('direcciones[' + index + '][CodigoPostal]', item.CodigoPostal);
      data.append('direcciones[' + index + '][Colonia]', item.Colonia);
    });
    x.referencias.forEach((item, index) => {
      data.append('referencias[' + index + '][nombre1]', item.nombre1);
      data.append('referencias[' + index + '][nombre2]', item.nombre2);
      data.append('referencias[' + index + '][apel1]', item.apel1);
      data.append('referencias[' + index + '][apel2]', item.apel2);
      x.referencias[index].telefonos.forEach((itemT, indexT) => {
        //console.log(itemT);
        data.append('referencias[' + index + '][telefonos][' + indexT + '][telefono]', itemT.telefono);
        data.append('referencias[' + index + '][telefonos][' + indexT + '][telTipo]', itemT.telTipo);
      });
    });

    data.append('codePreeautorizado', localStorage.getItem('codePreeautorizado'));
    return this.http.post(this.protocolo + this.host + this.baseRoute + "/public/api/Prospecto", data,
    { headers: options });//.pipe( map(res => { console.log(res); }));


  }



  cotizacionPrestamo(x) {
  //console.log(x);
  //console.log("mofificado");
  //    return this.http.post(this.protocolo + this.host + "/COB/api/cotizacion", x).map(res => { this.respuesta = res.json(); console.log(this.respuesta); return this.respuesta; });
  return this.http.post(this.protocolo + this.host + this.baseRoute + "/public/api/cotizar", x);//.map(res => { return res.json(); });

}
}
