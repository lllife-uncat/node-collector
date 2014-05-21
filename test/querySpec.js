var expect = require("chai").expect;
var http = require("http");

describe("[Sonic]", function(){

  var production = true;
  var host = "10.0.0.77";
  var port = 8080;
  var headers =  { "Content-Type" : "application/json" };

  if(production) {
    host = "collector-pacific.rhcloud.com";
    port = 80
  }

  it("Query by example success", function(done){
    var options = {
      host: host,
      port: port,
      path: "/sonics/query",
      method: "POST",
      headers: headers
    };

    var data = { collectDate: new Date() };

    var request = http.request(options, function(res){
      res.setEncoding("utf8");
      res.on("data", function(chunck){
        var rs = JSON.parse(chunck);
        console.log(rs);
        expect(rs.length).not.equal(0);
        done();
      });
    });

    var body = JSON.stringify(data);
    request.write(body);
    request.end();

  });

  it("Query all sonics success", function(done){
    var options = {
      host: host,
      port: port,
      path: "/sonics",
      method: "GET",
      headers: headers
    };

    var request = http.request(options, function(res){
      res.setEncoding("utf8");
      res.on("data", function(chunck){
        var rs = JSON.parse(chunck);
        expect(rs.length).not.equal(0);
        done();
      });
    });

    request.end();

  });

  it("Add new sonic successful", function(done){
    var options = {
      host: host,
      port: port,
      path: "/sonics",
      method: "POST",
      headers: headers
    };

    var data = { enterDate : new Date(), leaveDate: new Date(), deviceId: "001" };
    var request = http.request(options, function(res){
      res.setEncoding("utf8");
      res.on("data", function(chunck){
        var rs = JSON.parse(chunck);
        expect(rs.enterDate.toString()).to.equal(data.enterDate.toISOString());
        expect(rs.leaveDate.toString()).to.equal(data.leaveDate.toISOString());
        done();
      });
    });

    var body = JSON.stringify(data);
    request.write(body);
    request.end();
  });
});
