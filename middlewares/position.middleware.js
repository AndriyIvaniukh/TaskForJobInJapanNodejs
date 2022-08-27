const {positionValidator} = require("../validators");
const CustomError = require("../errors/CustomError");
const {positionService} = require("../services");
const {Types} = require("mongoose");
module.exports = {
    isPositionValidForCreate: (req, res, next) => {
        try {
            const {error, value} = positionValidator.addPositionValidator.validate(req.body);

            if (error) {
                return next(new CustomError(error.details[0].message, 400));
            }

            req.body = value;
            next()
        } catch (e) {
            next(e);
        }
    },
    isPositionValidForUpdate: (req, res, next) => {
        try {
            const {error, value} = positionValidator.updatePositionValidator.validate(req.body);

            if (error) {
                return next(new CustomError(error.details[0].message, 400));
            }

            req.body = value;
            next()
        } catch (e) {
            next(e);
        }
    },
    isPositionPresent: async (req, res, next) => {
        try {
            const {id} = req.params;
            const position = await positionService.findOne({_id: id});

            if (!position) {
                return next(new CustomError(`Position with id (${id}) not found`, 404));
            }

            req.payload = position;
            next();
        } catch (e) {
            next(e);
        }
    },
    isQueryValid: (req, res, next) => {
        try {
            const {error, value} = positionValidator.queryValidator.validate(req.query);

            if (error) {
                return next(new CustomError(error.details[0].message, 400));
            }

            if (value?.tag) {
                value['description'] = {$regex: value.tag};
                delete value['tag'];
            }

            req.query = value;
            next();
        } catch (e) {
            next(e);
        }
    }
}