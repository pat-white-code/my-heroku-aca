
const connection = require('../../../connection');

const getListings = (req, res) => {
  const client = connection();
  const {bedrooms_gte, bathrooms_gte, amenities} = req.query;
  let bedroomsFilter = {};
  if(bedrooms_gte) {
    bedroomsFilter.$gte = bedrooms_gte
  }
  
  let filter = {
    bedrooms: bedroomsFilter
  }
  
  res.send(req.query);
}

module.exports = getListings;