const CustomError = require("../errors/CustomError");
const {applicantValidator} = require("../validators");
const {applicantService} = require("../services");

module.exports = {
    isApplicantValidForCreate: (req, res, next) => {
        try{
            const {error, value} = applicantValidator.addApplicantValidator.validate(req.body);

            if(error){
                return next(new CustomError(error.details[0].message, 400));
            }

            req.body = value;
            next();
        }catch (e) {
            next(e);
        }
    },
    isApplicantValidForUpdate: (req, res, next) => {
        try{
            const {error, value} = applicantValidator.updateApplicantValidator.validate(req.body);

            if(error){
                return next(new CustomError(error.details[0].message, 400));
            }

            req.body = value;
            next();
        }catch (e) {
            next(e);
        }
    },
    isApplicantPresent: async (req, res, next)=>{
        try{
            const applicant = await applicantService.findOne({_id: req.params.id});

            if(!applicant){
                return next(new CustomError(`Applicant with id (${req.params.id}) not found`));
            }

            next();
        }catch (e) {
            next(e);
        }
    }

}