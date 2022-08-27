const Joi = require('joi');

const {constants} = require('../configs');
const {array} = require("joi");

module.exports = {
    addPositionValidator: Joi.object({
        category: Joi.string().valid(...Object.values(constants.CATEGORIES)).required(),
        level: Joi.string().valid(...Object.values(constants.LEVELS)).required(),
        company: Joi.string().min(2).max(25).trim().required(),
        description: Joi.string().lowercase(),
        japaneseRequired: Joi.boolean().required()
    }),
    updatePositionValidator: Joi.object({
        description: Joi.string(),
        japaneseRequired: Joi.boolean()
    }),
    queryValidator: Joi.object({
        category: Joi.string().lowercase().valid(...Object.values(constants.CATEGORIES)),
        level: Joi.string().lowercase().valid(...Object.values(constants.LEVELS)),
        tag: Joi.string().lowercase()
    })
}