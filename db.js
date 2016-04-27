var mongodb = require('mongodb')
  , MongoClient = mongodb.MongoClient
  ;
    
module.exports = {
    connect: function (app) {
        return new Promise((resolve, reject) => {
            MongoClient.connect('mongodb://localhost:27017/stock_management', function (err, db) {
                if (!err) {
                    app.db = db;
                    resolve(app);
                    console.log("Successfully connected to db");
                } else {
                    reject(err);
                    console.log("Failed to connect to db");
                }
            });
        });
    }
}