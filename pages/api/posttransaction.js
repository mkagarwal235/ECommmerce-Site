import Order from "@/models/order";
import connectDB from "../middleware/mongooes";

const handler = async (req, res) => 
{
    let order= await Order.findOneAndUpdate({orderId:req.body.ORDERID},{status:"Paid"})
    res.status(200).json({body: req.body })
    // res.redirect('/order',200)
}

export default connectDB(handler);