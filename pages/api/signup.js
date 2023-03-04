import user from "@/models/users";
import connectDB from "../middleware/mongooes";

const handler= async (req,res)=>{
    if(req.method=='POST')
    {  console.log(req.body)
        let u=new user(req.body);
       await u.save(); 
       
        res.status(200).json({success:"success"})
    }
    else{
        res.status(404).json({error:"Method Not Allowed"})
    }
    
}
export default connectDB(handler);