const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 3000;
const listingsRouter = require('./routes/listings');
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(express.static(publicPath));

app.use('/api/listings', listingsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
})

app.listen(port, ()=> {
  console.log(`Listening to port ${port}!`)
})