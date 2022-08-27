const {Schema, model} = require("mongoose");

const PositionSchema = new Schema({
    category: {
        type: String,
        required: true,
        trim: true,
    },
    level: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    japaneseRequired: {
        type: Boolean,
        required: true,
    }
}, {timestamps: true})

module.exports = model('position', PositionSchema);