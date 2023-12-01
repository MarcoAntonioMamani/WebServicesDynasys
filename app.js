'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')
const winston = require('winston');
const expressWinston = require('express-winston');
const { format } = require('date-fns');

var expressValidator=require('express-validator')
winston.configure({
    transports: [
      new winston.transports.File({
        level: 'info',
        filename: 'logs/app.log',
        json: true,
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
      }),
    ],
  });
  const excludeGetRequestsFromLogs = (req, res) => req.method === 'GET';

  // Middleware para excluir solicitudes GET específicas
const excludeGetRequests = (req, res, next) => {
    if (req.method === 'GET') {
       req.excludeFromLogs = true;
    }
    next();
  };
  
 // Middleware de express-winston para registrar información de las solicitudes HTTP
const requestLogger = expressWinston.logger({
    transports: [
      new winston.transports.File({
        level: 'info',
        filename: `logs/requests-${format(new Date(), 'yyyyMMdd-HHmmss')}.log`, // Nombre del archivo con fe
        json: true,
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
      }),
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.printf(info => {
          const meta = info.meta || {};
          const body = meta.req ? JSON.stringify(meta.req.body) : undefined;
          return `${info.timestamp} ${info.level}: ${info.message} ${body}`;
        }),
    ),
    responseWhitelist: [...expressWinston.responseWhitelist, 'body'],
    requestWhitelist: [...expressWinston.requestWhitelist, 'body'],
    meta: true,
    expressFormat: true,
    colorize: false,
    skip: excludeGetRequestsFromLogs, 
  });
  
  // Aplicar el middleware de exclusión a todas las rutas
  app.use(excludeGetRequests);

  // Aplicar el middleware de registro a todas las solicitudes
  app.use(requestLogger);
app.use(expressValidator())
//app.use(bodyParser.raw())
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', api)

module.exports = app
