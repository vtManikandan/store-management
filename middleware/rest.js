require("string").extendPrototype();

var utils = require('../utils')
  , _ = utils._
  ;
  
const AUTH_MECH = "SM-AUTH"
// , APP_SECRET = process.env.APP_SECRET
, APP_SECRET = "timbesecret"
;
  
module.exports = function(app){
    return {
        rest : function rest() {
            return function(req, res, next){
                if(req && req.headers && req.headers.authorization){
                    var code = null;
                    if((code = parseHeader(req.headers.authorization))){
                        authorize(app, code)
                        .then(token => {
                            req.token = token;
                            next();
                        })
                        .catch(err => {
                            res.status(401).send(err);
                        })
                    }else{
                        res.status(401).send({error: 'Invalid Authorization Token'});
                    }
                }else{
                    res.status(401).send({error: 'Missing Authorization Header'});
                }
            }
        },
        authorize: authorize
    }
}



function parseHeader(header){
    if(header.startsWith(AUTH_MECH) && header.contains('token=')){
         return header.between('token="', '"').toString();
    }
    else{
        return header;
    }
}

function authorize(app, code){
    var models = app.models;
    return new Promise((resolve, reject) => {
        var token = null;
        try{
            token = _.decodeToken(code, APP_SECRET);
        }
        catch(ex){
            return reject({error: 'Invalid Authorization Token'});
        }
        if(token.emp_id){
            models.employee.getEmployeeById(token.emp_id)
            .then(employee => {
                resolve(token);
            })
            .catch(err => {
                reject({error: 'Invalid Authorization Token'});
            });
        }
    });
}