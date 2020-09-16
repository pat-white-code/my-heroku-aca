
// const connection = require('../../../connection');
const { MongoClient } = require('mongodb');
require('dotenv').config();


const getListings = async (req, res) => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  // const {bedrooms_gte, bathrooms_gte, amenities} = req.query;
  // let bedroomsFilter = {};
  // if(bedrooms_gte) {
  //   bedroomsFilter.$gte = bedrooms_gte
  // }
  
  // let filter = {
  //   bedrooms: bedroomsFilter
  // }

  try{
    await client.connect();
    const cursor = client.db("sample_airbnb").collection("listingsAndReviews")
      .find()
      .limit(50);

    const results = await cursor.toArray();
    res.json(results);
  } catch(e) {
    res.status(500).send(e)
  }
}

module.exports = getListings;