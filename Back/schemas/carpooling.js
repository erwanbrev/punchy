const Joi = require('joi');

module.exports = Joi.object({
	startLocalisation: Joi.string().required(),
	endLocalisation: Joi.string().required(),
	startTime: Joi.date().required().greater('now'),
	endTime: Joi.date().required().greater(Joi.ref('startTime')),
	repeat: Joi.string().valid('Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche', 'None').required(),
	peopleNumber: Joi.number().required().min(1),
	price: Joi.number().required().min(0),
	event: Joi.string(),
	smoker: Joi.boolean().required().default(false),
	carType: Joi.string().required(),
	carColor: Joi.string().required()
});
