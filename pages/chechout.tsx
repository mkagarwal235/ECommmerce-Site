import React from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'
import { useState } from 'react'

const Chechout = ({ card, addToCard, removeFromCard, subTotal }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPinCode] = useState('')
  const [address, setAddress] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const handleChange = (e) => {
    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'pincode') {
      setPinCode(e.target.value)
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value)
    }
    setTimeout(() => {
      if (name.length > 3 && email.length > 3 && phone.length > 3 && pincode.length > 3 && address.length > 3) {
        setDisabled(false)
      }
      else {
        setDisabled(true)
      }
    }, 100);
  }
  const initiatePayment = async () => {


    let oid = Math.floor(Math.random() * Date.now());

    // Get Transaction Token

    const data = { card, subTotal, oid, email: email, name,address,pincode,phone };

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    let txnToken = await a.json()
    console.log(txnToken)

    function onScriptLoad() {
      var config = {
        "root": "",
        "flow": "DEFAULT",
        "data": {
          "orderId": oid, /* update order id */
          "token": txnToken, /* update token value */
          "tokenType": "TXN_TOKEN",
          "amount": subTotal /* update amount */
        },
        "handler": {
          "notifyMerchant": function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          }
        }
      };

      window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      }).catch(function onError(error) {
        console.log("error => ", error);
      });
    }
  }
  return (
    <div className='container px-2 sm:m-auto'>
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" /></Head>
      <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} crossOrigin="anonymous" />
      <h1 className='font-bold text-3xl my-8 text-center'>CheckOut</h1>
      <h2 className='fond-semibold text-xl'>1.Delivery Details</h2>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="name" onChange={handleChange} value={name} id="email" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/"></input>
          </div>

        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" onChange={handleChange} value={email} id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/"></input>
          </div>

        </div></div>
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea id="address" onChange={handleChange} value={address} cols="30" rows="2" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/"></textarea>
        </div>

      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="phone" onChange={handleChange} value={phone} id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/"></input>
          </div>

        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input type="text" id="pincode" onChange={handleChange} value={pincode} name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/"></input>


          </div>

        </div></div>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" value={state} name="state" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true}></input>
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" id="city" value={city} name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true}></input>

          </div>

        </div></div>

      <h2 className='fond-semibold text-xl'>2.Review Card Items & Pay</h2>

      <div className="sideCard bg-pink-100 m-4 p-8">
        <ol className='list-decimal font-semibold'>
          {Object.keys(card).length == 0 && <div className='my-4 font-semibold'>Your Card is Empty!</div>}
          {Object.keys(card).map((k) => {
            return <li key={k}>
              <div className="item flex my-4">

                <div className='font-semibold'>{card[k].name}({card[k].size}/{card[k].variant})</div>
                <div className='flex items-center justify-center w-1/3 font-semibold text-lg'><AiFillMinusCircle onClick={() => { removeFromCard(k, 1, card[k].price, card[k].name, card[k].size, card[k].variant) }} className='cursor-pointer text-pink-500' />
                  <span className='mx-2 
                            text-sm'>{card[k].qty}</span><AiFillPlusCircle onClick={() => { addToCard(k, 1, card[k].price, card[k].name, card[k].size, card[k].variant) }} className='cursor-pointer text-pink-500' /></div>
              </div>
            </li>
          })}

        </ol>
        <span className="font-bold">Subtotal:???{subTotal}</span>
      </div>
      <div className="m-4">
        <Link href={'/chechout'}><button disabled={disabled} onClick={initiatePayment} className="disabled:bg-pink-300 flex   mr-2 text-white bg-pink-500 border-0 py-2 px-2 
                focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />Pay ???{subTotal}</button></Link>
      </div>


    </div>
  )
}


export default Chechout