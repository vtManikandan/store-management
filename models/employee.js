'use strict';

var mongo = require("mongodb")
  , ObjectId = mongo.ObjectId
  ;
  
module.exports = function(db){
    var employeeCollection = db.collection("emp_profile");
    var designationCollection = db.collection("designation");
    var model = {};
    model.getEmployeeById = getEmployeeById;
    model.getEmployeeByIdAndPassword = getEmployeeByIdAndPassword;
    return model;
    //////////////
    function getEmployeeById(id){
        return employeeCollection.findOne({ "emp_id": id})
        .then(employee => {
            if(employee){
                return employee;
            }else{
                return {"error": "Employee not found"};
            }
        });
    }
    /**
     * Get user by emp id and password
     */
    function getEmployeeByIdAndPassword(payload){
        return employeeCollection.findOne({"emp_id": payload.emp_id, "password": payload.password})
        .then(employee => {
            if(employee){
                delete employee.password;
                return employee;
            }else{
                return {"error": "Employee not found"}
            }
        })
        .catch(err => {
            return err;
        });
    }
    
    function getDesignationName(id){
        return designationCollection.findOne({"_id": ObjectId(id)})
        .then(designation => {
            return designation;
        })
        .catch(err => {
           return err; 
        });
    }
}