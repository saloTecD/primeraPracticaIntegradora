import mongoose from "mongoose"

const collection="carts"

const subSchema=new mongoose.Schema({
    pid:String,
    quantity:Number
},{_id:false})
const schema =new mongoose.Schema({
    products:[subSchema]
})

const cartModel=mongoose.model(collection,schema)

export default cartModel