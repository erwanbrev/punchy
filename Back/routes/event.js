const router = require('express').Router();
const _ = require('lodash');
const mongoose = require('mongoose');

const Event = require('./../models/Event');

const authorize = require('./../middlewares/authorize');

const { sendMailEvent } = require('./../nodemailer/mail');

router.get('/', async (req, res) => {
	const events = await Event.find({ validated: true });
	const response = [];
	events.forEach(({ category, title, description, localisation, price, startDate, endDate, pictures }) => {
		response.push({
			category,
			title,
			description,
			localisation,
			price,
			startDate,
			endDate,
			pictures
		});
	});

	return res.status(200).send(response);
});
router.post('/', authorize, async (req, res) => {
	const schema = require('../schemas/event');
	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	try {
		const event = new Event({
			category: req.body.category,
			title: req.body.title,
			pictures: req.body.pictures,
			description: req.body.description,
			localisation: req.body.localisation,
			price: req.body.price,
			startDate: req.body.startDate,
			endDate: req.body.endDate
		});

		const eventData = await event.save();

		await sendMailEvent(eventData);

		return res.status(201).send(_.pick(eventData, ['category', 'title', 'pictures', 'description', 'localisation', 'price', 'startDate', 'endDate']));
	} catch (err) {
		console.log(err.message);
		return res.status(500).send(err.message);
	}
});

router.get('/confirmed', async (req, res) => {
	const event = await Event.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.query.id) }, { validated: true });
	return res.status(201).send({ message: 'Publier avec succès', content: event });
});

module.exports = router;