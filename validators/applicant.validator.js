const Joi = require('joi');

const {constants} = require("../configs");

module.exports = {
    addApplicantValidator: Joi.object({
        email: Joi.string().regex(constants.EMAIL_REGEX).lowercase().required(),
        categories: Joi.array().items(Joi.string().valid(...Object.values(constants.CATEGORIES)).required()).required(),
        japaneseKnowledge: Joi.boolean().required(),
        level: Joi.string().valid(...Object.values(constants.LEVELS)).required()
    }),
    updateApplicantValidator: Joi.object({
        email: Joi.string().regex(constants.EMAIL_REGEX).lowercase().required(),
        categories: Joi.array().items(Joi.string().valid(...Object.values(constants.CATEGORIES)).required()).required(),
        level: Joi.string().valid(...Object.values(constants.LEVELS)).required(),
        japaneseKnowledge: Joi.boolean().required()
    })
}