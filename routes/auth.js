var express = require('express')
, router = express.Router()
, jwt = require('jwt-simple')
, utils = require('../utils')
, _ = utils._
;

const ERROR_REQUIRED_FIELDS_MISSING = "Required fields missing"
// , APP_SECRET = process.env.APP_SECRET
, APP_SECRET = "timbesecret"
;

module.exports = function(app){
    var models = app.models;
    
    /**
     * authentication
     */
    router.put('/employee', authUser);
    
    app.server.use('/auth', app.middlewares.rest());
    app.server.use('/auth', router);
    
    function authUser(req, res){
        var payload = Object.assign({}, req.body);
        if(!payload.emp_id || !payload.password){
            return res.status(401).send({'error': ERROR_REQUIRED_FIELDS_MISSING});
        }
        models.employee.getEmployeeByIdAndPassword(payload)
        .then(employee => {
            if(!employee.error){
                res.status(200).send({
                    token: _.encodeToken({
                        emp_id: employee.emp_id,
                        name: employee.name
                    }, APP_SECRET),
                    profile: employee
                });
            }else{
                res.status(500).send(employee);
            }
        })
        .catch(err => {
           res.status(500).send(err); 
        });
    }
}