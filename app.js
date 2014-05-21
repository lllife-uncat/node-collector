#!/bin/env node

// Load all javascript module.
var restify = require('restify');
var services = require("./modules/services").services;
var configs = require("./modules/settings").configs;

/**
* Create node server.
*/
function createServer() {
  // config server
  // * bind = 0.0.0.0 (can access from all host)
  // * open port  = 8080
  // * name = OpenCollector
  var ipAddress = configs.ipAddress;
  var port = configs.port;
  var server = restify.createServer({ name: 'open-collector' } );

  // config server
  // * enable query parser (url)
  // * enable body parser
  // * support cors
  server.use(restify.queryParser());
  server.use(restify.bodyParser());
  server.use(restify.CORS());

  // start server
  // * port: 8080
  server.listen(port, ipAddress, function () {
    console.log("%s listening at %s ", server.name, server.url);
  });

  return server;
}

/**
* Register sonic service.
* @param {Server} server
* @param {module.services} services.
*/
function registerSonics(server, services){
  server.post({
    path: "/sonics",
    version: '0.0.1'
  }, services.postNewSonic);

  server.get({
    path: "/sonics"
  }, services.findAllSonics);

  server.post({
    path: "/sonics/query"
  }, services.querySonics);
}

/**
* Register touch service.
* @param {Server} server.
* @param {module.services} services.
*/
function registerTouchs(server, services) {
  server.post({
    path: "/touchs",
    version: '0.0.1'
  }, services.postNewTouch);

  server.get({
    path: "/touchs" ,
    version: '0.0.1'
  }, services.findAllTouchs);

  server.post({
    path : "/touchs/query",
    version : "0.0.1"
  }, services.queryTouchs);
}

/**
* Regiser pirs services.
* @param {Server} server.
* @param {modules.services}
*/
function registerPIRs(server, services) {
  server.post({
    path : "/pirs/query",
    version : "0.0.1"
  }, services.queryPIRs);

  server.post({
    path : "/pirs",
    version : '0.0.1'
  }, services.postNewPIR);

  server.get({
    path: "/pirs",
    version: '0.0.1'
  }, services.findAllPIRs);
}

/**
* Register all services then start server.
*/
function startNow() {
  var server = createServer();
  registerTouchs(server, services);
  registerPIRs(server, services);
  registerSonics(server, services);
}

// Start node server...
startNow();
