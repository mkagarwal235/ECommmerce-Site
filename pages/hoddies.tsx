import React from 'react'
import Link from 'next/link'
import product from '@/models/product';
import mongoose from "mongoose";

const Hoddies = ({products}) => {
  return (
    <div><section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap -m-4 justify-center ">
        {products.map((item)=>{
          return <div  passHref={true} key={item._it} className="lg:w-1/4 md:w-1/2 p-8 w-full shadow-lg m-2">
          <a className="block relative  rounded overflow-hidden">
            <Link href={`/product/${item.slug}`}><img alt="ecommerce" className="m-auto h-[30vh] md:h-[36vh] block" src={item.img} /></Link>
          </a>
          <div className="mt-4 text-center md:text-left">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
            <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
            <p className="mt-1">₹{item.price}</p>
            <p className="mt-1">S, M, L, XL, XXL</p>
          </div>
        </div>
      })}
          
          
          
        </div>
      </div>
    </section></div>
  )
}
export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState)
    {
      await mongoose.connect(process.env.MONGO_URI)
    }
  let products= await product.find({category:"hoodies"})
 
  return {
    props: {products:JSON.parse(JSON.stringify(products))}, // will be passed to the page component as props
  }

}
export default Hoddies