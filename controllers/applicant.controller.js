const {applicantService} = require("../services");
module.exports = {
    getAll: async (req, res, next) => {
        try {
            const applicants = await applicantService.findAll(req.params);
            res.status(200).json(applicants);
        } catch (e) {
            next(e);
        }
    },
    create: async (req, res, next) => {
        try {
            const newApplicant = await applicantService.create(req.body);
            res.status(201).json(newApplicant.id);
        } catch (e) {
            next(e);
        }
    },
    updateOneApplicant: async (req, res, next) => {
        try {
            await applicantService.updateOneApplicant({_id: req.params.id}, req.body);
            res.status(200).json();
        } catch (e) {
            next(e);
        }
    },
    deleteOneApplicant: async (req, res, next) => {
        try {
            await applicantService.deleteOne({_id: req.params.id});
            res.status(204).json();
        } catch (e) {
            next(e);
        }
    }
}