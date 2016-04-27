module.exports = {
    install: function(app){
        app.models = {};
        app.models.employee = require("./employee")(app.db);
        app.models.store_mgt = require("./store_mgt")(app.db);
        return app;
    }
}