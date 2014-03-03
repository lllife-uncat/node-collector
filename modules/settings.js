
var dev = {
    connectionString : "localhost:27017/collector",
    ipAddress: "0.0.0.0",
    port: 8080
};

var production = {
    connectionString : "mongodb://admin:yYsEAGxCIDn4@127.4.69.2:27017",
    ipAddress: process.env.OPENSHIFT_NODEJS_IP,
    port: process.env.OPENSHIFT_NODEJS_PORT || 8080
};

exports.configs = dev;
exports.configs = production;
