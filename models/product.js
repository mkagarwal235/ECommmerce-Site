import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    title: {type:String,require:true},
    slug: {type:String,require:true,unique:true},
    desc: {type:String,require:true},
    img: {type:String,require:true},
    category: {type:String,require:true},
    size: {type:String},
    color: {type:String},
    price: {type:String,require:true},
    availableQty:{type:Number,require:true}
},{timestamps:true});
mongoose.models={}

export default mongoose.model("product",ProductSchema);