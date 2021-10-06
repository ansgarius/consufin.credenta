import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ApiService } from '../../../servicios/api.service';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ChangeDetectorRef } from '@angular/core';
import * as faceapi from 'face-api.js';
//declare var Tesseract;
import * as Tesseract from 'tesseract.js'
//import { createWorker } from 'tesseract.js';
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  catalogoBancos = {
    '002': ' BANAMEX Banco Nacional de México, S.A., Institución de Banca Múltiple, Grupo Financiero Banamex',
    '006': ' BANCOMEXT Banco Nacional de Comercio Exterior, Sociedad Nacional de Crédito, Institución de Banca de Desarrollo',
    '009': ' BANOBRAS Banco Nacional de Obras y Servicios Públicos, Sociedad Nacional de Crédito, Institución de Banca de Desarrollo',
    '012': ' BBVA BANCOMER BBVA Bancomer, S.A., Institución de Banca Múltiple, Grupo Financiero BBVA Bancomer',
    '014': ' SANTANDER Banco Santander (México), S.A., Institución de Banca Múltiple, Grupo Financiero Santander',
    '019': ' BANJERCITO Banco Nacional del Ejército, Fuerza Aérea y Armada, Sociedad Nacional de Crédito, Institución de Banca de Desarrollo',
    '021': ' HSBC HSBC México, S.A., institución De Banca Múltiple, Grupo Financiero HSBC',
    '030': ' BAJIO Banco del Bajío, S.A., Institución de Banca Múltiple',
    '032': ' IXE IXE Banco, S.A., Institución de Banca Múltiple, IXE Grupo Financiero',
    '036': ' INBURSA Banco Inbursa, S.A., Institución de Banca Múltiple, Grupo Financiero Inbursa',
    '037': ' INTERACCIONES Banco Interacciones, S.A., Institución de Banca Múltiple',
    '042': ' MIFEL Banca Mifel, S.A., Institución de Banca Múltiple, Grupo Financiero Mifel',
    '044': ' SCOTIABANK Scotiabank Inverlat, S.A.',
    '058': ' BANREGIO Banco Regional de Monterrey, S.A., Institución de Banca Múltiple, Banregio Grupo Financiero',
    '059': ' INVEX Banco Invex, S.A., Institución de Banca Múltiple, Invex Grupo Financiero',
    '060': ' BANSI Bansi, S.A., Institución de Banca Múltiple',
    '062': ' AFIRME Banca Afirme, S.A., Institución de Banca Múltiple',
    '072': ' BANORTE Banco Mercantil del Norte, S.A., Institución de Banca Múltiple, Grupo Financiero Banorte',
    '102': ' THE ROYAL BANK The Royal Bank of Scotland México, S.A., Institución de Banca Múltiple',
    '103': ' AMERICAN EXPRESS American Express Bank (México), S.A., Institución de Banca Múltiple',
    '106': ' BAMSA Bank of America México, S.A., Institución de Banca Múltiple, Grupo Financiero Bank of America',
    '108': ' TOKYO Bank of Tokyo-Mitsubishi UFJ (México), S.A.',
    '110': ' JP MORGAN Banco J.P. Morgan, S.A., Institución de Banca Múltiple, J.P. Morgan Grupo Financiero',
    '112': ' BMONEX Banco Monex, S.A., Institución de Banca Múltiple',
    '113': ' VE POR MAS Banco Ve Por Mas, S.A. Institución de Banca Múltiple',
    '116': ' ING ING Bank (México), S.A., Institución de Banca Múltiple, ING Grupo Financiero',
    '124': ' DEUTSCHE Deutsche Bank México, S.A., Institución de Banca Múltiple',
    '126': ' CREDIT SUISSE Banco Credit Suisse (México), S.A. Institución de Banca Múltiple, Grupo Financiero Credit Suisse (México)',
    '127': ' AZTECA Banco Azteca, S.A. Institución de Banca Múltiple.',
    '128': ' AUTOFIN Banco Autofin México, S.A. Institución de Banca Múltiple',
    '129': ' BARCLAYS Barclays Bank México, S.A., Institución de Banca Múltiple, Grupo Financiero Barclays México',
    '130': ' COMPARTAMOS Banco Compartamos, S.A., Institución de Banca Múltiple',
    '131': ' BANCO FAMSA Banco Ahorro Famsa, S.A., Institución de Banca MúltipleClave Nombre corto Nombre o razón social',
    '132': ' BMULTIVA Banco Multiva, S.A., Institución de Banca Múltiple, Multivalores Grupo Financiero',
    '133': ' ACTINVER Banco Actinver, S.A. Institución de Banca Múltiple, Grupo Financiero Actinver',
    '134': ' WAL-MART Banco Wal-Mart de México Adelante, S.A., Institución de Banca Múltiple',
    '135': ' NAFIN Nacional Financiera, Sociedad Nacional de Crédito, Institución de Banca de Desarrollo',
    '136': ' INTERBANCO Inter Banco, S.A. Institución de Banca Múltiple',
    '137': ' BANCOPPEL BanCoppel, S.A., Institución de Banca Múltiple',
    '138': ' ABC CAPITAL ABC Capital, S.A., Institución de Banca Múltiple',
    '139': ' UBS BANK UBS Bank México, S.A., Institución de Banca Múltiple, UBS Grupo Financiero',
    '140': ' CONSUBANCO Consubanco, S.A. Institución de Banca Múltiple',
    '141': ' VOLKSWAGEN Volkswagen Bank, S.A., Institución de Banca Múltiple',
    '143': ' CIBANCO CIBanco, S.A.',
    '145': ' BBASE Banco Base, S.A., Institución de Banca Múltiple',
    '166': ' BANSEFI Banco del Ahorro Nacional y Servicios Financieros, Sociedad Nacional de Crédito, Institución de Banca de Desarrollo',
    '168': ' HIPOTECARIA FEDERAL Sociedad Hipotecaria Federal, Sociedad Nacional de Crédito, Institución de Banca de Desarrollo',
    '600': ' MONEXCB Monex Casa de Bolsa, S.A. de C.V. Monex Grupo Financiero',
    '601': ' GBM GBM Grupo Bursátil Mexicano, S.A. de C.V. Casa de Bolsa',
    '602': ' MASARI Masari Casa de Bolsa, S.A.',
    '605': ' VALUE Value, S.A. de C.V. Casa de Bolsa',
    '606': ' ESTRUCTURADORES Estructuradores del Mercado de Valores Casa de Bolsa, S.A. de C.V.',
    '607': ' TIBER Casa de Cambio Tiber, S.A. de C.V.',
    '608': ' VECTOR Vector Casa de Bolsa, S.A. de C.V.',
    '610': ' B&B B y B, Casa de Cambio, S.A. de C.V.',
    '614': ' ACCIVAL Acciones y Valores Banamex, S.A. de C.V., Casa de Bolsa',
    '615': ' MERRILL LYNCH Merrill Lynch México, S.A. de C.V. Casa de Bolsa',
    '616': ' FINAMEX Casa de Bolsa Finamex, S.A. de C.V.',
    '617': ' VALMEX Valores Mexicanos Casa de Bolsa, S.A. de C.V.',
    '618': ' UNICA Unica Casa de Cambio, S.A. de C.V.',
    '619': ' MAPFRE MAPFRE Tepeyac, S.A.',
    '620': ' PROFUTURO Profuturo G.N.P., S.A. de C.V., Afore',
    '621': ' CB ACTINVER Actinver Casa de Bolsa, S.A. de C.V.',
    '622': ' OACTIN OPERADORA ACTINVER, S.A. DE C.V.',
    '623': ' SKANDIA Skandia Vida, S.A. de C.V.',
    '626': ' CBDEUTSCHE Deutsche Securities, S.A. de C.V. CASA DE BOLSA',
    '627': ' ZURICH Zurich Compañía de Seguros, S.A.',
    '628': ' ZURICHVI Zurich Vida, Compañía de Seguros, S.A.',
    '629': ' SU CASITA Hipotecaria Su Casita, S.A. de C.V. SOFOM ENR',
    '630': ' CB INTERCAM Intercam Casa de Bolsa, S.A. de C.V.',
    '631': ' CI BOLSA CI Casa de Bolsa, S.A. de C.V.',
    '632': ' BULLTICK CB Bulltick Casa de Bolsa, S.A., de C.V.',
    '633': ' STERLING Sterling Casa de Cambio, S.A. de C.V.',
    '634': ' FINCOMUN Fincomún, Servicios Financieros Comunitarios, S.A. de C.V.',
    '636': ' HDI SEGUROS HDI Seguros, S.A. de C.V.',
    '637': ' ORDER Order Express Casa de Cambio, S.A. de C.VClave Nombre corto Nombre o razón social',
    '638': ' AKALA Akala, S.A. de C.V., Sociedad Financiera Popular',
    '640': ' CB JPMORGAN J.P. Morgan Casa de Bolsa, S.A. de C.V. J.P. Morgan Grupo Financiero',
    '642': ' REFORMA Operadora de Recursos Reforma, S.A. de C.V., S.F.P.',
    '646': ' STP Sistema de Transferencias y Pagos STP, S.A. de C.V.SOFOM ENR',
    '647': ' TELECOMM Telecomunicaciones de México',
    '648': ' EVERCORE Evercore Casa de Bolsa, S.A. de C.V.',
    '649': ' SKANDIA Skandia Operadora de Fondos, S.A. de C.V.',
    '651': ' SEGMTY Seguros Monterrey New York Life, S.A de C.V',
    '652': ' ASEA Solución Asea, S.A. de C.V., Sociedad Financiera Popular',
    '653': ' KUSPIT Kuspit Casa de Bolsa, S.A. de C.V.',
    '655': ' SOFIEXPRESS J.P. SOFIEXPRESS, S.A. de C.V., S.F.P.',
    '656': ' UNAGRA UNAGRA, S.A. de C.V., S.F.P.',
    '659': 'OPCIONES EMPRESARIALES DEL NOROESTE OPCIONES EMPRESARIALES DEL NORESTE, S.A. DE C.V., S.F.P.',
    '901': ' CLS Cls Bank International',
    '902': ' INDEVAL SD. Indeval, S.A. de C.V.',
    '670': ' LIBERTAD Libertad Servicios Financieros, S.A. De C.V.',
    '999': ' N/A',
  };
  selfie_face = null;
  camError = "";
  ine_face = null;
  selfieINvalid = false;
  firmaCanvasTopOverFlow = 0;
  codeSent = false;
  telCodeValidation: string = "";
  dibujar = false;
  currentDocStep = 0;
  docStep = {
    0: 'Selfie',
    1: 'Credencial de elector',
    2: 'Parte trasera de tu credencial de elector',
    3: 'Comprobante de domicilio',
  };
  cameraOn = false;
  textOcr = "";
  ocrLoad = 0;
  controlIne = "archivo";
  docDownload = false;
  currentTab = 0; // Current tab is set to be the first tab (0)
  tabs = [false, false, false, false, false, false, false];
  prevBtn = false;
  nextBtn = true;
  preValidado = false;
  /**
 *Almacena las empresas.
 */
  res = [];
  private modelsFace = [
    faceapi.nets.ssdMobilenetv1.loadFromUri('/assets/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/assets/models')
  ];
  /**
   *Bandera encargada del control del spiner de carga.
   */
  cargando: boolean = false;
  /**
   *Bandera encargada del control del mensaje de error.
   */
  error: boolean = false;
  /**
   *Almacena el mensaje a mostrar en caso de error.
   */
  mensajeError;
  /**
   *Almacena el mensaje a mostrar en caso de exito.
   */
  mensajeExito: any = "";
  /**
   *Bandera encargada del control del mensaje de exito.
   */
  success: boolean = false;

  /**
   *Almacena los estado obtenidos del backend.
   */
  responseEdos = "";
  /**
   *Almacena los paises obtenidos del backend.
   */
  responsePais = "";
  /**
   *Almacena las sucursales obtenidos del backend.
   */
  responseSucursal = "";
  /**
    *Almacena las relaciones con la empresa obtenidos del backend.
    */
  responseRelCia = "";
  /**
    *Almacena los conceptos para el estudio financiero obtenidos del backend.
    */
  responseConceptoFin = "";
  /**
     *Almacena los parametros pld obtenidos del backend.
     */
  responseParamPld = "";
  curpValid = false;

  responseCat = {
    Cat: "",
    Fecha: "",
    InteresPromedio: '',
    MontoPromedio: '',

  };
  /**
     *Almacena los cps obtenidos del backend.
     */
  resCps = [];
  /**
     *Almacena el width que tendra la camara.
     */
  videoWidth = 0;
  /**
     *Almacena el height que tendra la camara.
     */
  videoHeight = 0;
  /**
     *Bandera encargada de mostrar el form.
     */
  showForm = false;
  /**
     *Especificacion del dispositivo del cual se pedira permiso para su uso.
     */
  constraints = {
    video: {
      facingMode: "user",

    }
  };
  urlContrato = "";
  urlPagare = "";
  enableCamera = true;
  streamMedia = null;
  options = new HttpHeaders({ 'Authorization': "Bearer " + localStorage.getItem('token') });
  /**
   *Almacena los datos del formulario de la solicitud.
   */
  forma: FormGroup;
  /**
   *Almacena los datos del formulario para la validacion de la prevalidacion.
   */
  forma1: FormGroup;
  /**
   *Almacena los datos del formulario para la validacion de la prevalidacion.
   */
  forma2: FormGroup;
  /**
   *Referancia al elemento html donde se mostrara la camara.
   */
  @ViewChild('video') videoElement: ElementRef;
  /**
   *Referancia al elemento html donde se mostrara la foto capturada.
   */
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('efirma') efirma;
  @ViewChild('clearFirma') clearFirma: ElementRef;
  ctx = undefined;
  cw = undefined;
  ch = undefined;
  factorDeAlisamiento = 5;
  Trazados = [];
  puntos = [];
  /**
   *
   *@param {usuariosService} api Instancia de los servicio del proyecto.
   *@param {Router} router Instancia del Router el cual se encarga de la navegacion atravez del proyecto.
   *@param {Renderer2} renderer Ayuda a la renderisacion de elementos.
   */
  constructor(private api: ApiService, private http: HttpClient, private router: Router, private cdRef: ChangeDetectorRef, private renderer: Renderer2) {
    this.loadModels();
    //creo los formularios
    this.forma2 = new FormGroup({});///borrar
    this.forma1 = new FormGroup({
      'clave': new FormControl('', [Validators.required]),
    });
    this.forma = new FormGroup({
      'longitud': new FormControl('', [Validators.required]),
      'latitud': new FormControl('', [Validators.required]),
      'Nombre1': new FormControl('', [Validators.required]),
      'Nombre2': new FormControl(''),
      'Apel1': new FormControl('', [Validators.required]),
      'Apel2': new FormControl(''),
      'Tpersona': new FormControl('fisica', [Validators.required]),
      'nss': new FormControl('', [Validators.required, Validators.pattern('[0-9]{11}')]),
      'estadoCivil': new FormControl('', [Validators.required]),
      'Fnace': new FormControl('', [Validators.required]),
      'Rfc': new FormControl('', [Validators.required]),
      'Curp': new FormControl('', [Validators.required]),
      'paisorigen': new FormControl('1', [Validators.required]),
      'estados_edoNace': new FormControl('', [Validators.required]),
      'genero': new FormControl('', [Validators.required]),
      'sucursals_id': new FormControl('15', [Validators.required]),
      'ine': new FormControl('', [Validators.required]),
      'firma': new FormControl('', [Validators.required]),
      'ineBack': new FormControl('', [Validators.required]),
      'selfie': new FormControl('', [Validators.required]),
      'comprobante': new FormControl('', [Validators.required]),
      'no_ife_passport': new FormControl(''),
      'facebook': new FormControl(''),
      'escolaridad': new FormControl('', [Validators.required]),
      'casa': new FormControl('', [Validators.required]),
      'tiempo_residencia': new FormControl('', [Validators.required]),
      'empresa': new FormControl('', [Validators.required]),
      'clve_empleado': new FormControl(''),
      'puesto': new FormControl('', [Validators.required]),
      'sueldo_mensual': new FormControl('', [Validators.required]),
      'instagram': new FormControl(''),
      'f_ingreso_empresa': new FormControl('', [Validators.required]),
      'clabe': new FormControl('', [Validators.pattern('[0-9]{18}')]),
      'num_tarjeta': new FormControl('', [Validators.pattern('[0-9]{16}')]),
      'banco': new FormControl(''),
      'monto': new FormControl(2566.277, [Validators.required]),
      'plazo': new FormControl(6, [Validators.required]),
      'pago': new FormControl(500, [Validators.required]),
      'frecuencaPago': new FormControl('mensual', [Validators.required]),
      //  'calpld': new FormControl('', [Validators.required]),
      'conocimiento_cliente':
        new FormGroup({
          'residencia_extranjero': new FormControl(false),
          'propietario_real': new FormControl(false),
          'negocio_propio': new FormControl(false),
          'pep': new FormControl(false),
          'pb': new FormControl(false),
          'pago7500': new FormControl(false),
          'num_inmuebles': new FormControl('', [Validators.required]),
          'tiene_auto': new FormControl(false),
          'auto_marca': new FormControl(''),
          'auto_modelo': new FormControl(''),
          'auto_valor': new FormControl(0),
          'inmuebles_valor': new FormControl('', [Validators.required]),
          'por_cuenta_propia': new FormControl(false),
          'nombre_tercero': new FormControl('', [Validators.required]),
          'familiar_funciones_publicas': new FormControl(false),
          'familiar_funciones_publicas_nombre': new FormControl(''),
          'familiar_funciones_publicas_parentesco': new FormControl(''),
          'familiar_funciones_publicas_puesto': new FormControl(''),
          'credito': new FormControl(true),
          'fideicomiso': new FormControl(false),
          'otro_servicio': new FormControl(false),
          'pagos_distintas': new FormControl(0),
          'forma_pago': new FormControl('', [Validators.required]),
          'forma_pago_especificacion': new FormControl('', [Validators.required]),
          'importe_credito': new FormControl(2566.277, [Validators.required]),
          'destino_credito': new FormControl('', [Validators.required]),

        })
      ,
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
      'direcciones': new FormArray([
        new FormGroup({
          'Colonia': new FormControl('', [Validators.required, Validators.maxLength(100)]),
          'calle': new FormControl('', [Validators.required, Validators.maxLength(100)]),
          'Ncalle': new FormControl('', [Validators.required, Validators.pattern('[0-9 ]{1,5}')]),
          'Ninterior': new FormControl('', [Validators.maxLength(40)]),
          'CodigoPostal': new FormControl('', [Validators.required, Validators.pattern('[0-9 ]{5}')]),
        })]),
      'dependientesEconomicos': new FormArray([
        new FormGroup({
          'nombre': new FormControl(''),
          'parentesco': new FormControl(''),
          'edad': new FormControl(''),
          'ocupacion': new FormControl(''),
        })
      ]),
      'conyuge': new FormArray([
        new FormGroup({
          'nombre1': new FormControl(''),
          'nombre2': new FormControl(''),
          'apel1': new FormControl(''),
          'apel2': new FormControl(''),
          'edad': new FormControl(0),
          'telefonos': new FormArray([
            new FormGroup({
              'telefono': new FormControl('', [Validators.pattern('[0-9 ]{10}')]),
              'telTipo': new FormControl('', [Validators.pattern('(Fijo|Celular)')])
            })
          ], [Validators.required]),

        })
      ]),
      'estFinanc': new FormArray([
      ]),

      'referencias': new FormArray([
        new FormGroup({
          'nombre1': new FormControl('', [Validators.required]),
          'nombre2': new FormControl(''),
          'apel1': new FormControl('', [Validators.required]),
          'apel2': new FormControl(''),
          'telefonos': new FormArray([
            new FormGroup({
              'telefono': new FormControl('', [Validators.required, Validators.pattern('[0-9 ]{10}')]),
              'telTipo': new FormControl('', [Validators.required, Validators.pattern('(Fijo|Celular)')])
            })], [Validators.required]),
        }),
        new FormGroup({
          'nombre1': new FormControl('', [Validators.required]),
          'nombre2': new FormControl(''),
          'apel1': new FormControl('', [Validators.required]),
          'apel2': new FormControl(''),
          'telefonos': new FormArray([
            new FormGroup({
              'telefono': new FormControl('', [Validators.required, Validators.pattern('[0-9 ]{10}')]),
              'telTipo': new FormControl('', [Validators.required, Validators.pattern('(Fijo|Celular)')])
            })], [Validators.required]),
        }),
      ]),
    });
    this.cargando = true;
    this.api.getCat().subscribe((x: any) => {
      this.error = false;
      this.responseCat = x;
    }, (error) => {
      this.error = true;
      this.mensajeError = Object.values(JSON.parse(error._body)['errors']);
    });
    /*
        this.api.GrupoAll('').subscribe((y: any) => {
          this.res = y;
          this.error = false;
        }, (err) => {
          this.error = true;
          this.mensajeError = Object.values(JSON.parse(err._body)['errors']);
          if (err.status == 401) {
            localStorage.clear();
            this.router.navigate(['/login']);
          }
        });*/
  }

  ngOnInit(): void {
    this.forma.get('estadoCivil').valueChanges
      .subscribe(value => {
        if (value == "Casado/a") {
          this.forma.get('conyuge')['controls'].forEach(element => {
            element.get('edad').setValidators(Validators.required)
            element.get('apel1').setValidators(Validators.required)
            element.get('nombre1').setValidators(Validators.required)
            element.get('telefonos')['controls'].forEach(tel => {
              tel.get('telefono').setValidators([Validators.required, Validators.pattern('[0-9 ]{10}')])
              tel.get('telTipo').setValidators(Validators.required)
            });
            this.cdRef.detectChanges();
          });
        } else {
          this.forma.get('conyuge')['controls'].forEach(element => {
            element.get('telefonos')['controls'].forEach(tel => {
              tel.get('telTipo').clearValidators();
              tel.get('telTipo').setErrors(null);
              tel.get('telefono').clearValidators();
              tel.get('telefono').setErrors(null);
            });
            element.get('edad').clearValidators();
            element.get('edad').setErrors(null);
            element.get('apel1').clearValidators();
            element.get('apel1').setErrors(null);
            element.get('nombre1').clearValidators();
            element.get('nombre1').setErrors(null);
            this.cdRef.detectChanges();
          });
        }
      }
      );
    this.forma.get('conocimiento_cliente').get('por_cuenta_propia').valueChanges
      .subscribe(value => {
        if (value) {
          this.forma.get('conocimiento_cliente').get('nombre_tercero').clearValidators();
          this.forma.get('conocimiento_cliente').get('nombre_tercero').setErrors(null);
          this.cdRef.detectChanges();
        } else {
          this.forma.get('conocimiento_cliente').get('nombre_tercero').setValidators(Validators.required)
          this.cdRef.detectChanges();
        }
      }
      );

    this.forma.get('conocimiento_cliente').get('familiar_funciones_publicas').valueChanges
      .subscribe(value => {
        if (value) {
          this.forma.get('conocimiento_cliente').get('familiar_funciones_publicas_nombre').setValidators(Validators.required)
          this.forma.get('conocimiento_cliente').get('familiar_funciones_publicas_parentesco').setValidators(Validators.required)
          this.forma.get('conocimiento_cliente').get('familiar_funciones_publicas_puesto').setValidators(Validators.required)
          this.cdRef.detectChanges();
        } else {
          this.forma.get('conocimiento_cliente').get('familiar_funciones_publicas_nombre').clearValidators();
          this.forma.get('conocimiento_cliente').get('familiar_funciones_publicas_nombre').setErrors(null);
          this.forma.get('conocimiento_cliente').get('familiar_funciones_publicas_parentesco').clearValidators();
          this.forma.get('conocimiento_cliente').get('familiar_funciones_publicas_parentesco').setErrors(null);
          this.forma.get('conocimiento_cliente').get('familiar_funciones_publicas_puesto').clearValidators();
          this.forma.get('conocimiento_cliente').get('familiar_funciones_publicas_puesto').setErrors(null);
          this.cdRef.detectChanges();
        }
      }
      );

    this.forma.get('conocimiento_cliente').get('tiene_auto').valueChanges
      .subscribe(value => {
        if (value) {
          this.forma.get('conocimiento_cliente').get('auto_marca').setValidators(Validators.required)
          this.forma.get('conocimiento_cliente').get('auto_modelo').setValidators(Validators.required)
          this.forma.get('conocimiento_cliente').get('auto_valor').setValidators(Validators.required)
          this.cdRef.detectChanges();
        } else {
          this.forma.get('conocimiento_cliente').get('auto_marca').clearValidators();
          this.forma.get('conocimiento_cliente').get('auto_marca').setErrors(null);
          this.forma.get('conocimiento_cliente').get('auto_modelo').clearValidators();
          this.forma.get('conocimiento_cliente').get('auto_modelo').setErrors(null);
          this.forma.get('conocimiento_cliente').get('auto_valor').clearValidators();
          this.forma.get('conocimiento_cliente').get('auto_valor').setErrors(null);
          this.cdRef.detectChanges();
        }
      }
      );


    this.forma.get('conocimiento_cliente').get('forma_pago').valueChanges
      .subscribe(value => {
        if (value == "Otro") {
          this.forma.get('conocimiento_cliente').get('forma_pago_especificacion').setValidators(Validators.required)
          this.cdRef.detectChanges();
        } else {
          this.forma.get('conocimiento_cliente').get('forma_pago_especificacion').clearValidators();
          this.forma.get('conocimiento_cliente').get('forma_pago_especificacion').setErrors(null);
          this.cdRef.detectChanges();
        }
      }
      );

    this.getLocation();
    this.getColonias();
    this.getPais("");
    this.showTab(this.currentTab); // Display the current tab
  }


  showTab(n) {
    // This function will display the specified tab of the form...
    this.tabs[n] = true;
    if (n == 0) {
      this.prevBtn = false;
    } else {
      this.prevBtn = true;
    }
    if (this.tabs[1]) {
      setTimeout(() => { this.startCamera() }, 10);
    }
    if (this.tabs[7]) {
      setTimeout(() => { this.iniFirma() }, 300);
    }
  }

  loadModels() {
    Promise.all(this.modelsFace).then(res => {
      this.cargando = false;
    }
    )
  }


  goToNavItem(n) {
    this.tabs[this.currentTab] = false;
    // if you have reached the end of the form...
    // Increase or decrease the current tab by 1:
    this.currentTab = n;
    // Otherwise, display the correct tab:
    this.showTab(this.currentTab);
    window.scroll(0, 0);
    if (this.tabs[7]) {
      setTimeout(() => { this.iniFirma() }, 300);
    }
  }
  nextPrev(n) {
    // This function will figure out which tab to display
    // Hide the current tab:
    this.tabs[this.currentTab] = false;
    // if you have reached the end of the form...
    // Increase or decrease the current tab by 1:
    this.currentTab = this.currentTab + n;
    // Otherwise, display the correct tab:
    this.showTab(this.currentTab);
    window.scroll(0, 0);


  }
  public findInvalidControls() {
    const invalid = [];
    const controls = this.forma.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return JSON.stringify(invalid);
  }

  nextPrevDoc(n) {
    this.currentDocStep = this.currentDocStep + n;
    this.setShapeCam(this.currentDocStep);
    this.cdRef.detectChanges();
  }

  //--------------------------------firma electronica functions----------------------------7

  iniFirma() {
    let wrapper = document.querySelector(".firmaFrame");

    this.ctx = this.efirma.nativeElement.getContext("2d");
    this.cw = this.efirma.nativeElement.width = wrapper.getBoundingClientRect().width;
    this.ch = this.efirma.nativeElement.height = wrapper.getBoundingClientRect().height;
    this.ctx.lineJoin = "round";
    let ClientRect = this.efirma.nativeElement.getBoundingClientRect();
    this.firmaCanvasTopOverFlow = ClientRect.top;

    this.clearFirma.nativeElement.addEventListener('click', (evt) => {
      this.dibujar = false;
      this.ctx.clearRect(0, 0, this.cw, this.ch);
      this.Trazados.length = 0;
      this.puntos.length = 0;
    }, false);


    this.efirma.nativeElement.addEventListener('mousedown', (evt) => {
      this.dibujar = true;
      //ctx.clearRect(0, 0, cw, ch);
      this.puntos.length = 0;
      this.ctx.beginPath();
    }, false);

    this.efirma.nativeElement.addEventListener('mouseup', (evt) => {
      this.redibujarTrazados();
    }, false);

    this.efirma.nativeElement.addEventListener("mouseout", (evt) => {
      this.redibujarTrazados();
    }, false);

    this.efirma.nativeElement.addEventListener("mousemove", (evt) => {
      //dibujar solo es true al dar click
      if (this.dibujar) {
        //obtiene las coordenadas del mouse
        var m = this.oMousePos(this.efirma.nativeElement, evt);
        //guarda slos puntos del recorrido
        this.puntos.push(m);
        this.ctx.lineTo(m.x, m.y);
        this.ctx.stroke();
      }
    }, false);


    // Eventos pantallas táctiles
    this.efirma.nativeElement.addEventListener('touchstart', (evt) => { this.touchEmpezarDibujo() }, false);
    this.efirma.nativeElement.addEventListener('touchmove', (evt) => { this.touchDibujarLinea(evt) }, false);
    this.efirma.nativeElement.addEventListener('touchend', (evt) => { this.redibujarTrazados() }, false);



  }

  //aliza el trazo
  redibujarTrazados() {
    this.ctx.clearRect(0, 0, this.cw, this.ch);
    this.reducirArray(this.factorDeAlisamiento, this.puntos);
    for (var i = 0; i < this.Trazados.length; i++)
      this.alisarTrazado(this.Trazados[i]);

    if (this.dibujar) {
      this.efirma.nativeElement.toBlob((blob) => {
        this.forma.controls['firma'].setValue(blob);
        //this.ocr(URL.createObjectURL(blob));
      });
    }
    this.dibujar = false;
  }
  //reduce el arra tomando solo los 5tos lugares
  reducirArray(n, elArray) {
    var nuevoArray = [];
    nuevoArray[0] = elArray[0];
    for (var i = 0; i < elArray.length; i++) {
      if (i % n == 0) {
        nuevoArray[nuevoArray.length] = elArray[i];
      }
    }
    nuevoArray[nuevoArray.length - 1] = elArray[elArray.length - 1];
    this.Trazados.push(nuevoArray);
  }
  //dibuja el trazo nuevo ya alizado
  alisarTrazado(ry) {
    if (ry.length > 1) {
      var ultimoPunto = ry.length - 1;
      this.ctx.beginPath();
      this.ctx.moveTo(ry[0].x, ry[0].y);
      for (let i = 1; i < ry.length - 2; i++) {
        var pc = this.calcularPuntoDeControl(ry, i, i + 1);
        this.ctx.quadraticCurveTo(ry[i].x, ry[i].y, pc.x, pc.y);
      }
      this.ctx.quadraticCurveTo(ry[ultimoPunto - 1].x, ry[ultimoPunto - 1].y, ry[ultimoPunto].x, ry[ultimoPunto].y);
      this.ctx.stroke();
    }
  }
  //obtiene el punto de control para  quadratic Bézier curve
  calcularPuntoDeControl(ry, a, b) {
    var pc = { x: undefined, y: undefined }
    pc.x = (ry[a].x + ry[b].x) / 2;
    pc.y = (ry[a].y + ry[b].y) / 2;
    return pc;
  }

  oMousePos(canvas, evt) {
    //obtiene las cordenadas del canvas en relacion al portview
    var ClientRect = canvas.getBoundingClientRect();
    //retorna las cordenadas del cursol en base al canvas restandole el offset del portview
    return { //objeto
      x: Math.round(evt.clientX - ClientRect.left),
      y: Math.round(evt.clientY - ClientRect.top)
    }
  }

  touchEmpezarDibujo() {
    this.dibujar = true;
    this.puntos.length = 0;
    this.ctx.beginPath();
  };

  touchDibujarLinea(event) {
    event.preventDefault();
    if (this.dibujar) {
      let m = { x: undefined, y: undefined };
      //obtiene las cordenadas del canvas en relacion al portview
      let ClientRect = this.efirma.nativeElement.getBoundingClientRect();
      // Marca el nuevo punto
      if (event.changedTouches == undefined) {
        // Versión ratón
        m.x = event.changedTouches[0].pageX - ClientRect.left;
        m.y = event.changedTouches[0].pageY - ClientRect.top;
      } else {
        // Versión touch, pantalla tactil
        m.x = event.changedTouches[0].pageX - ClientRect.left;
        //m.y = event.changedTouches[0].pageY - ClientRect.top;
        m.y = event.changedTouches[0].pageY - this.firmaCanvasTopOverFlow;//ClientRect.top;
      }
      this.puntos.push(m);
      this.ctx.lineTo(m.x, m.y);
      this.ctx.stroke();
    }
  }

  //-------------------------------------------------------------------------------------end firma electronica functions
  startCamera() {
    if (this.cameraOn) {
      this.stopCamera();
    }
    else {
      if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
        navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
      } else {
        alert('Sorry, camera not available.');
      }
      this.cameraOn = true;
    }
  }

  handleError(error) {
    alert('Error: ' + error);
  }

  getFaces(x) {
    return new Promise((resolve, reject) => {

      setTimeout(() => {
        resolve(faceapi.detectAllFaces(x)
          .withFaceLandmarks()
          .withFaceDescriptors());
      }, 1);
    })
  }

  capture() {
    this.cargando = true;
    this.selfieINvalid = false;
    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
    //this.cdRef.detectChanges();
    if (this.currentDocStep === 0) {
      //let wrapper=document.querySelector(".cam");
      //const imgUrl = "assets/berlin-Casa-de-Papel.jpg";
      //const img = await faceapi.fetchImage(imgUrl)
      //const cva=faceapi.createCanvasFromMedia(img);
      //wrapper.append(cva);
      //faceapi.matchDimensions(cva, {"width":this.videoWidth,"height":this.videoHeight})
      /*    this.selfie_face = await faceapi.detectAllFaces(this.videoElement.nativeElement)
            .withFaceLandmarks()
            .withFaceDescriptors();*/
      this.getFaces(this.canvas.nativeElement).then(res => {
        window.scroll(0, 0);
        this.selfie_face = res;
        if (this.selfie_face.length != 1) {
          this.camError = "Debe de haber (solo) una persona.";
          this.selfieINvalid = true;
          this.forma.controls['selfie'].setValue("");
          this.cargando = false;
        }
        else {
          this.canvas.nativeElement.toBlob(async (blob) => {
            this.forma.controls['selfie'].setValue(blob);
          });
          this.selfieINvalid = false;
          this.currentDocStep < 3 ? this.currentDocStep++ : this.currentDocStep;
          this.setShapeCam(this.currentDocStep);
          this.cargando = false;
        }
      });
    }
    //this.selfie_face = faceapi.resizeResults(this.selfie_face, {"width":this.videoWidth,"height":this.videoHeight})
    //faceapi.draw.drawDetections(cva, this.selfie_face)
    //faceapi.draw.drawFaceLandmarks(cva, this.selfie_face)
    if (this.currentDocStep === 1) {
      //this.switchCamera();
      let ctxaux = this.canvas.nativeElement.getContext('2d');
      ctxaux.clearRect(0, 0, this.videoWidth, this.videoHeight);
      ctxaux.translate(this.videoWidth / 2, this.videoHeight / 2);
      ctxaux.rotate(270 * Math.PI / 180);
      ctxaux.translate(-1 * (this.videoWidth / 2), -1 * (this.videoHeight / 2));
      ctxaux.drawImage(this.videoElement.nativeElement, 0, 0);
      /*      let wrapper = document.querySelector(".cam");
            const imgUrl = "assets/0921912.jpg";
            const img = await faceapi.fetchImage(imgUrl)
            const cva = faceapi.createCanvasFromMedia(img);
            wrapper.append(cva);
            faceapi.matchDimensions(cva, { "width": this.videoWidth, "height": this.videoHeight })*/
      this.getFaces(this.canvas.nativeElement).then(res => {
        window.scroll(0, 0);
        this.ine_face = res;
        if (this.ine_face.length != 1) {
          this.camError = "Debe de haber (solo) una persona."
          this.selfieINvalid = true;
          this.forma.controls['ine'].setValue("");
          this.cargando = false;
        }
        else {
          const distance = faceapi.euclideanDistance(this.selfie_face[0].descriptor, this.ine_face[0].descriptor);
          if (distance > 0.5) {
            this.camError = "La selfie y la identificacion no pertenecen a la misma persona";
            this.selfieINvalid = true;
            this.cargando = false;
          }
          else {
            this.canvas.nativeElement.toBlob(async (blob) => {
              this.forma.controls['ine'].setValue(blob);
              Tesseract
                //  .recognize(file, "eng", {
                .recognize(URL.createObjectURL(blob), "spa", {
                  logger: m => {
                    this.cdRef.detectChanges();
                    this.ocrLoad = m.progress;
                  }
                })
                .then((res: any) => {
                  this.textOcr = res.data.text;
                  this.selfieINvalid = false;
                  this.currentDocStep < 3 ? this.currentDocStep++ : this.currentDocStep;
                  this.setShapeCam(this.currentDocStep);
                  this.cargando = false;
                  this.cdRef.detectChanges();
                })
                .catch(console.error);
            });
          }
        }
      });
    }
    else if (this.currentDocStep === 2) {
      window.scroll(0, 0);
      this.canvas.nativeElement.toBlob(async (blob) => {
        this.forma.controls['ineBack'].setValue(blob);
      });
      this.currentDocStep < 3 ? this.currentDocStep++ : this.currentDocStep;
      this.setShapeCam(this.currentDocStep);
      this.cargando = false;
    }
    else if (this.currentDocStep === 3) {
      //let wrapper=document.querySelector(".cam");
      //const imgUrl = "assets/berlin-Casa-de-Papel.jpg";
      //const img = await faceapi.fetchImage(imgUrl)
      //const cva=faceapi.createCanvasFromMedia(img);
      //wrapper.append(cva);
      //faceapi.matchDimensions(cva, {"width":this.videoWidth,"height":this.videoHeight})
      /*    this.selfie_face = await faceapi.detectAllFaces(this.videoElement.nativeElement)
            .withFaceLandmarks()
            .withFaceDescriptors();*/
      window.scroll(0, 0);
      this.canvas.nativeElement.toBlob((blob) => {
        this.forma.controls['comprobante'].setValue(blob);
        Tesseract
          //  .recognize(file, "eng", {
          .recognize(URL.createObjectURL(blob), "spa", {
            logger: m => {
              this.cdRef.detectChanges();
              this.ocrLoad = m.progress;
              //console.log(m);
            }
          })
          .then((res: any) => {
            //console.log(res);
            this.textOcr = res.data.text;
            this.startCamera();
            this.nextPrev(1);
            this.cargando = false;
          })
          .catch(console.error);
      });
    }
  }




  loadedmetadata() {
    this.videoElement.nativeElement.play();
  }


  setShapeCam(item: number) {

    this.renderer.setProperty(this.canvas.nativeElement, 'width', 0);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', 0);
    let canvasShape = <HTMLCanvasElement>document.querySelector('#canvasShapes');
    let canvasShapeCtx = canvasShape.getContext("2d");
    canvasShapeCtx.clearRect(0, 0, this.videoWidth, this.videoHeight);
    canvasShapeCtx.lineWidth = 5;
    canvasShapeCtx.strokeStyle = '#ff0000';
    switch (item) {
      case 0:
        canvasShapeCtx.strokeRect(20, 10, 250, 110);

        break;
      case 1:
        canvasShapeCtx.strokeRect(20, 0, 245, 134);
        canvasShapeCtx.lineWidth = 1;
        canvasShapeCtx.beginPath();
        canvasShapeCtx.arc(235, 20, 10, 0, 2 * Math.PI);
        canvasShapeCtx.stroke();
        break;
      case 2:
        canvasShapeCtx.strokeRect(20, 0, 245, 134);
        break;
      case 3:
        canvasShapeCtx.strokeRect(20, 10, 250, 110);
        //canvasShapeCtx.beginPath();
        //canvasShapeCtx.arc(150, 64, 60, 0, 2 * Math.PI);
        //canvasShapeCtx.stroke();
        break;

      default:
        break;
    }
  }
  attachVideo(stream) {
    //asigno el stream al video
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    //subscripcion al evento play
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
      if (this.cameraOn) {
        //this.videoHeight = this.videoElement.nativeElement.getBoundingClientRect().height;
        //this.videoWidth = this.videoElement.nativeElement.getBoundingClientRect().width;
        this.videoHeight = this.videoElement.nativeElement.videoHeight;
        this.videoWidth = this.videoElement.nativeElement.videoWidth;
        this.setShapeCam(0);
        //  const { videoWidth, videoHeight } = this.videoElement.nativeElement;
        //  const displaySize = { width: videoWidth, height: videoHeight }
        //  console.log(displaySize);
        //  console.log(this.videoWidth, this.videoHeight);
      }
    });
    this.streamMedia = stream;
  }

  stopCamera() {

    let tracks = this.streamMedia.getTracks();
    this.videoElement.nativeElement.pause();
    this.videoElement.nativeElement.src = "";
    tracks[0].stop();
    this.cameraOn = false;
  }

  torch() {
    //  console.log(this.streamMedia.getVideoTracks()[0].getSettings());

    //get capabilities of a strem
    //console.log(this.streamMedia.getVideoTracks()[0].getCapabilities());
    if (this.streamMedia.getVideoTracks()[0].getCapabilities().torch) {
      if (this.streamMedia.getVideoTracks()[0].getSettings().torch) {
        this.streamMedia.getVideoTracks()[0].applyConstraints({
          advanced: [{ torch: false }]
        })
          .catch(e => console.log(e));
      } else {
        this.streamMedia.getVideoTracks()[0].applyConstraints({
          advanced: [{ torch: true }]
        })
          .catch(e => console.log(e));
      }

    }
  }

  switchCamera() {
    if (this.constraints.video.facingMode == "environment") {
      this.constraints.video.facingMode = "user";
    } else {
      this.constraints.video.facingMode = "environment";
    }
    this.stopCamera();
    this.startCamera();
  }
  getLocation() {
    this.api.getPosition().then(pos => {
      this.forma.controls['latitud'].setValue(pos.lat);
      this.forma.controls['longitud'].setValue(pos.lng);
    });
  }

  coniAutorizacion() {

    this.cargando = true;
    this.error = false;
    this.api.coniAutorizacion(this.forma2.value).subscribe((y) => {
      this.cargando = false;
      this.error = false;
      //  console.log(y);

      window.scroll(0, 0);
      if (y == 0) {
        this.error = true;
        this.mensajeError = ["Aumente el monto del pago"];
      }
      else {
        this.success = true;
        this.mensajeExito = y;
      }
    }, (err) => {
      this.error = true;

      this.mensajeError = Object.values(JSON.parse(err._body)['errors']);
      this.cargando = false;
      window.scroll(0, 0);
      if (err.status == 401) {
        localStorage.clear();
        this.router.navigate(['/Main']);
      }
    });
  }
  validarTel() {
    //    this.showForm = true;
    //  this.telCodeValidation="1234abcd";
    this.cargando = true;
    this.api.sendSms(this.forma.controls['telefonos'].value[0].telefono).subscribe((res) => {
      this.showForm = true;
      this.cargando = false;
      this.telCodeValidation = res;
      this.codeSent = true;
      window.scroll(0, 0);
    }, (err) => console.log(err)
    );
  }
  validar() {
    this.cargando = true;
    this.api.ValidarPrevalidacion(this.forma1.value).subscribe((y) => {
      this.error = false;
      localStorage.setItem('codePreeautorizado', this.forma1.controls['clave'].value);


    }, (err) => {
      this.error = true;

      this.mensajeError = Object.values(JSON.parse(err._body)['errors']);
      this.cargando = false;
      if (err.status == 401) {
        localStorage.clear();
        this.router.navigate(['/Main']);
      }
    });
  }


  getColonias() {
    //  this.forma.get('direcciones').valueChanges.subscribe(valor=>{console.log(valor);
    //    });
    for (let control of this.forma.get('direcciones')['controls']) {
      let aux = control.get('CodigoPostal');
      let auxColonia = control.get('Colonia');
      //  control.get('colonia').disable();
      /*  aux.disable();
        aux.enable();*/
      aux.valueChanges.subscribe(valor => {
        if (valor) {
          if (valor.length == 5 && aux.valid) {
            //  this.cargando = true;
            auxColonia.setValue("");
            this.findCp(valor);
          }
        }
      });
    }
    //  console.log(this.forma['controls']['referencias']['controls'][0]['controls']['telefonos']['controls']);
    //console.log(this.forma.get('referencias')['controls'][0]['controls']['direcciones']['controls']);

    /*  for (let referencia of this.forma.get('referencias')['controls']) {
        for (let direccion of referencia['controls']['direcciones']['controls']) {

          let aux = direccion.get('CodigoPostal');
          let auxColonia = direccion.get('Colonia');

          aux.valueChanges.subscribe(valor => {
            if (valor) {
              if (valor.length == 5) {
                this.cargando = true;
                auxColonia.setValue("");
                this.findCp(valor);
              }
            }
          });

        }
      }*/
  }

  setBanco(event) {
    this.forma.controls['banco'].setValue("");

    if (this.forma.controls['clabe'].value.length === 18) {
      this.forma.controls['banco'].setValue(this.catalogoBancos[this.forma.controls['clabe'].value.substring(0, 3)]);
    }
  }
  getCurp(event) {
    if (this.forma.controls['Curp'].value.length == 18) {
      this.cargando = true;
      this.error = false;
      //  this.http.get("http://consufin.com.mx/apiLumen/public/CP?pagination=false&search=" + cp, { headers: this.options }).subscribe(
      //this.http.get("http://localhost/apiLumen/public/WebSiteCp?pagination=false&search=" + cp, { headers: this.options }).subscribe(
      this.http.get("https://conectame.ddns.net/rest/api.php?m=curp&user=prueba&pass=sC%7D9pW1Q%5Dc&val=" + this.forma.controls['Curp'].value).subscribe(
        res => {
          this.forma.controls['Nombre1'].setValue(res['Nombre']);
          this.forma.controls['Apel1'].setValue(res['Paterno']);
          this.forma.controls['Apel2'].setValue(res['Materno']);
          this.forma.controls['Fnace'].setValue(res['FechaNacimiento']);
          this.forma.controls['Rfc'].setValue(res['DatosFiscales'].Rfc);
          this.forma.controls['genero'].setValue(res['Sexo']);
          this.forma.controls['estados_edoNace'].setValue(res['NumEntidadReg']);
          if (res['Nacionalidad'] == "MEX") {
            this.forma.controls['paisorigen'].setValue('1');
          }
          this.curpValid = true;
          this.cargando = false;
          //  window.scroll(0, 0);
          this.urlContrato = "http://localhost/cob2.0/public/api/Contrato?curp=" + this.forma.controls['Curp'].value;
          this.urlPagare = "http://localhost/cob2.0/public/api/Pagare?curp=" + this.forma.controls['Curp'].value;


        }, err => {
          this.cargando = false;
          window.scroll(0, 0);
          this.error = true;
          this.mensajeError = ["Curp invalida"];
        });

    }

  }

  findCp(cp) {
    //  this.cargando = true;
    this.error = false;
    this.success = false;
    //  this.http.get("http://consufin.com.mx/apiLumen/public/CP?pagination=false&search=" + cp, { headers: this.options }).subscribe(
    //this.http.get( "http://localhost/cob2.0/public/api/Cp?pagination=false&search=" + cp, { headers: this.options }).subscribe(
    this.api.findCp(cp).subscribe(
      //this.http.get("https://api-sepomex.hckdrk.mx/query/info_cp/" + cp + "?token=5bf01afa-e50c-4696-9014-88c1ca4edc53").subscribe(
      res => {
        console.log(Object.values(res));

        //  console.log(res[0].response.asentamiento);
        this.resCps = Object.values(res);

        this.cargando = false;

      }, err => { 
        window.scroll(0, 0)
        this.resCps = [];
        this.cargando = false;
        this.error = true;
        this.mensajeError = ['Codigo postal Invalido'];
      });
  }


  fileChange(data) {
    this.forma.controls['ine'].setValue(<File>data.target.files[0]);
    if (data.target.files[0].type == "image/png" || data.target.files[0].type == "image/jpg" || data.target.files[0].type == "image/jpeg") {
      this.ocr(this.forma.controls['ine'].value);
    }
  }
  comprobanteChange(data) {
    this.forma.controls['comprobante'].setValue(<File>data.target.files[0]);
    //this.cargando = true;
    //  Tesseract.recognize("assets/INE.jpeg")
    //  Tesseract.recognize(this.canvas.nativeElement)
    //this.ocr(this.forma.controls['comprobante'].value);
  }

  getRfc() {
    if (this.forma.controls['Apel2'].value == "" || this.forma.controls['Apel1'].value == "" || this.forma.controls['Fnace'].value == "" || this.forma.controls['Nombre1'].value == "" || this.forma.controls['Nombre2'].value == "") {
      alert("Por favor llene el campo apellido_materno, apellido_paterno, fecha_nacimiento,primer_nombre, segundo_nombre");
    }
    else {
      this.cargando = true;
      this.error = false;
      this.success = false;
      this.api.calcularRfc(this.forma.controls['Apel2'].value, this.forma.controls['Apel1'].value, this.forma.controls['Fnace'].value, this.forma.controls['Nombre1'].value, this.forma.controls['Nombre2'].value).subscribe((y: any) => {
        this.cargando = false;
        this.forma.controls['Rfc'].setValue(y.response.data.rfc);
      }, (err) => {
        //  console.log(err)
        this.error = true;

        this.mensajeError = Object.values(JSON.parse(err._body)['errors']);
        this.cargando = false;
        if (err.status == 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      });
    }
  }




  getPais(x) {// obtiene todos los datos del servidor
    this.cargando = true;
    this.api.PaisAll(x).subscribe((y: any) => {
      this.responsePais = y.paise;
      this.responseEdos = y.estado;
      this.responseSucursal = y.sucursal;
      this.responseRelCia = y.empresarelacione;
      this.responseConceptoFin = y.conceptosfinanciero;
      this.responseParamPld = y.pldparametro;
      this.error = false;
      //  this.cargando = false;
      y.conceptosfinanciero.forEach(element => {
        (<FormArray>this.forma.controls['estFinanc']).push(
          new FormGroup({
            'concepto_id': new FormControl(element.id),
            'monto': new FormControl('', [Validators.required]),
            'tipopago': new FormControl(''),
            'concepto': new FormControl(element.concepto),
            'tipo': new FormControl(element.tipo),
          })
        );
      });

      //    this.getSucursal("");
    }, (err) => {
      this.error = true;
      this.success = false;
      //    this.cargando = false;
      this.mensajeError = Object.values(JSON.parse(err._body)['errors']);
      //    this.cargando = false;
      if (err.status == 401) {
        //ALERT("fallo al cargar paises");
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }




  popDependienteEcon(x) {
    (<FormArray>this.forma.controls['dependientesEconomicos']).removeAt(x);
  }

  addDependienteEcon() {
    (<FormArray>this.forma.controls['dependientesEconomicos']).push(
      new FormGroup({
        'nombre': new FormControl(''),
        'parentesco': new FormControl(''),
        'edad': new FormControl(''),
        'ocupacion': new FormControl(''),
      })
    );
  }
  cotiza(tipo: string) {
    let data = {};
    if (tipo == "pago") {
      data = {//'monto':this.forma.controls['monto'].value,
        'periodo': this.forma.controls['plazo'].value,
        'pago': this.forma.controls['pago'].value,
        'frecuencaPago': this.forma.controls['frecuencaPago'].value,
      }

      this.api.coniAutorizacion(data).subscribe((res: any) => {

        this.forma.controls['monto'].setValue(res.monto);
        this.forma.controls['conocimiento_cliente']['controls'].importe_credito.setValue(this.forma.controls['monto'].value);
        this.error = false;

      }, (err) => {
        console.log(err);

        this.error = true;

        this.mensajeError = Object.values(JSON.parse(err._body)['errors']);
        this.cargando = false;
        window.scroll(0, 0);

      });
    }
    else {
      data = {//'monto':this.forma.controls['monto'].value,
        'periodo': this.forma.controls['plazo'].value,
        'frecuencaPago': this.forma.controls['frecuencaPago'].value,
        'monto': this.forma.controls['monto'].value,
      }
      this.api.coniAutorizacion(data).subscribe((res: any) => {
        this.error = false;
        this.forma.controls['conocimiento_cliente']['controls'].importe_credito.setValue(this.forma.controls['monto'].value);
        this.forma.controls['pago'].setValue(res.pago);
      }, (err) => {
        this.error = true;

        this.mensajeError = Object.values(JSON.parse(err._body)['errors']);
        this.cargando = false;
        window.scroll(0, 0);

      });
    }



  }

  popConceptoFinEstu(x) {
    (<FormArray>this.forma.controls['estFinanc']).removeAt(x);
  }

  addConceptoFinEstu() {
    (<FormArray>this.forma.controls['estFinanc']).push(
      new FormGroup({
        'concepto_id': new FormControl(),
        'monto': new FormControl('', ),
        'tipopago': new FormControl(''),
        'concepto': new FormControl('', ),
        'tipo': new FormControl('', ),
      })
    );
  }


  addrReferencia() {
    (<FormArray>this.forma.controls['referencias']).push(
      new FormGroup({
        'referencia_id': new FormControl(''),
      })
    );
  }

  popReferencia(x) {
    (<FormArray>this.forma.controls['referencias']).removeAt(x);
  }

  addMail() {
    (<FormArray>this.forma.controls['mails']).push(
      new FormGroup({
        'mail': new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$")]),
      })
    );
  }

  inmueblesChange(e) {

    if (e.data < 1 && e.data != null) {
      this.forma.controls['conocimiento_cliente']['controls'].inmuebles_valor.setValue(0);

    }
    else {

      this.forma.controls['conocimiento_cliente']['controls'].inmuebles_valor.setValue("");
    }

  }
  popMail(x) {
    (<FormArray>this.forma.controls['mails']).removeAt(x);
  }

  addTelefono() {
    (<FormArray>this.forma.controls['telefonos']).push(
      new FormGroup({
        'telefono': new FormControl('', [Validators.required, Validators.pattern('[0-9 ]{10}')]),
        'telTipo': new FormControl('', [Validators.required, Validators.pattern('(Fijo|Celular)')])
      })
    );
  }

  popTelefono(x) {
    (<FormArray>this.forma.controls['telefonos']).removeAt(x);
  }
  /**
   *Realiza la peticion para la creacion de un nuevo registro al servidor.
   *@example
   *store({clveBanco: "", banco: "", cuentaBancaria: "", claveInterbancaria: "", cuentaContable: ""})
   */
  store() {
    this.cargando = true;
    this.error = false;
    this.success = false;
    this.api.ClienteStore(this.forma.value).subscribe((y) => {
      //console.log(y);
      this.cargando = false;
      this.success = true;
    /*
      this.docDownload = true;
      */this.mensajeExito = y;
      window.scroll(0, 0);
    }, (err) => {
      this.error = true;
      this.mensajeError = Object.values(err.error.errors);
      this.cargando = false;
      window.scroll(0, 0);
      if (err.status == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }


  //------------------------------------------------------- ocr with tesseract

  async doOCR(x) {
    const worker = Tesseract.createWorker({
      logger: m => this.ocrLoad = m.progress,
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(x);
    this.textOcr = text;
    //console.log(text);

    await worker.terminate();
  }


  ocr(file) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Tesseract
          //  .recognize(file, "eng", {
          .recognize(file, "spa", {
            logger: m => {
              this.ocrLoad = m.progress; console.log(m);
            }
          })
          .then((res: any) => {
            console.log(res);
            alert(res.data.text);
            this.textOcr = res.data.text;
          })
          .catch(console.error);
      }, 1);
    });
  }
}
