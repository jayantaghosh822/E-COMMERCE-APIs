const mongoose = require('mongoose');
const ProductIamgesVariants = new mongoose.Schema(
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        photo:{
            data:Buffer,
            contentType:String,
        },
}

);
const ProductVariantImages = mongoose.model('ProductIamgesVariants',ProductIamgesVariants);

module.exports = { ProductVariantImages };