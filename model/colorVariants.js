const mongoose = require('mongoose');
const ColorVariantsSchema = new mongoose.Schema(
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        color: String, 
}

);
const Color = mongoose.model('ColorVariants',ColorVariantsSchema);

module.exports = { Color };