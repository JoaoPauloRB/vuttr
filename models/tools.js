const mongoose = require('mongoose');

const toolsSchema = new mongoose.Schema({
    title: String,
    link: String,
    description: String,
    tags: [String],
    userId: String
});

const Tools = mongoose.model('Tools', toolsSchema);
module.exports = Tools;