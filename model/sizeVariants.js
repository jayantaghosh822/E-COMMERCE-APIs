const mongoose = require('mongoose');
const SizeVariantsSchema = new mongoose.Schema(
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        size: String,
        quan:Number
}

);
const SizeVariants = mongoose.model('SizeVariants',SizeVariantsSchema);

module.exports = { SizeVariants };