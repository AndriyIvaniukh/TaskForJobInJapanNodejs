const {Position} = require("../dataBase");

module.exports = {
    findAll: async (params = {}) => {
        return Position.find(params);
    },
    findOne: (params = {}) => {
        return Position.findOne(params);
    },
    createPosition: (position) => {
        return Position.create(position);
    },
    updateOnePosition: (params, newPosition, options = {new: true}) => {
        return Position.findOneAndUpdate(params, newPosition, options);
    },
    deleteOnePosition: (params) => {
        return Position.deleteOne(params);
    }

}