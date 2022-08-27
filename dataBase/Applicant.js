const {Schema, model} = require("mongoose");

const ApplicantSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    categories: [{
        type: String,
        required: true,
        trim: true,
    }],
    japaneseKnowledge: {
        type: Boolean,
        required: true,
    },
    level: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true});


module.exports = model('applicant', ApplicantSchema);