const mongoose = require('mongoose');
const SizeVariantsSchema = new mongoose.Schema(
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        size: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Sizes",
        },
        quan:Number,
        price:Number
}

);
const SizeVariants = mongoose.model('SizeVariants',SizeVariantsSchema);

module.exports = { SizeVariants };