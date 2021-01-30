const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: String,
    qty: Number
}, { timestamps: true });
module.exports = mongoose.model("Book", schema);