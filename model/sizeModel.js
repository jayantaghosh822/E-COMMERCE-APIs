const mongoose = require('mongoose');
const SizeSchema = new mongoose.Schema(
    {
        name: String,
        slug: String,
        
}

);
const Size = mongoose.model('Sizes',SizeSchema);

module.exports = { Size };