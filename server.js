var http = require('http');
var fs = require('fs');

http.createServer(function(req,res) {
    fs.readFile('datasets/religion-prison-inmates.json', 'utf-8', function(err,data) {
        if(err) {
            return console.log(error);
        }
        else {
            res.writeHead(200, {'content-type':'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET'
        });
            res.end(data, 'utf-8');
        }
    });
}).listen(3600,'localhost');