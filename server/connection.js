const {MongoClient} = require('mongodb');
require('dotenv').config();

const connection = () => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  return client;
}

module.exports = connection;