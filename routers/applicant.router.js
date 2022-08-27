const applicantRouter = require('express').Router();

const {applicantController} = require("../controllers");
const {applicantMiddleware, commonMiddleware} = require("../middlewares");

applicantRouter.get('/',
    applicantController.getAll);
applicantRouter.post('/',
    applicantMiddleware.isApplicantValidForCreate,
    applicantController.create);
applicantRouter.put('/:id',
    commonMiddleware.isIdValid,
    applicantMiddleware.isApplicantValidForUpdate,
    applicantController.updateOneApplicant);
applicantRouter.delete('/:id',
    commonMiddleware.isIdValid,
    applicantMiddleware.isApplicantPresent,
    applicantController.deleteOneApplicant);

module.exports = applicantRouter;