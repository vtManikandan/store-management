var express = require('express'),      
bodyParser = require('body-parser'),
http = require('http')
;

module.exports = {
    install: function (app){
        var exp = express();
        exp.use(bodyParser.json());
        exp.use(bodyParser.urlencoded({ extended: false }));
        app.server = exp;
        return app;
    },
    start: function (app){
        var port = process.env.PORT || '3000';
        app.server.set('port', port);
        return new Promise((resolve, reject) => {
            app.server = http.createServer(app.server);
            app.server.timeout = 0;
            app.server.listen(port);
            
            app.server.on('error', function(error){
                reject(error);
            });
            app.server.on('listening', function(){
                console.log("Listening on " + JSON.stringify(app.server.address()));
                resolve(app);
            });
        });
    }
}