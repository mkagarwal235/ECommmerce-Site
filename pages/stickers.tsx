import React from 'react'
import Link from 'next/link'
import product from '@/models/product';
import mongoose from "mongoose";

const Stickers = ({ products }) => {
  return (
    <div><section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center ">
          {Object.keys(products).length === 0 && <p>Sorry all the Stickers are currently out of stock!! New Stock coming soon! Please Stay Turn!</p>}
          {Object.keys(products).map((item) => {
            return <div passHref={true} key={products[item]._it} className="lg:w-1/4 md:w-1/2 p-8 w-full shadow-lg m-2">
              <span className="block relative  rounded overflow-hidden">
                <Link href={`/product/${products[item].slug}`}><img alt="ecommerce" className="m-auto h-[30vh] md:h-[36vh] block" src={products[item].img} /></Link>
              </span>
              <div className="mt-4 text-center md:text-left">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Stickers</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                <p className="mt-1">₹{products[item].price}</p>
                <div className='mt-1'>
                  {products[item].size.includes('10cm') && <span className='border border-gray-300 px-1 mx-1'>10cm,</span>} 
                  {products[item].size.includes('7cm') && <span className='border border-gray-300 px-1 mx-1'>7cm,</span>}  
                  </div>
                  <div className='mt-1'>
                  {products[item].color.includes('RED') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('YELLOW') && <button className="border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('BLACK') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('GREEN') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('PURPLE') && <button className="border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('BLUE') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('WHITE') && <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
                  </div>
              </div>
            </div>
          })}



        </div>
      </div>
    </section></div>
  )
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await product.find({ category: "stickers" })
  let sticker = {}
  for (let item of products) {
    if (item.title in sticker) {
      if (!sticker[item.title].color.includes(item.color) && item.availableQty > 0) {
        sticker[item.title].color.push(item.color)
      }
      if (!sticker[item.title].size.includes(item.size) && item.availableQty > 0) {
        sticker[item.title].size.push(item.size)
      }
    }
    else {
      sticker[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        sticker[item.title].color = [item.color]
        sticker[item.title].size = [item.size]
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(sticker)) }, // will be passed to the page component as props
  }
}
export default Stickers