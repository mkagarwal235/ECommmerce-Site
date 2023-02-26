import product from '@/models/product';
import mongoose from "mongoose";
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Post = ({ addToCard, products, variants, buyNow }) => {
  const router = useRouter()
  const { slug } = router.query
  const [pin, setPin] = useState()
  const [service, setService] = useState()
  const checkServiceability = async () => {
    let pins = await fetch('http://localhost:3000/api/pincode')
    let pinJson = await pins.json()
    if (pinJson.includes(parseInt(pin))) {
      setService(true);
      toast.success('Your pincode is Serviceable!!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else {
      setService(false);
      toast.error('Sorry Your pincode is not Serviceable!!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }
  const onChangePin = (e) => {
    setPin(e.target.value)
  }

  const [color, setColor] = useState(products.color)
  const [size, setSize] = useState(products.size)


  const refreshvariant = (newSize, newColor) => {
    let url = `http://localhost:3000/product/${variants[newColor][newSize]['slug']}`
    window.location = url;

  }


  return <>
    <section className="text-gray-600 body-font overflow-hidden">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-top rounded" src={products.img} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">CODEWEAR</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{products.title}({products.color}/{products.size})</h1>
            
            <p className="leading-relaxed">{products.desc}.</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {Object.keys(variants).includes('WHITE') && Object.keys(variants['WHITE']).includes(size) && <button onClick={() => { refreshvariant(size, 'WHITE') }} className={`border-2  rounded-full w-6 h-6 focus:outline-none ${color === 'WHITE' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('RED') && Object.keys(variants['RED']).includes(size) && <button onClick={() => { refreshvariant(size, 'RED') }} className={`border-2  ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${color === 'RED' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('GREEN') && Object.keys(variants['GREEN']).includes(size) && <button onClick={() => { refreshvariant(size, 'GREEN') }} className={`border-2  ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${color === 'GREEN' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('BLACK') && Object.keys(variants['BLACK']).includes(size) && <button onClick={() => { refreshvariant(size, 'BLACK') }} className={`border-2  ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color === 'BLACK' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('PURPLE') && Object.keys(variants['PURPLE']).includes(size) && <button onClick={() => { refreshvariant(size, 'PURPLE') }} className={`border-2  ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none ${color === 'PURPLE' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('BLUE') && Object.keys(variants['BLUE']).includes(size) && <button onClick={() => { refreshvariant(size, 'BLUE') }} className={`border-2  ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${color === 'BLUE' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('YELLOW') && Object.keys(variants['YELLOW']).includes(size) && <button onClick={() => { refreshvariant(size, 'YELLOW') }} className={`border-2  ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${color === 'YELLOW' ? 'border-black' : 'border-gray-300'}`}></button>}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select value={size} onChange={(e) => { refreshvariant(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none  focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                    {Object.keys(variants[color]).includes('S') && <option value={'S'}>S</option>}
                    {Object.keys(variants[color]).includes('M') && <option value={'M'}>M</option>}
                    {Object.keys(variants[color]).includes('L') && <option value={'L'}>L</option>}
                    {Object.keys(variants[color]).includes('XL') && <option value={'XL'}>XL</option>}
                    {Object.keys(variants[color]).includes('XXL') && <option value={'XXL'}>XXL</option>}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">₹{products.price}</span>
              <button onClick={() => { buyNow(slug, 1, products.price, products.title, size, color) }} className="flex ml-8 text-white bg-pink-500 border-0 py-2 md:px-6 focus:outline-none  hover:bg-pink-600 rounded">Buy Now</button>
              <button onClick={() => { addToCard(slug, 1, products.price, products.title, size, color) }} className="flex ml-4 text-white bg-pink-500 border-0 py-2 md:px-6 focus:outline-none  hover:bg-pink-600 rounded">Add to Card</button>
              {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button> */}

            </div>

            <div className="pin mt-6 flex space-x-2 text-sm">
              <input onChange={onChangePin} type="text" className='px-2 border-2 border-gray-400 rounded-md' placeholder='Enter Your pincode' />
              <button onClick={checkServiceability} className='flex ml-14 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none  hover:bg-pink-600 rounded'>Check</button>
            </div>
            {(!service && service != null) && <div className='text-red-700 test-sm mt-3'>
              Sorry we dont deliver to this pincode yet.
            </div>}
            {(service && service != null) && <div className='text-green-700 test-sm mt-3'>
              This pincode is Serviceable.
            </div>}
          </div>
        </div>
      </div>
    </section></>
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await product.findOne({ slug: context.query.slug })
  let variants = await product.find({ title: products.title ,category:products.category})
  let colorSizeSlug = {}       //{red:{xl:{slug:'wear-the-code-xl'}}}
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
    else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { slug: item.slug }

    }
  }



  return {
    props: { products: JSON.parse(JSON.stringify(products)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) }, // will be passed to the page component as props
  }
}

export default Post