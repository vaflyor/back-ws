require('dotenv').config();
const db = require('mongoose');

const uri = 'mongodb+srv://root:root1@cluster0.xesvkmm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = process.env.DB_NAME;

db.connect(uri + dbName)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = {db, uri};