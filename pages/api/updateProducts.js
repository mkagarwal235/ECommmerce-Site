import product from "@/models/product";
import connectDB from "../middleware/mongooes";

const handler= async (req,res)=>{
    if(req.method=='POST')
    {
        for(let i=0;i<req.body.length;i++)
        {
             await product.findByIdAndUpdate(req.body[i]._id,req.body[i])
        }
        res.status(200).json({sucess:"success"})
    }
    else{
        res.status(404).json({error:"Method Not Allowed"})
    }
    
}
export default connectDB(handler);