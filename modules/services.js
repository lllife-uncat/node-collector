var models = require("./models");
var touchs = models.collections.touchs;
var pirs = models.collections.pirs;
var sonics = models.collections.sonics;

var mongojs = require('mongojs');
var ObjectId = mongojs.ObjectId;

/* append header
 * allow: *
 */
function setHeader(res) {
  res.setHeader('Access-Control-Origin', '*');
}

/** find all touchs hander..
  * req: http request
  * res: http response
  * next: ???
  */
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
    var jsonDate = req.params.collectDate;
    var id = req.params.id || "000000000000000000000000"
    log(jsonDate); log(id);
    if(jsonDate){
        var date = new Date(jsonDate);
        var query = { _id : { $gt : new ObjectId(id) } };
        pirs.find(query).limit(50).skip(0 , function(err, success){
            if(success) {
                success.forEach(function(c){
                    console.log(c._id);
                });
                res.send(200, success);
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

function querySonics(req, res, next){
    var jsonDate = req.params.collectDate;
    var id = req.params.id || "000000000000000000000000"
    log(jsonDate); log(id);
    if(jsonDate){
        var date = new Date(jsonDate);
        var query = { _id : { $gt : new ObjectId(id) } };
        sonics.find(query).limit(50).skip(0 , function(err, success){
            if(success) {
                success.forEach(function(c){
                    console.log(c._id);
                });
                res.send(200, success);
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


function log(name, value) {
    if(!value) {
        console.log(">> " + name)
    }else {
        console.log(name + " >> " + value);
    }
}

function queryTouchs(req, res, next){
    if(req.params.remove){
        touchs.remove();
        pirs.remove();
    }
    var jsonDate = req.params.collectDate;
    var id = req.params.id || "000000000000000000000000"
    log(jsonDate); log(id);
    if(jsonDate) {
        var date = new Date(jsonDate);
        touchs.find({ _id : { $gt: new ObjectId(id) }}).limit(50).skip( 0, function(err, success){
            if(success) {
                success.forEach(function(c){
                    console.log(c._id);
                });
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

function findAllSonics(req, res, next) {
  setHeader(res);
  sonics.find().limit(100000).sort({ postedOn: -1}, function(err, datas) {
    if(datas) {
      res.send(200, datas);
      return next();
    }else {
      return next(err);
    }
  });
}

function postNewSonic(req, res, next){
  console.log(req.params);
  setHeader(res);
  var sonic = new models.Sonic();
  sonic.deviceId = req.params.deviceId;
  sonic.enterDate = new Date(req.params.enterDate);
  sonic.leaveDate = new Date(req.params.leaveDate);
  sonics.save(sonic, function(err, success){
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
  postNewTouch: postNewTouch,
  postNewPIR : postNewPIR,
  postNewSonic : postNewSonic,
  findAllPIRs : findAllPIRs,
  findAllTouchs: findAllTouchs,
  findAllSonics: findAllSonics,
  queryTouchs : queryTouchs,
  queryPIRs : queryPIRs,
  querySonics: querySonics
};
