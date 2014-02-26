
var dev = {
    connectionString : "localhost:27017/collector",
    ipAddress: "0.0.0.0",
    port: 8080,
    touchsPath : "/touchs",
    pirsPath : "/pirs"
};

var production = {
    connectionString : "mongodb://admin:yYsEAGxCIDn4@$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/collector",
    ipAddress: "0.0.0.0",
    port: 8080,
    touchsPath : "/touchs",
    pirsPath : "/pirs"
};

exports.configs = dev;
//exports.configs = production;
