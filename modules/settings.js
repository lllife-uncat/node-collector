
var dev = {
    connectionString : "localhost:27017/collector",
    ipAddress: "0.0.0.0",
    port: 8080,
    touchsPath : "/touchs"
};

var production = {
    connectionString : "mongodb://admin:yYsEAGxCIDn4@$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/collector",
    ipAddress: "0.0.0.0",
    port: 8080,
    touchsPath : "/touchs"
};

exports.configs = dev;
exports.configs = production;
