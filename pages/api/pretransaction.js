import { rejects } from 'assert';
import { resolve } from 'path';
import products from '@/models/product';
import Order from "@/models/order";
import connectDB from "../middleware/mongooes";
import { it } from 'node:test';

const https = require('https');

const PaytmChecksum = require('paytmchecksum');


const handler = async (req, res) => {
    if (req.method == 'POST') {

        //  check if the card is tempered with----[pending]
        let product, sumTotal=0;
        let card=req.body.card;
        for(let item in card)
        {
            sumTotal+=card[item].price*card[item].qty;
            product= await products.findOne({slug:item})
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

        // check if the cart items are out of stocks---[pending]

        // check if the details are valid --[pending]
        
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



        var paytmParams = {};

        paytmParams.body = {
            "requestType": "Payment",
            "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
            "websiteName": "YOUR_WEBSITE_NAME",
            "orderId": req.body.oid,
            "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
            "txnAmount": {
                "value": req.body.subTotal,
                "currency": "INR",
            },
            "userInfo": {
                "custId": req.body.email,
            },
        };


        const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MKEY)

        paytmParams.head = {
            "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);

        const requestAsync = async () => {
            return new Promise((resolve, reject) => {
                var options = {

                    /* for Staging */
                    // hostname: 'securegw-stage.paytm.in',

                    /* for Production */
                    hostname: 'securegw.paytm.in',

                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=ORDERID_98765`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        // console.log('Response: ', response);
                        let ress=JSON.parse(response).body
                        ress.success=true
                        resolve(ress)
                    });
                });

                post_req.write(post_data);
                post_req.end();

            })
        }

        let myr = await requestAsync()
        res.status(200).json(myr)




    }
}
export default connectDB(handler);