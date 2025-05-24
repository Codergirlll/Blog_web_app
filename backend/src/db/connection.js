
const mongoose = require('mongoose');

const { DATABASE } = process.env

mongoose.connect(DATABASE)
    .then(() => console.log("Connected, To MongoDB successfully"))
    .catch(err => console.error("Could not connect to MongoDB:", err));
