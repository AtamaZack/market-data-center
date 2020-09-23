// Backend framework
const express = require('express');

// ORM to interact with the Mongo DB database
const mongoose = require('mongoose');

// Allow us to take requests and get data from the body
const bodyParser = require('body-parser');

// Items api requests
const items = require('./routes/api/items');

// Initializing express
const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI; 

// Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

//  Use Routes
app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server start on port ${port}`));

// Mongo DB URI