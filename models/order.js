import mongoose from "mongoose";



const OrderSchema = new mongoose.Schema({
    email: {type:String,require:true},
    orderId: {type:String,require:true},
    paymrntInfo: {type:String,default:''},
    products:{type:Object,required:true},
    address:{type:String,require:true},
    amount:{type:Number,require:true},
    status:{type:String,default:'pending',require:true}
},{timestamps:true});
// mongoose.models={}

export default mongoose.models.order || mongoose.model("order",OrderSchema);
