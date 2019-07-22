'use strcit'

const sqlapi = require('mssql')
const service=require('../Services')
const accessDataModel = require('../models/access_data')
const mail=require('../controllers/mail')
function VerificarCuenta(res,email,pass,array){
    var request = new sqlapi.Request()
      array.forEach(function(element) {
          request.input(element.nombre, element.tipo, element.valor)    
    }, this);
    request.execute('sp_go_TC004_appMovil', function(err, result){
        if (err) {
            res.status(500).send({code:3,message:'La conexión ha sido interrumpida'})
        } else {
            // console.log(result.recordsets[0].length) // count of rows contained in first recordset 
          // console.log(result.recordset[0]["code_id"]) // first recordset from result.recordsets 
          if(result.recordsets[0].length==1){
             
            res.status(200).send({code:0,message:'Usuario logueado exitosamente',token:service.createToken(result.recordset[0]["code_id"])})
          }else{
         
           res.status(200).send({code:4,message:'Datos inválidos. por favor inserte un correo y una contraseña válida'})
         
           }
        }
    }) 
}

function VerificarCuentaRepartidor(res,email,pass,array){
    var request = new sqlapi.Request()
      array.forEach(function(element) {
          request.input(element.nombre, element.tipo, element.valor)    
    }, this);
    request.execute('sp_go_TC004_appMovil', function(err, result){
        if (err) {
            res.status(500).send({code:3,message:'La conexión ha sido interrumpida'})
        } else {
            // console.log(result.recordsets[0].length) // count of rows contained in first recordset 
          // console.log(result.recordset[0]["code_id"]) // first recordset from result.recordsets 
          if(result.recordsets[0].length==1){             
            res.status(200).send({code:0,message:'Usuario logueado exitosamente',token:result.recordset[0]["repartidor"],id:result.recordset[0]["code_id"],zona:result.recordset[0]["zona"]})
          }else{         
           res.status(200).send({code:4,message:'Datos inválidos. por favor inserte un correo y una contraseña válida',toke:"Failed",id:0,zona:0})         
           }
        }
    }) 
}
function ExisteEMail(res,pass,email,array){
    let request = new sqlapi.Request()
    console.log(pass)
    console.log(email)
      array.forEach(function(element) {
          request.input(element.nombre, element.tipo, element.valor)    
    }, this)

 request.execute('sp_go_TC004_appMovil',  function(err, result,b){
     
        if (err) {
            res.status(500).send({code:3,message: 'La conexión ha sido interrumpida'})
            return
        } else {
           //  console.log(result.recordsets[0].length) // count of rows contained in first recordset 
          //  console.log(result.recordset) // first recordset from result.recordsets 
          if(result.recordsets[0].length==1){
         mail.send_mail(res,email,pass)
        }else{        
            res.status(200).send({code:6,message:'El correo '+email+' '+'es invalido'})
            return 

           }
        }
    })
 
    
   
}

function executeStoredProcedure(res, array, spName, resultName, numberRows,mail) {
    var request = new sqlapi.Request()
    //console.dir(array)
    
    array.forEach(function(element) {
        console.dir(element.nombre + " : " + element.tipo + " : " + element.valor)
        request.input(element.nombre, element.tipo, element.valor)    
    }, this);

    request.execute(spName, function(err, result){
        if (err) {
            console.log(`Error mientras consultaba el SP de la base de datos : ${err}`)
            res.status(500).send({code:3,message: 'La conexión ha sido interrumpida'})
        } else {
          // console.log(result.recordsets.length) // count of recordsets returned by the procedure 
         //   console.log(result.recordsets[0].length) // count of rows contained in first recordset 
          console.log(result.recordset) // first recordset from result.recordsets 
       //    console.log(result.returnValue) // procedure return value 
          //  console.log(result.output) // key/value collection of output values 
         //   console.log(result.rowsAffected) // array of numbers, each number represents the number of rows affected by executed statemens 
            if(result.recordsets[0].length==1){
               resultName[1].result_api=result.recordset
         
               //res.status(200).send(resultName)
               res.status(200).send({code:0,message:'Usuario creado exitosamente',token:result.recordset[0]["code_id"]})
           }else{
   
                resultName[1].result_api=result.recordset[numberRows-1]
               // res.status(200).send(resultName)
                res.status(200).send({code:2,message:'El usuario '+mail+' '+'ya fue registrado en el sistema. por favor inserte otro usuario'})
            {result: result.recordset[numberRows-1]}
                
            }
        }
    })
}

function executeStoredProcedureLogin(res, array, spName, resultName, numberRows,mail) {
    var request = new sqlapi.Request()
    //console.dir(array)
    
    array.forEach(function(element) {
        console.dir(element.nombre + " : " + element.tipo + " : " + element.valor)
        request.input(element.nombre, element.tipo, element.valor)    
    }, this);

    request.execute(spName, function(err, result){
        if (err) {
            console.log(`Error mientras consultaba el SP de la base de datos : ${err}`)
            res.status(500).send({code:3,message: 'La conexión ha sido interrumpida'})
        } else {
          // console.log(result.recordsets.length) // count of recordsets returned by the procedure 
         //   console.log(result.recordsets[0].length) // count of rows contained in first recordset 
          console.log(result.recordset) // first recordset from result.recordsets 
       //    console.log(result.returnValue) // procedure return value 
          //  console.log(result.output) // key/value collection of output values 
         //   console.log(result.rowsAffected) // array of numbers, each number represents the number of rows affected by executed statemens 
            if(result.recordsets[0].length==1){
               resultName[1].result_api=result.recordset
         
               //res.status(200).send(resultName)
               res.status(200).send({code:0,message:'Usuario creado exitosamente',token:result.recordset[0]["code_id"],zona:result.recordset[0]["zona"]})
           }else{
   
                resultName[1].result_api=result.recordset[numberRows-1]
               // res.status(200).send(resultName)
                res.status(200).send({code:2,message:'El usuario '+mail+' '+'ya fue registrado en el sistema. por favor inserte otro usuario',token:0})
            {result: result.recordset[numberRows-1]}
                
            }
        }
    })
}
function executeStoredProcedureLocation(res, array, spName, resultName, numberRows,mail) {
    var request = new sqlapi.Request()
    //console.dir(array)
    
    array.forEach(function(element) {
        console.dir(element.nombre + " : " + element.tipo + " : " + element.valor)
        request.input(element.nombre, element.tipo, element.valor)    
    }, this);

    request.execute(spName, function(err, result){
        if (err) {
            console.log(`Error mientras consultaba el SP de la base de datos : ${err}`)
            res.status(500).send({code:3,message: 'La conexión ha sido interrumpida'})
        } else {
          // console.log(result.recordsets.length) // count of recordsets returned by the procedure 
         //   console.log(result.recordsets[0].length) // count of rows contained in first recordset 
          console.log(result.recordset) // first recordset from result.recordsets 
       //    console.log(result.returnValue) // procedure return value 
          //  console.log(result.output) // key/value collection of output values 
         //   console.log(result.rowsAffected) // array of numbers, each number represents the number of rows affected by executed statemens 
            if(result.recordsets[0].length==1){
               resultName[1].result_api=result.recordset
         
               //res.status(200).send(resultName)
               res.status(200).send({code:0,message:'Usuario creado exitosamente',token:result.recordset[0]["respuesta"]})
           }else{
   
                resultName[1].result_api=result.recordset[numberRows-1]
               // res.status(200).send(resultName)
                res.status(200).send({code:2,message:'Error'})
            {result: result.recordset[numberRows-1]}
                
            }
        }
    })
}

function executeStoredProcedureProductos(res, array, spName, resultName, numberRows) {
    var request = new sqlapi.Request()
    //console.dir(array)
    
    array.forEach(function(element) {
       // console.dir(element.nombre + " : " + element.tipo + " : " + element.valor)
        request.input(element.nombre, element.tipo, element.valor)    
    }, this);

    request.execute(spName, function(err, result){
        if (err) {
            console.log(`Error mientras consultaba el SP de la base de datos : ${err}`)
            res.status(500).send({code:3,message: 'La conexión ha sido interrumpida'})
        } else {
       if(result.recordsets[0].length==1){
        res.status(200).send(result.recordset)
           }else{ 
         
                res.status(200).send(result.recordset)
                 
            }
        }
    })
}


function executeStoredProcedurePedidosPost(res, array, spName, resultName, numberRows) {
    var request = new sqlapi.Request()
    //console.dir(array)
    
    array.forEach(function(element) {
       // console.dir(element.nombre + " : " + element.tipo + " : " + element.valor)
        request.input(element.nombre, element.tipo, element.valor)    
    }, this);

    request.execute(spName, function(err, result){
        if (err) {
            console.log(`Error mientras consultaba el SP de la base de datos : ${err}`)
            res.status(500).send({code:3,message: 'La conexión ha sido interrumpida'})
        } else {
       if(result.recordsets[0].length==1){
        res.status(200).send({code:1,message:'Pedido Actualizado Exitosamente'})
          
        
           }else{ 
         
                res.status(200).send(result.recordset)
                 
            }
        }
    })
}

module.exports = {
    sqlapi,
    executeStoredProcedure,
    VerificarCuenta,
    ExisteEMail,VerificarCuentaRepartidor,
    executeStoredProcedureProductos,executeStoredProcedurePedidosPost,
    executeStoredProcedureLocation,
    executeStoredProcedureLogin
}
