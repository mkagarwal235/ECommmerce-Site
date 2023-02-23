import product from "@/models/product";
import connectDB from "../middleware/mongooes";

const handler= async (req,res)=>{
    let products= await product.find()
    res.status(200).json({products})
}
export default connectDB(handler);