const positionRouter = require('express').Router();

const {positionController} = require("../controllers");
const {positionMiddleware, commonMiddleware} = require("../middlewares");

positionRouter.get('/',
    positionMiddleware.isQueryValid,
    positionController.getAll);
positionRouter.get('/:id',
    commonMiddleware.isIdValid,
    positionMiddleware.isPositionPresent,
    positionController.getById);
positionRouter.post('/',
    positionMiddleware.isPositionValidForCreate,
    positionController.createPosition);
positionRouter.patch('/:id',
    commonMiddleware.isIdValid,
    positionMiddleware.isPositionValidForUpdate,
    positionMiddleware.isPositionPresent,
    positionController.updateOnePosition);
positionRouter.delete('/:id',
    commonMiddleware.isIdValid,
    positionMiddleware.isPositionPresent,
    positionController.deleteOneById);

module.exports = positionRouter;