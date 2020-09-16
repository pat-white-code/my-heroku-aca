require('dotenv').config();
const { MongoCLient } = require('mongodb');

async function Main() {
  const uri = process.env.MONGO_URI;
  const client = new MongoCLient(uri);
  try {
    await client.connect();
    await listDatabases(client);
  } catch (e) {
    console.log(e);
  }
}