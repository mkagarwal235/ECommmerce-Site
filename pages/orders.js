import React from 'react'
import {useEffect} from 'react'
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';

const Orders = () => {
  const router = useRouter()
  const [orders, setOrders] = useState([])

    useEffect(() => {
    const fetchOrders= async ()=>{
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: "POST",
        headers:    {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem('token') }),
      })
      let res = await a.json()
      // console.log(res)
      setOrders(res.orders)
    }
    if (!localStorage.getItem('token')) {
      router.push('/');
    }
    else {
     fetchOrders()
    }
  },[])
  return (
    <div className="container mx-auto min-h-screen">
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <h1 className="font-semibold text-center text-2xl p-8">My Order</h1>
              <table class="min-w-full text-left text-sm font-light">
                <thead class="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" class="px-6 py-4">OrderId</th>
                    <th scope="col" class="px-6 py-4">Email</th>
                    <th scope="col" class="px-6 py-4">Price</th>
                    <th scope="col" class="px-6 py-4">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item)=>{
                    return<tr key={item._id}
                    class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                    <td class="whitespace-nowrap px-6 py-4 font-medium">{item.orderId}</td>
                    <td class="whitespace-nowrap px-6 py-4">{item.email}</td>
                    <td class="whitespace-nowrap px-6 py-4">{item.amount}</td>
                    <td class="whitespace-nowrap px-6 py-4">
                      <Link href={'/order?id='+item._id}>Details</Link>
                    </td>
                  </tr>
                  })}
                
               
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders