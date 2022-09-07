import express from 'express';
import router from './routes.js';
import mongoose from "mongoose";
const uri = process.env.MONGO_URI || 'mongodb+srv://testing:testingcompass@cluster0.9i6srfv.mongodb.net/test';

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(`Couldn't connect to MongoDB... ${err}`));

const app = express();
app.use(express.json());
app.use('/api/v1', router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on http://localhost:${port}`));