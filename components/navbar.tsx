import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { MdAccountCircle } from 'react-icons/md'

const Navbar = ({ card, addToCard, removeFromCard, clearCard, subTotal }) => {
    console.log(card, addToCard, removeFromCard, clearCard, subTotal)
    const toggleCard = () => {
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-full')
            ref.current.classList.add('translate-x-0')
        }
        else if (!ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-0')
            ref.current.classList.add('translate-x-full')
        }

    }
    const ref = useRef();
    return (
        <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 mb-1 shadow-md sticky top-0 bg-white z-10">
            <div className="logo mx-5">
                <Link href={"/"}><Image src="/logo.png" alt="" width={200} height={40} /></Link>
            </div>
            <div className="nav">
                <ul className='flex items-center space-x-6 font-bold md:text-md'>
                    <Link href={"/tshirt"}><li className='hover:text-pink-500'>Tshirts</li></Link>
                    <Link href={"/hoddies"}><li className='hover:text-pink-500'>Hoodies</li></Link>
                    <Link href={"/stickers"}><li className='hover:text-pink-500'>Stickers</li></Link>
                    <Link href={"/mug"}><li className='hover:text-pink-500'>Mugs</li></Link>
                </ul>
            </div>
            <div className="card absolute right-0 mx-5 top-4 cursor-pointer flex">
                <Link href={'/login'}><MdAccountCircle className='md:text-3xl text-xl mx-2' /></Link>
                <AiOutlineShoppingCart onClick={toggleCard} className='md:text-3xl text-xl' />
            </div>

            <div ref={ref} className={`w-72 h-[100vh] sideCard overflow-y-scroll absolute top-0 right-0 bg-pink-100 py-10 px-8 transform transition-transform ${Object.keys(card).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
                <h2 className='font-bold text-xl text-center'>Shopping Card</h2>
                <span onClick={toggleCard} className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"><AiFillCloseCircle /></span>
                <ol className='list-decimal font-semibold'>
                    {Object.keys(card).length == 0 && <div className='my-4 font-semibold'>Your Card is Empty!</div>}
                    {Object.keys(card).map((k) => {
                        return <li key={k}>
                            <div className="item flex my-5">

                                <div className='w-2/3 font-semibold'>{card[k].name}({card[k].size}/{card[k].variant})</div>
                                <div className='flex items-center justify-center w-1/3 font-semibold text-lg'><AiFillMinusCircle onClick={() => { removeFromCard(k, 1, card[k].price, card[k].name, card[k].size, card[k].variant) }} className='cursor-pointer text-pink-500' /><span className='mx-2 
                            text-sm'>{card[k].qty}</span><AiFillPlusCircle onClick={() => { addToCard(k, 1, card[k].price, card[k].name, card[k].size, card[k].variant) }} className='cursor-pointer text-pink-500' /></div>
                            </div>
                        </li>
                    })}

                </ol>
                <div className="font-bold my-2">Subtotal:₹{subTotal}</div>
                <div className="flex">
                    <Link href={'/chechout'}><button className="flex  mr-2 text-white bg-pink-500 border-0 py-2 px-2 
                focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />CheckOut</button></Link>
                    <button onClick={clearCard} className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 
                focus:outline-none hover:bg-pink-600 rounded text-sm">Clear Cart</button></div>

            </div>

        </div>
    )
}

export default Navbar