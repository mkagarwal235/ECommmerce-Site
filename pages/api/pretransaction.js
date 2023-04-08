import { rejects } from 'assert';
import { resolve } from 'path';
import products from '@/models/product';
import Order from "@/models/order";
import connectDB from "../middleware/mongooes";
import Razorpay from 'razorpay';
import { type } from 'os';

const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret:process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET
  });


const handler = async (req, res) => {
    if (req.method == 'POST') {

        //  check if the card is tempered with
        let product, sumTotal=0;
        let card=req.body.card;
        if(req.body.subTotal<=0)
            {
                res.status(200).json({success:false,"error":"Your cart is empty!. Please build your cart and try again!!"})
                return
            }
        for(let item in card)
        {
            sumTotal+=card[item].price*card[item].qty;
            product= await products.findOne({slug:item})

            // check if the cart items are out of stocks---[pending]
            
            
            // check if the cart items are out of stocks
            if(product.availableQty<card[item].qty)
            {
                res.status(200).json({success:false,"error":"Some item in your cart went out of stock. Please try again!"})
                return
            }

            if(product.price!=card[item].price)
            {
                res.status(200).json({success:false,"error":"The price of some items in your cart have changed.Please try again"})
                return
            }
        }
        if(sumTotal!= req.body.subTotal)
        {
            res.status(200).json({success:false,"error":"The price of some items in your cart have changed.Please try again"})
            return
        }

        // check if the details are valid 
        if(req.body.phone.length!==10 )
        {
            res.status(200).json({success:false,"error":"Please enter your 10 digit phone number"})
            return
        }
        if(req.body.pincode.length!==6)
        {
            res.status(200).json({success:false,"error":"Please enter your 6 digit pincode"})
            return
        }


        
        // Intiate a order Corresponding to this orderId 
        let order = new Order(
            {
                email: req.body.email,
                orderId: req.body.oid,
                address: req.body.address,
                amount: req.body.subTotal,
                products: req.body.card
            })
        await order.save();



        const options = {
            amount: req.body.subTotal * 100,
            currency: 'INR',
            receipt: req.body.oid,
            payment_capture: '1',
            notes: {
              email: req.body.email,
            },
          };
          try {
            const paymentResponse = await instance.orders.create(options);
            res.status(200).json({ success: true, paymentResponse });
        } catch (error) {
            res.status(500).json({ success: false, error });
        }
    }


}
export default connectDB(handler);