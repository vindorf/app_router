import {model, models, Schema} from 'mongoose';


const productSchema = new Schema({
    title: String,
    image: String,
    price: Number,
});

const Product = models.Product || model('Product', productSchema);

export default Product;