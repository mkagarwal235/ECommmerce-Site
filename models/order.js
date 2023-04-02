import mongoose from "mongoose";



const OrderSchema = new mongoose.Schema({
    email: {type:String,require:true},
    orderId: {type:String,require:true},
    paymentInfo: {type:String,default:''},
    products:{type:Object,required:true},
    address:{type:String,require:true},
    amount:{type:Number,require:true},
    status:{type:String,default:'Initiated',require:true},
    deliveryStatus:{type:String,default:'unshipped',require:true}

},{timestamps:true});
// mongoose.models={}

export default mongoose.models.order || mongoose.model("order",OrderSchema);
