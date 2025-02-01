import {Schema, model, models} from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    isBestSeller: {
        type: Boolean,
        require: true,
    }
    
});

const Product = models.Product || model("Product", productSchema);

export default Product;