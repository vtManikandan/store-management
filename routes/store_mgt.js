var express = require('express')
,router = express.Router()
;

module.exports = function(app){
    var models = app.models;
    
    /**
     * Material
     */
    router.get('', getMaterials);
    router.post('', postMaterials);
    router.put('', putMaterial);
    router.delete('', deleteMaterial);
    
    /**
     * Vendor
     */
    router.get('/vendor', getVendors);
    router.post('/vendor', postVendor);
    router.put('/vendor', putVendor);
    router.delete('/vendor', deleteVendor);
    
    app.server.use('/materials', app.middlewares.rest());
    app.server.use('/materials', router);
    
    app.server.use('/master', app.middlewares.rest());
    app.server.use('/master', router);
    
    function getMaterials(req, res){
        models.store_mgt.getMaterials()
        .then(materials => {
            res.status(200).send(materials);
        })
        .catch(err => {
            res.status(500).send(materials);
        });
    }
    
    function postMaterials(req, res){
        models.store_mgt.postMaterials(req.body)
        .then(materials => {
            if(materials.result){
                res.status(200).send("Successfully Inserted");
            }else{
                res.status(409).send("Material already exist");
            }
        })
        .catch(err => {
            res.status(500).send("error");
        });
    }
    
    function putMaterial(req, res){
        models.store_mgt.putMaterial(req.body)
        .then(materials => {
            if(materials.value){
                res.status(200).send("Successfully updated");
            }else{
                res.status(409).send("No updates");
            }
        })
        .catch(err => {
            res.status(500).send(err.error);
        });
    }
    
    function deleteMaterial(req, res){
        models.store_mgt.deleteMaterial(req.body)
        .then(result => {
            if(result.result.n > 0){
                res.status(200).send("Successfully deleted");
            }else{
                res.status(409).send("No record found");
            }
        })
        .catch(err => {
            res.status(500).send(err.error);
        });
    }
    
    function getVendors(req, res){
        models.store_mgt.getVendors()
        .then(vendors => {
            res.status(200).send(vendors);
        })
        .catch(err => {
            console.log("err", err);
            res.status(500).send(err);
        });
    }
    
    function postVendor(req, res){
        models.store_mgt.postVendor(req.body)
        .then(vendor => {
            if(vendor.result){
                res.status(200).send("Successfully Inserted");
            }else{
                res.status(409).send("Material already exist");
            }
        })
        .catch(err => {
            res.status(500).send("error");
        });
    }
    
    function putVendor(req, res){
        models.store_mgt.putVendor(req.body)
        .then(vendor => {
            if(vendor.value){
                res.status(200).send("Successfully updated");
            }else{
                res.status(409).send("No updates");
            }
        })
        .catch(err => {
            res.status(500).send(err.error);
        });
    }
    
    function deleteVendor(req, res){
        models.store_mgt.deleteVendor(req.body)
        .then(result => {
            if(result.result.n > 0){
                res.status(200).send("Successfully deleted");
            }else{
                res.status(409).send("No record found");
            }
        })
        .catch(err => {
            res.status(500).send(err.error);
        });
    }
}