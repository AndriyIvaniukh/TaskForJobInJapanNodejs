const {positionService, emailService} = require("../services");
const {emailActionEnum} = require("../enums");
const {configs} = require("../configs");

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
            const {category, level, japaneseRequired, company, description} = req.body;
            const {id} = await positionService.createPosition(req.body);
            const applicants = await emailService.searchApplicant(category, level, japaneseRequired);
            for (const applicant of applicants) {
                const searchedLinks = await emailService.createSearchLink(configs.FRONTEND_URL, applicant);
                await emailService.sendMail(applicant.email, emailActionEnum.ADD_NEW_POSITION,
                    {category, level, japaneseRequired, company, description, searchedLinks})
            }
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
            const {category, level, japaneseRequired, company, description} = req.payload;
            await positionService.deleteOnePosition({_id: req.params.id});
            const applicants = await emailService.searchApplicant(category, level, japaneseRequired);
            for (const applicant of applicants) {
                const searchedLinks = await emailService.createSearchLink(configs.FRONTEND_URL, applicant);
                await emailService.sendMail(applicant.email, emailActionEnum.DELETED_POSITION,
                    {category, level, japaneseRequired, company, description, searchedLinks})
            }
            res.status(204).json();
        } catch (e) {
            next(e);
        }
    }
}