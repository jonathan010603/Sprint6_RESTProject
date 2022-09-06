const mongoose = require("mongoose");

const uri = process.env.MONGO_URI || 'mongodb+srv://testing:testingcompass@cluster0.9i6srfv.mongodb.net/test';

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(`Couldn't connect to MongoDB... ${err}`))

let db = mongoose.connection;

module.exports = db;