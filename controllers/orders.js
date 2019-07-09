'use strict'
const jwt=require('jwt-simple')
const moment=require('moment')
const config=require('../config')
const js2xmlparser = require("js2xmlparser");
const accessDataModel = require('../models/access_data')



/////////UPDATE PEDIDOS  MOVIL REPARTIDOR
function postPedidos(req, res){
    //console.log('GET /api/categoria-producto')
    //console.log(req.body)
    console.log(req.params)
    const cod_cliente=req.params.code_id
    const credito=req.params.credito

  
    //console.log(detalle)
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 17},
    {"nombre":"code_id", "tipo": accessDataModel.sqlapi.Int, "valor": cod_cliente},
    {"nombre":"credito", "tipo": accessDataModel.sqlapi.Decimal(18,2), "valor": credito},
    {"nombre":"location_lat", "tipo": accessDataModel.sqlapi.Decimal(18,14), "valor": req.params.latitud},
    {"nombre":"location_log", "tipo": accessDataModel.sqlapi.Decimal(18,14), "valor": req.params.longitud}]
                    
   accessDataModel.executeStoredProcedurePedidosPost(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/orders'}, {result_api: null}], 1)

}


function getPedidos(req, res){
    //console.log('GET /api/categoria-producto')
    //console.log(req.body)
    const token =req.headers.tokenauthorization
    const payload=jwt.decode(token,config.SECRET_TOKEN)
    const cod_cliente=payload.sub

   
    //console.log(detalle)
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 10},
    {"nombre":"code_id", "tipo": accessDataModel.sqlapi.Int, "valor": cod_cliente}]
                    
   accessDataModel.executeStoredProcedureProductos(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'GET /api/orders'}, {result_api: null}], 1)

}
function getPedidosProducts(req, res){
    //console.log(req.params)
    //console.log(req.body)
    const token =req.headers.tokenauthorization
    const payload=jwt.decode(token,config.SECRET_TOKEN)
    const cod_cliente=payload.sub
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 11},
    {"nombre":"code_id", "tipo": accessDataModel.sqlapi.Int, "valor": cod_cliente},
    {"nombre":"pedido", "tipo": accessDataModel.sqlapi.Int, "valor": req.params.ordersID}]
                    
   accessDataModel.executeStoredProcedureProductos(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/order/products'}, {result_api: null}], 1)
}


module.exports = {
    postPedidos,
    getPedidos,
    getPedidosProducts
}