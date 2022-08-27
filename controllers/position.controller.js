const {positionService} = require("../services");
module.exports = {
    getAll: async (req, res, next) => {
        try {
            const positions = await positionService.findAll(req.query);
            res.status(200).json(positions);
        } catch (e) {
            next(e);
        }
    },
    getById: async (req, res, next) => {
        try {
            res.status(200).json(req.payload);
        } catch (e) {
            next(e);
        }
    },
    createPosition: async (req, res, next) => {
        try {
            const {id} = await positionService.createPosition(req.body);
            res.status(201).json(id)
        } catch (e) {
            next(e);
        }
    },
    updateOnePosition: async (req, res, next) => {
        try {
            await positionService.updateOnePosition({_id: req.params.id}, req.body);
            res.status(200).json();
        } catch (e) {
            next(e);
        }
    },
    deleteOneById: async (req, res, next) => {
        try {
            await positionService.deleteOnePosition({_id: req.params.id});
            res.status(204).json();
        } catch (e) {
            next(e);
        }
    }
}