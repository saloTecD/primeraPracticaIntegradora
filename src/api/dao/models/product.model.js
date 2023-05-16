import mongoose from "mongoose"

const collection="products"

const schema=new mongoose.Schema({
    id:Number,
    title:String,
    description:String,
    price:Number,
    thumbnails:Array,
    code:String,
    stock:Number,
    status:Boolean
})

const productModel=mongoose.model(collection,schema)

export default productModel