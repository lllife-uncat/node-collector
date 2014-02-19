// load modules
var restify = require('restify');
var services = require("./modules/services").services;
var configs = require("./modules/settings").configs;

// config server
// * bind = 0.0.0.0 (can access from all host)
// * open port  = 8080
// * name = OpenCollector
var ipAddress = configs.ipAddress;
var port = configs.port;
var server = restify.createServer({
        name: 'open-collector'
    }
);

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

// touch list service
// * path: /touchs
// * method: get
// * hander: findAllTouchs
server.get({
        path: configs.touchsPath,
        version: '0.0.1'
    }, services.findAllTouchs
)

// add touch service
// * path: /touchs
// * method: post
// * hander: postNewToush
server.post({
        path: configs.touchsPath,
        version: '0.0.1'
    }, services.postNewTouch
);