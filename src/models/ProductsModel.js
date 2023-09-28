import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const userCollection = 'productos';

const productsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number,
})


productsSchema.plugin(mongoosePaginate)
export const productsModel = mongoose.model(userCollection, productsSchema)