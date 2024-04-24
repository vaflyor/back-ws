require('dotenv').config();
const db = require('mongoose');

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

db.connect(uri + dbName)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = {db, uri};