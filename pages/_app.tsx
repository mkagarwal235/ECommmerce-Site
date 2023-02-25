import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useState,useEffect} from 'react'

function App({ Component, pageProps }: AppProps) {
  const [card, setCard] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const router=useRouter()
  useEffect(() => {
    console.log("hey i am use Effect")
    try{

    
    if(localStorage.getItem("card"))
    {
      setCard(JSON.parse(localStorage.getItem("card")))
      saveCard(JSON.parse(localStorage.getItem("card")))
    }
  }
  catch(error)
  {
    console.error(error);
    localStorage.clear();
  }
  }, [])
  
  const saveCard=(myCard)=>
  {
    localStorage.setItem("card",JSON.stringify(myCard))
    let subt=0;
    let keys=Object.keys(myCard)
    for(let i=0;i<keys.length;i++)
    {
      subt+=myCard[keys[i]].price*myCard[keys[i]].qty;
    }
    setSubTotal(subt)
  }
  const addToCard = (itemCode,qty,price,name,size,variant)=>{
    let newCard=card;
    if(itemCode in card)
    {
      newCard[itemCode].qty=card[itemCode].qty+qty
    }
    else{
      newCard[itemCode]={qty:1,price,name,size,variant}
    }
    setCard(newCard)
    saveCard(newCard)
  }
  const buyNow=(itemCode,qty,price,name,size,variant)=>{
    let newCard={itemCode:{qty:1,price,name,size,variant}}

    setCard(newCard)
    saveCard(newCard)
    router.push('/chechout')


  }
  const clearCard=()=>{
    setCard({})
    saveCard({})
  }

  const removeFromCard = (itemCode,qty,price,name,size,variant)=>{
    let newCard=card;
    if(itemCode in card)
    {
      newCard[itemCode].qty=card[itemCode].qty-qty
    }


    if(newCard[itemCode]["qty"]<=0)
    {
      delete newCard[itemCode]
    }
    setCard(newCard)
    saveCard(newCard)
  }
  return <>
  <Navbar key={subTotal} card={card} addToCard={addToCard} removeFromCard={removeFromCard} clearCard={clearCard} subTotal={subTotal}/>
  <Component buyNow={buyNow} card={card} addToCard={addToCard} removrFromCard={removeFromCard} clearCard={clearCard} subTotal={subTotal} {...pageProps}/>
  <Footer/>
  </>
}
 export default App
