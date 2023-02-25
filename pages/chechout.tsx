import React from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import Link from 'next/link'

const Chechout = ({ card, addToCard, removeFromCard, subTotal }) => {
  return (
    <div className='container px-2 sm:m-auto'>
      <h1 className='font-bold text-3xl my-8 text-center'>CheckOut</h1>
      <h2 className='fond-semibold text-xl'>1.Delivery Details</h2>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="name" id="email" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/"></input>
          </div>

        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/"></input>
          </div>

        </div></div>
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea id="address" cols="30" rows="2" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/"></textarea>
        </div>

      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/"></input>
          </div>

        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/"></input>
          </div>

        </div></div>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/"></input>
          </div>

        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/"></input>
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
        <span className="font-bold">Subtotal:₹{subTotal}</span>
      </div>
      <div className="m-4">
        <Link href={'/chechout'}><button className="flex  mr-2 text-white bg-pink-500 border-0 py-2 px-2 
                focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />Pay ₹{subTotal}</button></Link>
      </div>


    </div>
  )
}

export default Chechout