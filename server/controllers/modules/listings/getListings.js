
const connection = require('../../../connection');


const getListings = async (req, res) => {
  const client = connection();
  const {bedrooms_gte=0, bathrooms_gte=0} = req.query;
  // let bedroomsFilter = {};

  let filter = {
    bedrooms: {
      $gte: parseInt(bedrooms_gte),
    },
    bathrooms: {
      $gte: parseInt(bathrooms_gte)
    }
  }

  try{
    await client.connect();
    const cursor = client.db("sample_airbnb").collection("listingsAndReviews")
      .find(filter)
      .limit(50)
      .project({_id: 0, bedrooms: 1, bathrooms: 1})

    const results = await cursor.toArray();
    res.json(results);
  } catch(e) {
    res.status(500).send(e)
  } finally{
    client.close();
  }
}

module.exports = getListings;