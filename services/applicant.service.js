const {Applicant} = require("../dataBase");

module.exports = {
    findAll: (params = {}) => {
        return Applicant.find(params);
    },
    findOne: (params={})=>{
        return Applicant.findOne(params)
    },
    create: (params = {}) => {
        return Applicant.create(params);
    },
    updateOneApplicant: (params, newApplicant, options = {new: true}) => {
        return Applicant.findOneAndUpdate(params, newApplicant, options);
    },
    deleteOne: (params = {}) => {
        return Applicant.deleteOne(params);
    }
}