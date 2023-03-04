import user from "@/models/users";
import connectDB from "../middleware/mongooes";
var CryptoJS = require("crypto-js");

const handler= async (req,res)=>{
    if(req.method=='POST')
    {  console.log(req.body)
        const {name,email}=req.body
        let u=new user({name,email,password: CryptoJS.AES.encrypt(req.body.password, "secret123").toString()});
       await u.save(); 
       
        res.status(200).json({success:"success"})
    }
    else{
        res.status(404).json({error:"Method Not Allowed"})
    }
    
}
export default connectDB(handler);