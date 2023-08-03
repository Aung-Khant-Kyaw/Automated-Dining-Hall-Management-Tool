require('dotenv').config();
const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 6000;

// use body parser to get data from POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable all cors requests
app.use(cors())

// Use API routes from the api folder
const routes = require("./route");
app.use("/route", routes);

// Connect to Mongo
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));

app.listen(port, () => console.log(`Listening on port ${port}`));