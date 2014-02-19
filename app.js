// laod modules
var restify = require('restify');
var mongojs = requre('mongojs');

// config server
var ipAddress = '0.0.0.0';
var port = '8080';
var server = restify.createServer({name: 'OpenCollector'});

// config server
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

// start server @8080
server.listen(port, ipAddress, function () {
    console.log("%s listening at %s ", server.name, server.url);
});

// configure database
var connectionString = "localhost:27017/collector";
var db = mongojs(connectionString, ["collector"])
var touchs = db.collection("touchs");


// configure rest service
var PATH = "/touchs";
server.get({
        path: PATH,
        version: '0.0.1'
    }, findAllTouchs
)

server.post({
        path: PATH,
        version: '0.0.1'
    }, postNewTouch
);

// service function
// * findAllTouchs(request, response, next)
function findAllTouchs(req, res, next) {
    res.setHeader('Access-Control-Origin', '*');

    touchs.find().limit(20).sort({ postedOn: -1 }, function (err, success) {
        console.log("Response success " + success);
        console.log("Response error " + err);
        if (success) {
            res.send(200, success);
            return next();
        } else {
            return next(err);
        }
    });
}

// service function
// * postNewTouch(request, response, next)
function postNewTouch(req, res, next){
    var touch = {};
    touch.date = req.params.date;
    touch.deviceId = req.params.deviceId;
    touch.objectType = req.params.objectType;
    touch.objectId = req.params.objectId;

    res.setHeader("Access-Control-Allow-Origin", "*");

    touchs.save(touch, function(err, success){
        console.log("Response success " + success);
        console.log("Response error ", + err);

        if(success){
            res.send(201, touch);
            return next();
        }else {
            return next(err);
        }
    });
}

