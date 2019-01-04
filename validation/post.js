const Joi = require('joi');

module.exports = schema = Joi.object().keys({
    title: Joi.string().min(12).required(),
    body: Joi.string().min(150).required()
});


