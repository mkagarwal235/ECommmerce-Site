import Order from "@/models/order";
import connectDB from "../middleware/mongooes";
import jsonwebtoken from "jsonwebtoken"



const handler = async (req, res) => { 
    const token=req.body.token
    const data=jsonwebtoken.verify(token,process.env.JWT_SECRET)
    let orders = await Order.find({email : data.email})
    res.status(200).json({ orders })
}


export default connectDB(handler);
