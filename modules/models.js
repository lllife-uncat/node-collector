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
var pirs =db.collection("pirs");
var sonics = db.collection("sonics");

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

function PIR() {
  this.enterDate = null;
  this.leaveDate = null;
  this.deviceId = null;

  Base.apply(this, arguments);
  Object.preventExtensions(this);
}

function Sonic() {
  this.enterDate = null;
  this.leaveDate = null;
  this.deviceId = null;

  Base.apply(this, arguments);
  Object.preventExtensions(this);
}

exports.collections = {
  touchs : touchs,
  pirs : pirs,
  sonics : sonics
};

exports.Touch= Touch;
exports.PIR = PIR;
exports.Sonic = Sonic;

