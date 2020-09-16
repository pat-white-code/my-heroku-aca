// async function createListing(client, newListing){
//   const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
//   console.log(`New listing created with the following id: ${result.insertedId}`);
// }

const {MongoClient} = require('mongodb');
require('dotenv').config();

// const createListing = async (client, newListing) => {
//   const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);

//   console.log(`New listing created with the following id: ${result.insertedId}`)
// }

const main = async (req, res) => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  const { name, summary, bedrooms, bathrooms } = req.body;

  let listing = { name, summary, bedrooms, bathrooms }
  // let listing = {
  //   name: "Lovely Loft",
  //   summary: "A charming loft in Paris",
  //   bedrooms: 1,
  //   bathrooms: 1
  // }

  try{
    await client.connect();
    const abnb = client.db("sample_airbnb").collection("listingsAndReviews");
    let result = await abnb.insertOne(listing);
    console.log(`New listing created with the following id: ${result.insertedId}`)
  } catch(e) {
    console.log(e);
  }
}

main().catch(console.error);