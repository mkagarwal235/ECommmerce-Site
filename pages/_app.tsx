import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useState,useEffect} from 'react'
import LoadingBar from 'react-top-loading-bar'

function App({ Component, pageProps }: AppProps) {
  const [card, setCard] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const router=useRouter()
  const [user, setUser] = useState({value:null})
  const [key, setkey] = useState()
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    router.events.on('routeChangeStart', ()=>{
      setProgress(40)
    })
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100)
    })
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
  const token=localStorage.getItem('token')
  if(token)
  {
    setUser({value : token})
  }
  setkey(Math.random())
  }, [router.query])

  const logout=()=>
  {
      localStorage.removeItem('token')
      setkey(Math.random())
      setUser({value:null})
      router.push('/')
  }
  
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
    let newCard={}
    newCard[itemCode]={qty:1,price,name,size,variant}

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
   <LoadingBar
        color='#e74c3c'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
  {key && <Navbar logout={logout} user={user} key={key} card={card} addToCard={addToCard} removeFromCard={removeFromCard} clearCard={clearCard} subTotal={subTotal}/>}
  <Component buyNow={buyNow} card={card} addToCard={addToCard} removrFromCard={removeFromCard} clearCard={clearCard} subTotal={subTotal} {...pageProps}/>
  <Footer/>
  </>
}
 export default App
