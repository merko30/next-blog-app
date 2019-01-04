const Joi = require('joi');

module.exports = schema = Joi.object().keys({
    comment: Joi.string().min(8).required()
});
