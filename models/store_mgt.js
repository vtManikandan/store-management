'use strict';

var mongo = require("mongodb")
  , ObjectId = mongo.ObjectId
  ;
  
module.exports = function(db){
    var materialsCollection = db.collection("materials");
    var vendorsCollection = db.collection("vendors");
    var model = {};
    model.getMaterials = getMaterials;
    model.postMaterials = postMaterials;
    model.putMaterial = putMaterial;
    model.deleteMaterial = deleteMaterial;
    
    model.getVendors = getVendors;
    model.postVendor = postVendor;
    model.putVendor = putVendor;
    model.deleteVendor = deleteVendor;
    
    return model;
    //////////////
    /**
     * Get all materials in materials collection
     */
    function getMaterials(){
        return materialsCollection.find().toArray()
        .then(materials => {
            if(materials){
                return materials;
            }else{
                var err = new Error("Materials not found");
                throw err;
            }
        })
        .catch(err => {
            return err;
        });
    }
    /**
     * Add materials in material collection
     */
    function postMaterials(materials){
        return materialsCollection.findOne({name: materials.name})
        .then(material => {
            if(material){
                var err = new Error("Material already exist.");
                throw err;
            }else{
                var obj = {
                    "name" : materials.name, 
                    "rate" : materials.rate, 
                    "quantity" : materials.quantity,
                    "datetime": new Date()
                }
                return  materialsCollection.insert(obj);
            }
        })
        .catch(err => {
            return err;
        });
    }
    /**
     * Update material
     */
    function putMaterial(material){
        if(!ObjectId.isValid(material._id)){
            return Promise.reject({ error: "Invalid object id" });
        }
        var obj = {
            "name" : material.name, 
            "rate" : material.rate, 
            "quantity" : material.quantity,
            "datetime": new Date()
        }
        var updateObj= {$set: obj, $push: {"history": obj}};
        return materialsCollection.findOneAndUpdate(
            {
                "_id": ObjectId(material._id),
                $or:[
                    {"name": {$ne: material.name}},
                    {"rate": {$ne: material.rate}},
                    {"quantity": {$ne: material.quantity}},
                ]
            },updateObj,{
                returnOriginal: false
            }
        );       
    }
    /**
     * Delete material
     */
    function deleteMaterial(obj){
        if(!ObjectId.isValid(obj._id)){
            return Promise.reject({ error: "Invalid object id" });
        }
        return materialsCollection.remove( { "_id" : ObjectId(obj._id) } );
    }
    /**
     * Get vendors
     */
    function getVendors(){
        return vendorsCollection.find().toArray()
        .then(vendors => {
            if(vendors){
                return vendors;
            }else{
                var err = new Error("Vendors not found");
                throw err;
            }
        })
        .catch(err => {
            return err;
        });
    }
    
    /**
     * Add vendor
     */
    function postVendor(vendor){
        return vendorsCollection.findOne({name: vendor.name})
        .then(result => {
            if(result){
                var err = new Error("Vendor already exist.");
                throw err;
            }else{
                var obj = {
                    "name" : vendor.name,
                    "datetime": new Date()
                }
                return  vendorsCollection.insert(obj);
            }
        })
        .catch(err => {
            return err;
        });
    }
    
    /**
     * Update vendor
     */
    function putVendor(vendor){
        if(!ObjectId.isValid(vendor._id)){
            return Promise.reject({ error: "Invalid object id" });
        }
        var obj = {
            "name" : vendor.name,
            "datetime": new Date()
        }
        var updateObj= {$set: obj};
        return vendorsCollection.findOneAndUpdate(
            {
                "_id": ObjectId(vendor._id),
                $or:[
                    {"name": {$ne: vendor.name}}
                ]
            },updateObj,{
                returnOriginal: false
            }
        );       
    }
    
    /**
     * Delete vendor
     */
    function deleteVendor(obj){
        if(!ObjectId.isValid(obj._id)){
            return Promise.reject({ error: "Invalid object id" });
        }
        return vendorsCollection.remove( { "_id" : ObjectId(obj._id) } );
    }
}