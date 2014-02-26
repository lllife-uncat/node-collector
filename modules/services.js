var models = require("./models");
var touchs = models.collections.touchs;
var pirs = models.collections.pirs;

// append header
// * allow: *
function setHeader(res) {
    res.setHeader('Access-Control-Origin', '*');
}

// find all touchs hander..
// req: http request
// res: http response
// next: ???
function findAllTouchs(req, res, next) {
    setHeader(res);

    touchs.find().limit(10000).sort({ postedOn: -1 }, function (err, success) {
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

function queryPIRs(req, res, next){
    var jsonDate = req.params.enterDate;
    if(jsonDate){

        console.log("params: " + jsonDate);
        var enterDate = new Date(jsonDate);

        console.log(enterDate.toString());

        var query = { enterDate : { $gt : enterDate } };
        pirs.find(query).limit(10).skip(0 , function(err, success){
            if(success) {
                console.log("success");

                res.send(200, success);
                return next();
            }else {
                console.log("[ERROR]")
                console.log(err);
                return next(err);
            }
        });
    }
}

function queryTouchs(req, res, next){

    var jsonDate = req.params.touchDate;
    
    if(jsonDate) {
        
        console.log("params: " + jsonDate);
        var touchDate = new Date(jsonDate);

        console.log(touchDate.toString());

        touchs.find({ touchDate : { $gt: touchDate }}).limit(10).skip( 0, function(err, success){
            if(success) {
                console.log(success);

                res.send(200, success)
                return next();
            }else {
                console.log("[ERROR]")
                console.log(err);
                return next(err);
            }
        });

    } else {
        res.send(200, []);
        return next();
    }
}

// service function
// req: http request
// res: http response
// next: ???
function postNewTouch(req, res, next) {
    setHeader(res);

    var touch = new models.Touch();
    touch.touchDate = new Date(req.params.touchDate);
    touch.deviceId = req.params.deviceId;
    touch.objectType = req.params.objectType;
    touch.objectId = req.params.objectId;

    touchs.save(touch, function (err, success) {
        console.log("Response success " + success);
        console.log("Response error " + err);

        if (success) {
            res.send(200, touch);
            return next();
        } else {
            return next(err);
        }
    });
}



// find all touchs hander..
// req: http request
// res: http response
// next: ???
function findAllPIRs(req, res, next) {
    setHeader(res);

    pirs.find().limit(10000).sort({ postedOn: -1 }, function (err, success) {
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


function postNewPIR(req, res, next){

    setHeader(res);

    var pir = new models.PIR();
    pir.deviceId = req.params.deviceId;
    pir.enterDate = new Date(req.params.enterDate);
    pir.leaveDate = new Date(req.params.leaveDate);

    pirs.save(pir, function(err, success){
        console.log("Response sucess " + success);
        console.log("Response error " + err);

        if(success){
            res.send(200, success);
        }else {
            return next(err);
        }
    });
}

exports.services = {
    findAllTouchs: findAllTouchs,
    postNewTouch: postNewTouch,
    findAllPIRs : findAllPIRs,
    postNewPIR : postNewPIR,
    queryTouchs : queryTouchs,
    queryPIRs : queryPIRs
};
