var mongojs = require('mongojs');
var configs = require("./settings").configs;

// configure database
// * host: localhost
// * port: 27017
// * db: collector
// * collection: touchs

var connectionString = configs.connectionString;
var db = mongojs(connectionString, ["collector"])
var touchs = db.collection("touchs");

function Base() {
    this.collectDate = new Date();
    Object.preventExtensions(this);
}

function Touch() {
    this.touchDate = null;
    this.deviceId = null;
    this.objectType = "Product";
    this.objectId = null;

    Base.apply(this, arguments);
    Object.preventExtensions(this);
}


exports.collections = {
    touchs : touchs
};

exports.Touch= Touch;

