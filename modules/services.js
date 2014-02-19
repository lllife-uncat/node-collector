var models = require("./models");
var touchs = models.collections.touchs;

// append header
// * allow: *
function setHader(res) {
    res.setHeader('Access-Control-Origin', '*');
}

// find all touchs hander..
// req: http request
// res: http response
// next: ???
function findAllTouchs(req, res, next) {
    setHader(res);

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
// req: http request
// res: http response
// next: ???
function postNewTouch(req, res, next) {
    setHader(res);

    var touch = new models.Touch();
    touch.touchDate = new Date(req.params.touchDate);
    touch.deviceId = req.params.deviceId;
    touch.objectType = req.params.objectType;
    touch.objectId = req.params.objectId;

    touchs.save(touch, function (err, success) {
        console.log("Response success " + success);
        console.log("Response error ", +err);

        if (success) {
            res.send(201, touch);
            return next();
        } else {
            return next(err);
        }
    });
}

exports.services = {
    findAllTouchs : findAllTouchs,
    postNewTouch : postNewTouch
};
