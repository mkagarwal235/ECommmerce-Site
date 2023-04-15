import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { MdAccountCircle } from 'react-icons/md'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Navbar = ({ user, logout, card, addToCard, removeFromCard, clearCard, subTotal }) => {
    const [dropdown, setdropdown] = useState(false)

    const [sidebar, setsidebar] = useState(false)
    const router = useRouter()

    useEffect(() => {
        Object.keys(card).length !== 0 && setsidebar(true)

        let exempted = ['/chechout', '/orders', '/order', '/myaccount']
        if (exempted.includes(router.pathname)) {
            setsidebar(false)
        }
    }, [])




    const ref = useRef();
    const toggleCard = () => {
        setsidebar(!sidebar)

        // if (ref.current.classList.contains('translate-x-full')) {
        //     ref.current.classList.remove('translate-x-full')
        //     ref.current.classList.add('translate-x-0')
        // }
        // else if (!ref.current.classList.contains('translate-x-full')) {
        //     ref.current.classList.remove('translate-x-0')
        //     ref.current.classList.add('translate-x-full')
        // }

    }
    return (
        <>
            {!sidebar && <span className='fixed right-12 top-3 z-30 cursor-pointer' onMouseOver={() => setdropdown(true)} onMouseLeave={() => setdropdown(false)} >
                {dropdown && <div className="absolute right-5 bg-white shadow-lg border top-5 py-5 rounded-md px-5 w-32 z-30 ">
                    <ul>
                        <Link href={'/myaccount'}><li className='py-1 text-sm hover:text-blue-700 font-bold'>My Account</li></Link>
                        <Link href={'/orders'}> <li className='py-1 text-sm hover:text-blue-700 font-bold'>My Orders</li></Link>
                        <li onClick={logout} className='py-1 text-sm hover:text-blue-700 font-bold'>Logout</li>
                    </ul>
                </div>}

               
                    {user.value && <MdAccountCircle className='md:text-3xl text-xl mx-2' />}
                
            </span>}

            <div className={`flex flex-col md:flex-row md:justify-start justify-center items-center py-2 mb-1 shadow-md sticky top-0 bg-white z-10 ${!sidebar && 'overflow-hidden'}`}>
                <div className="logo mr-auto md:mx-5">
                    <Link href={"/"}><Image src="/logo1.jpg" alt="" width={100} height={50} /></Link>
                </div>
                <div className="nav">
                    <ul className='flex items-center space-x-6 font-bold md:text-md'>
                        <Link href={"/tshirt"}><li className='hover:text-blue-500'>Tshirts</li></Link>
                        <Link href={"/hoddies"}><li className='hover:text-blue-500'>Hoodies</li></Link>
                        <Link href={"/stickers"}><li className='hover:text-blue-500'>Stickers</li></Link>
                        <Link href={"/mug"}><li className='hover:text-blue-500'>Mugs</li></Link>
                    </ul>
                </div>
                <div className="card absolute items-center right-0 mx-5 top-3 cursor-pointer flex">

                    {!user.value && <Link href={'/login'}>
                        <button className='bg-blue-600 px-2 py-2 rounded-md text-sm text-white mx-2'>Login</button>
                    </Link>}



                    <AiOutlineShoppingCart onClick={toggleCard} className='md:text-3xl text-xl' />
                </div>


                <div ref={ref} className={`w-72 h-[100vh] sideCard overflow-y-scroll absolute top-0  bg-blue-100 py-10 px-8  transition-all ${sidebar ? 'right-0' : '-right-96'}`}>
                    <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
                    <span onClick={toggleCard} className="absolute top-5 right-2 cursor-pointer text-2xl text-blue-500"><AiFillCloseCircle /></span>
                    <ol className='list-decimal font-semibold'>
                        {Object.keys(card).length == 0 && <div className='my-4 font-semibold'>Your Cart is Empty!</div>}
                        {Object.keys(card).map((k) => {
                            return <li key={k}>
                                <div className="item flex my-5">

                                    <div className='w-2/3 font-semibold'>{card[k].name}({card[k].size}/{card[k].variant})</div>
                                    <div className='flex items-center justify-center w-1/3 font-semibold text-lg'><AiFillMinusCircle onClick={() => { removeFromCard(k, 1, card[k].price, card[k].name, card[k].size, card[k].variant) }} className='cursor-pointer text-blue-500' /><span className='mx-2 
                            text-sm'>{card[k].qty}</span><AiFillPlusCircle onClick={() => { addToCard(k, 1, card[k].price, card[k].name, card[k].size, card[k].variant) }} className='cursor-pointer text-blue-500' /></div>
                                </div>
                            </li>
                        })}

                    </ol>
                    <div className="font-bold my-2">Subtotal:₹{subTotal}</div>
                    <div className="flex">
                        <Link href={'/chechout'}><button disabled={Object.keys(card).length === 0} className="disabled:bg-blue-300 flex  mr-2 text-white bg-blue-500 border-0 py-2 px-2 
                focus:outline-none hover:bg-blue-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />CheckOut</button></Link>
                        <button disabled={Object.keys(card).length === 0} onClick={clearCard} className="disabled:bg-blue-300 flex mr-2 text-white bg-blue-500 border-0 py-2 px-2 
                focus:outline-none hover:bg-blue-600 rounded text-sm">Clear Cart</button></div>

                </div>

            </div>
        </>
    )
}

export default Navbar