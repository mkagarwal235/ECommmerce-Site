import React from 'react'
import {useEffect} from 'react'
import { useRouter } from 'next/router';
import { useState } from 'react'
const MyAccount = () => {
    const router = useRouter()
    useEffect(() => 
    {
      if(!localStorage.getItem('token')){
        router.push('/')
      }
    },[])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [pincode, setPinCode] = useState('')
    const [address, setAddress] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const handleChange = async (e) => {
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
        if (e.target.value.length == 6) {
          let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
          let pinJson = await pins.json()
          if (Object.keys(pinJson).includes(e.target.value)) {
            setCity(pinJson[e.target.value][0])
            setState(pinJson[e.target.value][1])
          }
          else {
            setCity('')
            setState('')
          }
        }
        else {
          setCity('')
          setState('')
        }
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
  return (
    <div className='container mx-auto my-9'>
      <h1 className='text-3xl text-center font-bold'>Update your Account</h1>
      <h2 className='fond-semibold text-xl'>1.Delivery Details</h2>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="name" onChange={handleChange} value={name} id="email" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/"></input>
          </div>

        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
             <input type="email" onChange={handleChange} value={email} id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/"></input>
          </div>

        </div></div>
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea id="address" onChange={handleChange} value={address} cols="30" rows="2" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/"></textarea>
        </div>

      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone Number</label>
            <input type="phone" onChange={handleChange} value={phone} id="phone" name="phone" placeholder='Your 10 Digit Phone Number' className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out /"></input>
          </div>

        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input type="text" id="pincode" onChange={handleChange} value={pincode} name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/"></input>


          </div>

        </div></div>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" value={state} onChange={handleChange} name="state" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" ></input>
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">District</label>
            <input type="text" id="city" onChange={handleChange} value={city} name="city" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" ></input>

          </div>

        </div></div>
    </div>
  )
}

export default MyAccount