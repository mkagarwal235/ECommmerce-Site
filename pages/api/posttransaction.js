import Order from "@/models/order";
import connectDB from "../middleware/mongooes";
import Razorpay from 'razorpay';

const handler = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id } = req.body;


    const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret:process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
      });

      const payment = await razorpay.payments.fetch(razorpay_payment_id);
      console.log(payment)

      if (payment.status !='captured') {
        return res.status(400).json({ error: 'Payment not successful' });
      }


    let order = await Order.findOneAndUpdate({ orderId: razorpay_order_id }, {$set:{status: "Paid" }}, { new: true })

    if(!order)
    {
        return res.status(404).json({error:'order not found'})
    }
    // res.status(200).json({ status:'order status updated to paid' })
    res.redirect('/order?id='+order._id)
}

export default connectDB(handler);






