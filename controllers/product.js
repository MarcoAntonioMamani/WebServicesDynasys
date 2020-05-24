'use strict'
const jwt=require('jwt-simple')
const moment=require('moment')
const config=require('../config')

const accessDataModel = require('../models/access_data')
function getCategorias(req, res){
    //console.log('GET /api/categoria-producto')
    //console.log(req.body)
   // const token =req.headers.tokenauthorization
  //  const payload=jwt.decode(token,config.SECRET_TOKEN)
   // console.log(payload.sub)
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 7}]
                    
   accessDataModel.executeStoredProcedureProductos(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/category-product'}, {result_api: null}], 1)

}
function getClientes(req, res){
    //console.log('GET /api/categoria-producto')
    //console.log(req.body)
   // const token =req.headers.tokenauthorization
  //  const payload=jwt.decode(token,config.SECRET_TOKEN)
   // console.log(payload.sub)
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 21},
    {"nombre":"idRepartidor", "tipo": accessDataModel.sqlapi.Int, "valor": req.params.idrepartidor}]
                    
   accessDataModel.executeStoredProcedureProductos(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/category-cliente'}, {result_api: null}], 1)

}

function getZonas(req, res){
    //console.log('GET /api/categoria-producto')
    //console.log(req.body)
   // const token =req.headers.tokenauthorization
  //  const payload=jwt.decode(token,config.SECRET_TOKEN)
   // console.log(payload.sub)
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 41},
    {"nombre":"idRepartidor", "tipo": accessDataModel.sqlapi.Int, "valor": req.params.idrepartidor}]
                    
   accessDataModel.executeStoredProcedureProductos(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/category-cliente'}, {result_api: null}], 1)

}
function getProductos(req, res){
    //console.log('GET /api/categoria-producto')
    //console.log(req.body)
   // const token =req.headers.tokenauthorization
  //  const payload=jwt.decode(token,config.SECRET_TOKEN)
   // console.log(payload.sub)
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 22}]
                    
   accessDataModel.executeStoredProcedureProductos(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/category-cliente'}, {result_api: null}], 1)

}
function getDescuentos(req, res){
  //console.log('GET /api/categoria-producto')
  //console.log(req.body)
 // const token =req.headers.tokenauthorization
//  const payload=jwt.decode(token,config.SECRET_TOKEN)
 // console.log(payload.sub)
  let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 42}]
                  
 accessDataModel.executeStoredProcedureProductos(res, array,
   'sp_go_TC004_appMovil', [{operation_api: 'POST /api/category-cliente'}, {result_api: null}], 1)

}
function getPrecios(req, res){
    //console.log('GET /api/categoria-producto')
    //console.log(req.body)
   // const token =req.headers.tokenauthorization
  //  const payload=jwt.decode(token,config.SECRET_TOKEN)
   // console.log(payload.sub)
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 23}]
                    
   accessDataModel.executeStoredProcedureProductos(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/category-cliente'}, {result_api: null}], 1)

}
function getEmpresas(req, res){
  //console.log('GET /api/categoria-producto')
  //console.log(req.body)
 // const token =req.headers.tokenauthorization
//  const payload=jwt.decode(token,config.SECRET_TOKEN)
 // console.log(payload.sub)
  let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 1}]
                  
 accessDataModel.executeStoredProcedureProductos(res, array,
   'MAM_AppMovil', [{operation_api: 'POST /api/category-cliente'}, {result_api: null}], 1)

}
function getEmpresasCategorias(req, res){
  //console.log('GET /api/categoria-producto')
  //console.log(req.body)
 // const token =req.headers.tokenauthorization
//  const payload=jwt.decode(token,config.SECRET_TOKEN)
 // console.log(payload.sub)
  let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 4}]
                  
 accessDataModel.executeStoredProcedureProductos(res, array,
   'MAM_AppMovil', [{operation_api: 'POST /api/category-cliente'}, {result_api: null}], 1)

}
function getEmpresasProductos(req, res){
  //console.log('GET /api/categoria-producto')
  //console.log(req.body)
 // const token =req.headers.tokenauthorization
//  const payload=jwt.decode(token,config.SECRET_TOKEN)
 // console.log(payload.sub)
  let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 2}]
                  
 accessDataModel.executeStoredProcedureProductos(res, array,
   'MAM_AppMovil', [{operation_api: 'POST /api/category-cliente'}, {result_api: null}], 1)

}
function getEmpresasProductosImagenes(req, res){
  //console.log('GET /api/categoria-producto')
  //console.log(req.body)
 // const token =req.headers.tokenauthorization
//  const payload=jwt.decode(token,config.SECRET_TOKEN)
 // console.log(payload.sub)
  let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 3}]
                  
 accessDataModel.executeStoredProcedureProductos(res, array,
   'MAM_AppMovil', [{operation_api: 'POST /api/category-cliente'}, {result_api: null}], 1)

}
function getPedidos(req, res){
    //console.log('GET /api/categoria-producto')
    //console.log(req.body)
   // const token =req.headers.tokenauthorization
  //  const payload=jwt.decode(token,config.SECRET_TOKEN)
   // console.log(payload.sub)
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 24},
    {"nombre":"idRepartidor", "tipo": accessDataModel.sqlapi.Int, "valor": req.params.idrepartidor}]
                    
   accessDataModel.executeStoredProcedureProductos(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/category-cliente'}, {result_api: null}], 1)

}

function getStock(req, res){
    //console.log('GET /api/categoria-producto')
    //console.log(req.body)
   // const token =req.headers.tokenauthorization
  //  const payload=jwt.decode(token,config.SECRET_TOKEN)
   // console.log(payload.sub)
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 31},
    {"nombre":"idRepartidor", "tipo": accessDataModel.sqlapi.Int, "valor": req.params.idrepartidor}]
                    
   accessDataModel.executeStoredProcedureProductos(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/category-cliente'}, {result_api: null}], 1)

}
function getDetalles(req, res){
    //console.log('GET /api/categoria-producto')
    //console.log(req.body)
   // const token =req.headers.tokenauthorization
  //  const payload=jwt.decode(token,config.SECRET_TOKEN)
   // console.log(payload.sub)
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 25},
    {"nombre":"idRepartidor", "tipo": accessDataModel.sqlapi.Int, "valor": req.params.idrepartidor}]
                    
   accessDataModel.executeStoredProcedureProductos(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/category-cliente'}, {result_api: null}], 1)

}
function getProducts(req, res){
    console.log(req.params)
    //console.log(req.body)
   
var fecha = moment().format("YYYY/MM/DD");
console.log(fecha)
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 16},
    {"nombre":"code_id", "tipo": accessDataModel.sqlapi.Int, "valor": req.params.code_id},
    {"nombre":"chofer", "tipo": accessDataModel.sqlapi.Int, "valor": req.params.chofer},
    {"nombre":"fechapedido", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": fecha}]
                    
   accessDataModel.executeStoredProcedureProductos(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/category-product'}, {result_api: null}], 1)
}
module.exports = {
    getCategorias,
    getProducts,
    getClientes,
    getProductos,
    getDescuentos,
    getPrecios,
    getPedidos,
    getDetalles,
    getStock,
    getZonas,
    getEmpresas,
    getEmpresasProductos,
    getEmpresasProductosImagenes,
    getEmpresasCategorias
}