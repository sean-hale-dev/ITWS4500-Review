const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

var jsonData = {
  primary_arr: ['elem1', 'elem2', 'elem3'],
  secondary_element: 'abcdefghijklmnopqrstuvwxyz',
};

app.use(express.json());

// File server
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/v1/data', (req, res) => {
  // Read in the object key to return
  let key = req.query.key;
  console.log(`Received API request for ${key}`);

  // Check to ensure that the key provided is valid, error if not
  if (key === 'primary_arr' || key === 'secondary_element')
    res.json(jsonData[key]);
  else res.status(400).send('Invalid data key provided');
});

// Resource mapping
app.use(
  '/js',
  express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'))
); // Configure bootstrap support -- JavaScript

app.use(
  '/css',
  express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css'))
); // Configure bootstrap support -- CSS

app.use(
  '/jq',
  express.static(path.join(__dirname, 'node_modules/jquery/dist'))
); // Configure jQuery support

// Start the webserver
app.listen(port, () => {
  console.log('listening on *:3000');
});
