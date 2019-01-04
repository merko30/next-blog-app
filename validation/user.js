const Joi = require('joi');

module.exports = schema = Joi.object().keys({
    name: Joi.string().min(6),
    username: Joi.string().min(7).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    avatar: Joi.object()
});
