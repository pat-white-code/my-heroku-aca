
const connection = require('../../../connection');

const createListing = async (req, res) => {
  const client = connection();
  const { name, summary, bedrooms, bathrooms } = req.body;

  let listing = { name, summary, bedrooms, bathrooms }

  try{
    await client.connect();
    const abnb = client.db("sample_airbnb").collection("listingsAndReviews");
    let result = await abnb.insertOne(listing);
    res.send(`New listing created with the following id: ${result.insertedId}`);
    // console.log(`New listing created with the following id: ${result.insertedId}`)
  } catch(e) {
    res.status(500).send(e);
  }
}

// createListing().catch(console.error);

module.exports = createListing;