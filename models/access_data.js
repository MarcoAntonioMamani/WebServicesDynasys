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
            res.status(500).send({code:3,message:'La conexión ha sido interrumpida',token:0,id:0})
        } else {
            // console.log(result.recordsets[0].length) // count of rows contained in first recordset 
           console.log(result.recordset[0]) // first recordset from result.recordsets 
          try {
            if(result.recordsets[0].length==1){             
                res.status(200).send({code:0,message:'Usuario logueado exitosamente',token:result.recordset[0]["repartidor"],id:result.recordset[0]["code_id"],zona:result.recordset[0]["zona"],mapa:result.recordset[0]["mapa"],pedido:result.recordset[0]["pedido"]})
              }else{         
               res.status(200).send({code:4,message:'Datos inválidos. por favor inserte un correo y una contraseña válida',token:"Failed",id:0,zona:0})         
               }
          }
          catch(error) {
            console.error(error);
            res.status(200).send({code:4,message:'Error con el servidor de base de datos',token:"Failed",id:0,zona:0})       
              
            // expected output: ReferenceError: nonExistentFunction is not defined
            // Note - error messages will vary depending on browser
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
function executeStoredProcedurePutPedido(res, array, spName, resultName, numberRows,mail) {
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
         try {
            if(result.recordsets[0].length==1){
                resultName[1].result_api=result.recordset
          
                //res.status(200).send(resultName)
                res.status(200).send({code:0,message:'Pedido Actualizado Correctamente',token:result.recordset[0]["code_id"]})
            }else{
    
                 resultName[1].result_api=result.recordset[numberRows-1]
                // res.status(200).send(resultName)
                 res.status(200).send({code:2,message:'Erro al actualizar Pedido'})
             {result: result.recordset[numberRows-1]}
                 
             }
          }
          catch(error) {
            console.error("BD Servidor: "+error);
            res.status(200).send({code:2,message:'Erro al actualizar Pedido BD'})
            {result: result.recordset[numberRows-1]}
          }
     
        }
    })
}
function executeStoredProcedurePostPedidos(res, array, spName, resultName, numberRows,mail) {
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
           
         try {
            if(result.recordsets[0].length==1){
                resultName[1].result_api=result.recordset
          
                //res.status(200).send(resultName)
                res.status(200).send({code:0,message:'Usuario creado exitosamente',token:result.recordset[0]["code_id"]})
            }else{
    
                 resultName[1].result_api=result.recordset[numberRows-1]
                // res.status(200).send(resultName)
                 res.status(200).send({code:2,message:'El pedido ya existe'})
             {result: result.recordset[numberRows-1]}
                 
             }
          }
          catch(error) {
            console.error(error);
            res.status(200).send({code:2,message:'Error con el servidor de Base de datos',token:0,id:0})
            // expected output: ReferenceError: nonExistentFunction is not defined
            // Note - error messages will vary depending on browser
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


function executeStoredProcedureInsertCliente(res, array, spName, resultName, numberRows,mail) {
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
            
         try {
            if(result.recordsets[0].length==1){
                resultName[1].result_api=result.recordset
          
                //res.status(200).send(resultName)
                res.status(200).send({code:0,message:'Usuario creado exitosamente',token:result.recordset[0]["code_id"],id:0})
            }else{
    
                 resultName[1].result_api=result.recordset[numberRows-1]
                // res.status(200).send(resultName)
                 res.status(200).send({code:2,message:'El usuario '+mail+' '+'ya fue registrado en el sistema. por favor inserte otro usuario',token:0,id:0})
             {result: result.recordset[numberRows-1]}
                 
             }
          }
          catch(error) {
            console.error(error);
            res.status(200).send({code:2,message:'Error con el servidor de Base de datos ',token:0,id:0})        
            // expected output: ReferenceError: nonExistentFunction is not defined
            // Note - error messages will vary depending on browser
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

            try {
                if(result.recordsets[0].length==1){
                    res.status(200).send({code:1,message:'Pedido Actualizado Exitosamente'})
                      
                    
                       }else{ 
                     
                            res.status(200).send(result.recordset)
                             
                        }
              }
              catch(error) {
                console.error(error);
                res.status(200).send({code:0,message:'Error con el servidor de Base de datos'})
                // expected output: ReferenceError: nonExistentFunction is not defined
                // Note - error messages will vary depending on browser
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
    executeStoredProcedureLogin,
    executeStoredProcedurePutPedido,
    executeStoredProcedureInsertCliente,
    executeStoredProcedurePostPedidos
}
