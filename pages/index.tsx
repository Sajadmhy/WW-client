import Head from 'next/head';
import Image from 'next/image';
import price from '../public/images/price-plot.png';
import Offers from '../components/Offers';
import FormComp from '../components/FormComp';
import Navbar from '../components/Navbar';
import styles from '../components/styles/Home.module.css';
import OrderFin from '../components/OrderFin';
import { useState, useEffect } from 'react';
import uuid from 'react-uuid';

export default function Home() {

  const [showOrder, setShowOrder] = useState<boolean>(false);
  const [count,setCount] = useState<number>();
  const [inputValues,setInputValues] = useState({
  id:uuid(), buy:true, deets: false, name:'', phone:0, count:0, price:0
  });
  const [sum,setSum] = useState<number>();
  const [buy, setBuy] = useState<boolean>(true);



  const [activeH,setActiveH] = useState(true);
  const [activeL,setActiveL] = useState(false);
  
  const highlightH = () => {
      //resets styles of other items
      setActiveL(false);
      //adds highlight to the selected item
      setActiveH(true);
  }

  const highlightL = () => {
      //resets styles of other items
      setActiveH(false);
      //adds highlight to the selected item
      setActiveL(true);
  }



  //Adds to the count state amount by 1
  function increment() {
    if (count=== undefined ) {
      setCount (1);
      setInputValues ({
        ...inputValues, count: 1
      });
    } else {
      setCount(count + 1);
      setInputValues ({
        ...inputValues, count: count + 1
      });
    }
  }

  //Subtracts from the count state amount by 1,
  //Until it reaches Zero
  function decrement() {
      if (count===0) {
        setCount(0);
        setInputValues ({
          ...inputValues, count: 0
        });
      } else {
        setCount(count - 1);
        setInputValues ({
          ...inputValues, count: count -1
        });
      }
    }
  
  
  //Shows the final order display and generates new id
  const toggleOrder = () => {
    setInputValues({
      ...inputValues, id: uuid()
    })
    setShowOrder(s => !s)
  };

  const sell = () => {
    setBuy(false);
    setInputValues({
      ...inputValues, buy: false
    });
  };

  const buyIt = () => {
    setBuy(true);
    setInputValues({
      ...inputValues, buy: true
    });
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues, [name]: value
    });
  };
  
  function handleChangeCount(e) {
    setCount(
      parseInt(e.target.value)
    );
    setInputValues({
      ...inputValues, count : e.target.value
    });
  };

  //Updates the finalized ammount of order
  useEffect(() => {
   setSum(count * (inputValues.price));
  },[count,inputValues.price]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  //Submits data to mongodb
  const submitForm = async () => {
    try {
      toggleOrder();
      const response = await fetch(`https://ancient-ravine-06505.herokuapp.com/orders/order`, {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
          "Accept": "application/json"
        }),
        body: JSON.stringify(inputValues)
      });
      return response.ok;
    } catch (ex) {
      toggleOrder();
      return false;
    }
  }

  //Checks for empty inputs in the FormComp component
  function checkForm() {
    if (inputValues.name === '' ) {
      alert('نام را وارد کنید');
    } else if (inputValues.phone === 0) {
      alert('شماره تلفن را وارد کنید');
    } else if (count === 0 || inputValues.price === 0) {
      alert('قیمت یا تعداد نباید صفر باشد');
    } else {
      toggleOrder();
    }
  }

  return (
  <>
    <div className={styles.container}>
      <Head>
        <title>خانه</title>
      </Head>
      <div className={styles.nav}><Navbar highlightH={highlightH} highlightL={highlightL}
      activeH={activeH} activeL={activeL} /></div>
      <div className={styles.form}>
        <FormComp toggleOrder={toggleOrder} handleChange={handleChange} 
        sum={sum} increment={increment} inputValues={inputValues}
        count={count} decrement={decrement} checkForm={checkForm} handleSubmit={handleSubmit}
        buy={buy} sell={sell} setBuy={setBuy} handleChangeCount={handleChangeCount}
        buyIt={buyIt} />
      </div>
      <div className={styles.offer}><Offers buy={buy} /></div>
      <div className={styles.img}><Image 
      src={price}
      height={300}
      width={600}
      alt='Price Chart'
      /></div>
    </div>
    <div className={styles.order} style={{display: showOrder ? "block" : "none"}}>
      <OrderFin toggleOrder={toggleOrder} inputValues={inputValues} submitForm={submitForm} />
    </div>
  </>
  );
}
