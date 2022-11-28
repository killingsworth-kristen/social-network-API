const connection = require('../config/connection');
const { User, Thought } = require('../models');
const thoughtData = require(`./thoughts.json`);
const userData = require(`./users.json`);

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

// Drop existing data
await User.deleteMany({});
await Thought.deleteMany({});

// create new data
await User.collection.insertMany(userData);
await Thought.collection.insertMany(thoughtData);

process.exit(0);
});
