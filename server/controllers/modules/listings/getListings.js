// const { expect } = require('chai');
const connection = require('../../../connection');


const getListings = async (req, res) => {
  const client = connection();
  const {bedrooms_gte, bathrooms_gte, reviews, images, description} = req.query;

  let regex = new RegExp(`.*${description}*.`);
  let filter = {}

  bedrooms_gte && (filter.bedrooms = {...filter.bedrooms, $gte: parseInt(bedrooms_gte)});
  bathrooms_gte && (filter.bathrooms = {...filter.bathrooms, $gte: parseInt(bathrooms_gte)});
  reviews && (filter.reviews = {...filter.reviews, $exists: true, $ne: null});
  images && (filter.images = {...filter.images, $exists: true, $ne: null});
  description && (filter.description = {...filter.description, $regex: regex, $options: 'i'});

  try{
    await client.connect();
    const cursor = client.db("sample_airbnb").collection("listingsAndReviews")
      .find(filter)
      .limit(100)
      .project({_id: 0, description: 1})

    const results = await cursor.toArray();
    res.json(results);
  } catch(e) {
    res.status(500).send(e)
  } finally{
    client.close();
  }
}

module.exports = getListings;