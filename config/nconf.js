var path = require("path");
(function () {
    var nconf;

    nconf = require("./" + (process.env.NODE_ENV || "development") + "/index.json");
    nconf.pingpath = path.join(__dirname, '../nginx_ssl/pingpp_private.pem')
    console.log("  nconf.pingpath:" + nconf.pingpath)
    console.log(process.env.NODE_ENV)
    module.exports = nconf;

}).call(this);