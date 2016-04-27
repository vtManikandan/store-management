module.exports = {
    install: function (app){
        require("./employee")(app);
        require("./store_mgt")(app);
        require("./auth")(app);
        return app;
    }
}