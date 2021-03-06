'use strict'

const express = require('express')
const clientCtrl = require('../controllers/client')
const productCtrl = require('../controllers/product')
const ordersCtrl =require('../controllers/orders')
const api = express.Router()
const auth=require('../middlewares/auth')
const authorization=require('../middlewares/authorization')
api.get('/client', clientCtrl.getClient)
api.post('/clients',authorization, clientCtrl.postClient)
api.put('/update-client', clientCtrl.putClient)
api.delete('/delete-client/:code_id', clientCtrl.deleteClient)
api.put('/clients/password',authorization, clientCtrl.putRecoverPassword)
api.post("/clients/login",authorization, clientCtrl.postClientAuth)

api.get('/private',authorization,function(req,res){
res.status(200).send({message:'Tienes Acceso'})
})


////// Clientes ////

api.get('/repartidor/empresas',productCtrl.getEmpresas)
api.get('/repartidor/empresas/productos',productCtrl.getEmpresasProductos)
api.get('/repartidor/empresas/productosImagenes',productCtrl.getEmpresasProductosImagenes)
api.get('/repartidor/empresas/categorias',productCtrl.getEmpresasCategorias)

/////////  Repartidor   ///////////////////////
api.post("/repartidor/login", clientCtrl.postRepartidorAuth)
api.get('/repartidor/clientes/:idrepartidor',productCtrl.getClientes)
api.get('/repartidor/zonas/:idrepartidor',productCtrl.getZonas)
api.get('/repartidor/productos',productCtrl.getProductos)

api.get('/repartidor/descuentos',productCtrl.getDescuentos)

api.get('/repartidor/precios',productCtrl.getPrecios)
api.get('/repartidor/pedidos/:idrepartidor',productCtrl.getPedidos)
api.get('/stock/:idrepartidor',productCtrl.getStock)
api.put('/repartidor/pedido', clientCtrl.putPedidoMovil)
api.put('/repartidor/detalle/:oanumi', ordersCtrl.putDetallePedido)
api.get('/repartidor/detalles/:idrepartidor',productCtrl.getDetalles)
api.post('/repartidor/clients', clientCtrl.postClientMovil)
api.post('/repartidor/clients/:idrepartidor', clientCtrl.postClientMovilRepartidor)
api.post('/repartidor/tracking', clientCtrl.postTrackingMovil)
api.post('/repartidor/pedido', clientCtrl.postPedidoMovil)
api.post('/repartidor/detalle/:oanumi', ordersCtrl.postDetallePedido)
api.put('/repartidor/clients', clientCtrl.putClientMovil)
///////////AQUIIIIIIIIIIIIIIIIIII
api.get("/orders/:code_id/:credito/:latitud/:longitud", ordersCtrl.postPedidos)


api.get("/orders",auth,authorization, ordersCtrl.getPedidos)
api.get('/orders/:ordersID/products',auth,authorization,ordersCtrl.getPedidosProducts)

/////////  PRODUCTOS  ////////
api.get('/products/category',authorization,productCtrl.getCategorias)
api.get('/products/category/:code_id/:chofer',productCtrl.getProducts)


module.exports = api
