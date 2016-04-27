var express = require('express')
,router = express.Router()
;

module.exports = function(app){
    var models = app.models;
    
    router.get('/', getUser);
    
    app.server.use('/api', app.middlewares.rest());
    app.server.use('/api', router);
    
    function getUser(req, res){
        // res.json({ message: 'hooray! welcome to our api!' });
        // models.user.getUserById(req.token.userId)
        models.user.getUserById('56f7919bd4c6460cf438fdf1')
        .then(user => {
            
            var resp = {
                _id: user._id,
                name: user.name,
                age: user.age
            }
            res.status(200).send(resp);
            
            console.log({"event": "CURRENT_USER", "message": "User details given", "email": user.email});
            
        })
        .catch(err => {
            
            console.log(err);
            
            res.status(500).send({ "error": "User not found" });
            
        });
    }
}