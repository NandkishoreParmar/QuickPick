const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/movieWatchlist', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.use('/movies', movieRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
