require('dotenv').config();
const { MongoClient } = require('mongodb');

const listDatabases = async client => {
  const dbList = await client.db().admin().listDatabases()
  // console.log('DATABASES: ', dbList);
  dbList.databases.forEach(db => {
    console.log(`- ${db.name}`)
  })
}

const Main = async () => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    await listDatabases(client);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

Main().catch(console.error());