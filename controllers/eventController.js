const Event = require('../models/Event');
const sendEmail = require('../config/nodemailer');

exports.getAllEvents = async (req, res) => {
  const events = await Event.find().populate('userId', 'name email');
  res.json(events);
};

exports.createEvent = async (req, res) => {
  const { title, location, date, description } = req.body;
  const newEvent = await Event.create({ title, location, date, description, userId: req.user.id });

  await sendEmail(req.user.email, 'Event Created', 'eventCreated', {
    name: req.user.name,
    title,
    location,
    date
  });

  res.status(201).json(newEvent);
};

exports.getMyEvents = async (req, res) => {
  const events = await Event.find({ userId: req.user.id });
  res.json(events);
};
