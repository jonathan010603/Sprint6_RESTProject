const express = require('express');
const db = require("./dbConnection");

const app = express();
app.use(express.json());

app.route('/').get((req, res) => {
    res.status(201).send("working")
})

module.exports = app;