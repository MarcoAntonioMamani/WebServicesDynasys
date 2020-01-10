'use strict'

const accessDataModel = require('../models/access_data')
const my_basic_auth = require('basic-auth')
const my_mail = require('./mail')
const service=require('../Services')
var nodemailer = require('nodemailer')
var validator = require('email-validator')
var generator = require('generate-password')
function getClient(req, res){
  
}
function isValidEmail(mail) { 
  return  validator.validate(mail)
  }
function getClients(req, res){

}

function postClient(req, res){
    //console.log(JSON.stringify(req.body))

    //console.log(JSON.stringify(req.body.mail))

//req.assert('full_name','{"Code":"0","message":"Por favor inserte Un nombre valido"}').noempty();
req.check('full_name', '{"Code":"8","message":"El nombre no puede ser vacío. Por favor inserte un nombre valido"}').notEmpty();
req.check('password_cli', '{"Code":"7","message":"La contraseña no puede ser vacio. Por favor inserte una valida"}').notEmpty();
req.check('phone', '{"Code":"9","message":"El telefono no puede ser vacio. Por favor inserte una valida"}').notEmpty();
req.check('address', '{"Code":"10","message":"La dirección no puede ser vacío. Por favor coloque su dirección actual"}').notEmpty();
req.check('location_lat', '{"Code":"11","message":"Los datos de la ubicación es invalida por favor seleccione una correcta"}').notEmpty();
req.check('location_log', '{"Code":"11","message":"Los datos de la ubicación es invalida por favor seleccione una correcta"}').notEmpty();

req.check('location_lat', '{"Code":"12","message":"El tipo de dato de la ubicación es invalido"}').isDecimal();
req.check('location_log', '{"Code":"12","message":"El tipo de dato de la ubicación es invalido"}').isDecimal();
req.check('mail', '{"Code":"5","message":"La Dirección De Correo Es Invalido. Inserte Un Correo Valido"}').isEmail();
var erros = req.validationErrors();
var result=""
if(erros){

    for (var i = 0; i < erros.length; i++) {
      
        result=result+erros[i].msg+","
        //res.status(401).send(JSON.parse(erros[i].msg));
      //  return
    }; 
    result= "["+result.substring(0, result.length - 1)+"]"; 
    res.status(401).send(JSON.parse(result));
     return

}
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 1}, /*1 Opción de registro de cliente*/
                 {"nombre":"code_id", "tipo": accessDataModel.sqlapi.Int, "valor": 0},
                 {"nombre":"full_name", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.full_name},
                 {"nombre":"business_name", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.business_name},
                 {"nombre":"nit", "tipo": accessDataModel.sqlapi.NVarChar(20), "valor": req.body.nit},
                 {"nombre":"mail", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor": req.body.mail},
                 {"nombre":"phone", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.phone},
                 {"nombre":"cell_phone", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.cell_phone},
                 {"nombre":"address", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.address},
                 {"nombre":"reference", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.reference},
                 {"nombre":"location_lat", "tipo": accessDataModel.sqlapi.Decimal(18,14), "valor": req.body.location_lat},
                 {"nombre":"location_log", "tipo": accessDataModel.sqlapi.Decimal(18,14), "valor": req.body.location_log},
                 {"nombre":"password_cli", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor": req.body.password_cli}]
                    
   accessDataModel.executeStoredProcedure(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/register-client'}, {result_api: null}], 1,req.body.mail)

}

///postTrackingMovil

function postTrackingMovil(req, res){


  
    let array = [{"nombre":"ldchof", "tipo": accessDataModel.sqlapi.Int, "valor": req.body.ldchof},
                 {"nombre":"ldfec", "tipo": accessDataModel.sqlapi.Date, "valor": req.body.ldfec},
                 {"nombre":"ldhora", "tipo": accessDataModel.sqlapi.NVarChar(8), "valor": req.body.ldhora},
                 {"nombre":"lblat", "tipo": accessDataModel.sqlapi.Decimal(18,14), "valor": req.body.lblat},
                 {"nombre":"lblongi", "tipo": accessDataModel.sqlapi.Decimal(18,14), "valor": req.body.lblongi}]
                    
   accessDataModel.executeStoredProcedureLocation(res, array,
     'sp_Insert_TL002', [{operation_api: 'POST /api/register-client'}, {result_api: null}], 1,req.body.namecliente+" Con Codigo: "+req.body.codigogenerado)
   }
function postClientMovil(req, res){


  
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 111}, /*1 Opción de registro de cliente*/
                 {"nombre":"code_id", "tipo": accessDataModel.sqlapi.Int, "valor": 0},
                 {"nombre":"full_name", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.namecliente},
                 {"nombre":"business_name", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.namecliente},
                 {"nombre":"nit", "tipo": accessDataModel.sqlapi.NVarChar(20), "valor": req.body.nit},
                 {"nombre":"mail", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor": ""},
                 {"nombre":"phone", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.telefono},
                 {"nombre":"cell_phone", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.telefono},
                 {"nombre":"address", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.direccion},
                 {"nombre":"observacion", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.codigogenerado},
                 {"nombre":"location_lat", "tipo": accessDataModel.sqlapi.Decimal(18,14), "valor": req.body.latitud},
                 {"nombre":"location_log", "tipo": accessDataModel.sqlapi.Decimal(18,14), "valor": req.body.longitud},
                 {"nombre":"cczona", "tipo": accessDataModel.sqlapi.Int, "valor": req.body.cczona}]
                    
   accessDataModel.executeStoredProcedureInsertCliente(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/register-client'}, {result_api: null}], 1,req.body.namecliente+" Con Codigo: "+req.body.codigogenerado)
   }

   function postClientMovilRepartidor(req, res){

  
  
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 112}, /*1 Opción de registro de cliente*/
                 {"nombre":"code_id", "tipo": accessDataModel.sqlapi.Int, "valor": 0},
                 {"nombre":"full_name", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.namecliente},
                 {"nombre":"business_name", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.namecliente},
                 {"nombre":"nit", "tipo": accessDataModel.sqlapi.NVarChar(20), "valor": req.body.nit},
                 {"nombre":"mail", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor": ""},
                 {"nombre":"phone", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.telefono},
                 {"nombre":"cell_phone", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.telefono},
                 {"nombre":"address", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.direccion},
                 {"nombre":"observacion", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.codigogenerado},
                 {"nombre":"location_lat", "tipo": accessDataModel.sqlapi.Decimal(18,14), "valor": req.body.latitud},
                 {"nombre":"location_log", "tipo": accessDataModel.sqlapi.Decimal(18,14), "valor": req.body.longitud},
                 {"nombre":"cczona", "tipo": accessDataModel.sqlapi.Int, "valor": req.body.cczona},
                 {"nombre":"idRepartidor", "tipo": accessDataModel.sqlapi.Int, "valor":   req.params.idrepartidor}]
                    
   accessDataModel.executeStoredProcedureInsertCliente(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/register-client'}, {result_api: null}], 1,req.body.namecliente+" Con Codigo: "+req.body.codigogenerado)
   }

   function putClientMovil(req, res){  
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 30}, /*1 Opción de registro de cliente*/
                 {"nombre":"code_id", "tipo": accessDataModel.sqlapi.Int, "valor": req.body.numi},
                 {"nombre":"full_name", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.namecliente},
                 {"nombre":"business_name", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.namecliente},
                 {"nombre":"nit", "tipo": accessDataModel.sqlapi.NVarChar(20), "valor": req.body.nit},
                 {"nombre":"mail", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor": ""},
                 {"nombre":"phone", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.telefono},
                 {"nombre":"cell_phone", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.telefono},
                 {"nombre":"address", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.direccion},
                 {"nombre":"observacion", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.codigogenerado},
                 {"nombre":"location_lat", "tipo": accessDataModel.sqlapi.Decimal(18,14), "valor": req.body.latitud},
                 {"nombre":"location_log", "tipo": accessDataModel.sqlapi.Decimal(18,14), "valor": req.body.longitud},
                 {"nombre":"cczona", "tipo": accessDataModel.sqlapi.Int, "valor": req.body.cczona}]
                    
   accessDataModel.executeStoredProcedureInsertCliente(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/register-client'}, {result_api: null}], 1,req.body.namecliente+" Con Codigo: "+req.body.codigogenerado)
   }
   function postPedidoMovil(req, res){
        /*this.oanumi = oanumi;
            this.oafdoc = oafdoc;
            this.oahora = oahora;
            this.oaccli = oaccli;
            this.cliente = cliente;
            this.oarepa = oarepa;
            this.oaest = oaest;
            this.oaobs = oaobs;
            this.latitud = latitud;
            this.longitud = longitud;
            this.total = total;
            this.tipocobro = tipocobro;
            this.estado = estado;
            this.codigogenerado = codigogenerad*/
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 26}, /*1 Opción de registro de cliente*/
                 {"nombre":"oanumi", "tipo": accessDataModel.sqlapi.NVarChar(100), "valor": req.body.oanumi},
                 {"nombre":"oafdoc", "tipo": accessDataModel.sqlapi.Date, "valor": req.body.oafdoc},
                 {"nombre":"oahora", "tipo": accessDataModel.sqlapi.NVarChar(10), "valor": req.body.oahora},
                 {"nombre":"oaccli", "tipo": accessDataModel.sqlapi.Int, "valor": req.body.oaccli},
                 {"nombre":"oarepa", "tipo": accessDataModel.sqlapi.Int, "valor": req.body.oarepa},
                 {"nombre":"oaest", "tipo": accessDataModel.sqlapi.Int, "valor": req.body.oaest},
                 {"nombre":"oaobs", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.oaobs},
                 {"nombre":"latitud", "tipo": accessDataModel.sqlapi.Decimal(18,14), "valor": req.body.latitud},
                 {"nombre":"longitud", "tipo": accessDataModel.sqlapi.Decimal(18,14), "valor": req.body.longitud},
                 {"nombre":"total", "tipo": accessDataModel.sqlapi.Decimal(18,2), "valor": req.body.total},
                 {"nombre":"tipocobro", "tipo": accessDataModel.sqlapi.Int, "valor": req.body.tipocobro},
                 {"nombre":"codigogenerado", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.codigogenerado}]
                    
   accessDataModel.executeStoredProcedurePostPedidos(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/register-client'}, {result_api: null}], 1,"Pedido: "+req.body.oanumi)
   }

   function putPedidoMovil(req, res){
    /*this.oanumi = oanumi;
        this.oafdoc = oafdoc;
        this.oahora = oahora;
        this.oaccli = oaccli;
        this.cliente = cliente;
        this.oarepa = oarepa;
        this.oaest = oaest;
        this.oaobs = oaobs;
        this.latitud = latitud;
        this.longitud = longitud;
        this.total = total;
        this.tipocobro = tipocobro;
        this.estado = estado;@tipocobro@credito
        this.codigogenerado = codigogenerad*/
        console.log("Tipo:"+req.body.tipocobro);
        console.log("Total:"+req.body.total);
        console.log("TotalCredito:"+req.body.totalcredito);
let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 28}, /*1 Opción de registro de cliente*/
             {"nombre":"oanumi", "tipo": accessDataModel.sqlapi.Int, "valor": req.body.oanumi}, /*1 Opción de registro de cliente*/
             {"nombre":"oaest", "tipo": accessDataModel.sqlapi.Int, "valor": req.body.oaest},
             {"nombre":"oaobs", "tipo": accessDataModel.sqlapi.NVarChar(400), "valor": req.body.oaobs},
             {"nombre":"tipocobro", "tipo": accessDataModel.sqlapi.Int, "valor": req.body.tipocobro},
             {"nombre":"credito", "tipo": accessDataModel.sqlapi.Decimal(18,2), "valor": req.body.totalcredito},
             {"nombre":"oafdoc", "tipo": accessDataModel.sqlapi.Date, "valor": req.body.oafdoc}]
                
accessDataModel.executeStoredProcedurePutPedido(res, array,
 'sp_go_TC004_appMovil', [{operation_api: 'POST /api/register-client'}, {result_api: null}], 1,"Pedido: "+req.body.oanumi)
}
function putClient(req, res){
}

function deleteClient(req, res){
    var query = 'DELETE FROM [user] WHERE Id=' + req.params.id
    executeQuery(res, query)
}

function putRecoverPassword(req, res){
   // console.log('PUT /api/recover-password')
    console.log(req.body.mail)
    if(isValidEmail(req.body.mail)==false){
        res.status(200).send({code:5,message:'La dirección de correo es invalido. inserte un correo valido'})
        return
    }
    const passw =generator.generate({
        length: 8,
        numbers: true
    });
      let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 6},
    {"nombre":"mail", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor":req.body.mail},
    {"nombre":"password_cli", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor":passw}]
  let b =accessDataModel.ExisteEMail(res,passw,req.body.mail,array)

   
   }

function postClientAuth(req, res) {
   // let user = my_basic_auth(req);  
   
    if ( !req.body.mail || !req.body.password_cli) {
           res.status(401).send({code:4,message:'Datos invalidos. Por favor inserte un correo y una contraseña válida'})
        return
    }
    if(isValidEmail(req.body.mail)==false ){
        res.status(401).send({code:5,message:'La dirección de correo es invalido. inserte un correo valido'})
		return
    }
      res.set('WWW-Authenticate', 'Basic realm=Authorization No Required')
   let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 5}, 
   {"nombre":"mail", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor":req.body.mail},
   {"nombre":"password_cli", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor": req.body.password_cli}]
  accessDataModel.VerificarCuenta(res,req.body.mail,req.body.password_cli,array)
}
function postRepartidorAuth(req, res) {
    // let user = my_basic_auth(req);  
    
     if ( !req.body.mail || !req.body.password_cli) {
            res.status(401).send({code:4,message:'Datos invalidos. Por favor inserte un codigo y una documento válida'})
         return
     }
   
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 20}, 
    {"nombre":"mail", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor":req.body.mail},
    {"nombre":"password_cli", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor": req.body.password_cli}]
   accessDataModel.VerificarCuentaRepartidor(res,req.body.mail,req.body.password_cli,array)
 }



module.exports = {
    getClient,
    postClient,
    putClient,
    deleteClient,
    putRecoverPassword,
    postClientAuth,
    postRepartidorAuth,
    postClientMovil,
    postTrackingMovil,
    postPedidoMovil,
    putPedidoMovil,
    putClientMovil,
    postClientMovilRepartidor
}
