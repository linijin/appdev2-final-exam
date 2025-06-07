const mongoose = require('mongoose');
const faker = require('faker');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Event = require('./models/Event');
require('dotenv').config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  await User.deleteMany();
  await Event.deleteMany();

  const users = [];
  for (let i = 0; i < 5; i++) {
    const hashedPassword = await bcrypt.hash('secret123', 10);
    users.push(await User.create({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: hashedPassword
    }));
  }

  for (let i = 0; i < 10; i++) {
    await Event.create({
      title: faker.lorem.words(3),
      location: faker.address.city(),
      date: faker.date.future(),
      description: faker.lorem.sentence(),
      userId: users[Math.floor(Math.random() * users.length)]._id
    });
  }

  console.log('Seeding done.');
  mongoose.disconnect();
}

seed();