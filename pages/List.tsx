import Head from 'next/head';
import Navbar from '../components/Navbar';
import Orders from '../components/Orders';
import styles from '../components/styles/List.module.css';
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function List() {
  
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([{}]);
  const [deets,setDeets] = useState([false]);
  const [activeH,setActiveH] = useState(false);
  const [activeL,setActiveL] = useState(true);
  const [isFetched, setIsFetched] = useState(false);

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

  
  const handlePageChange = (e,value) => {
    setPage(value);
  } 

  const removeOrderFromView = (id:string) => {
    setOrders(orders.filter((order:{_id: string}) => order._id !== id));
  }

  // Deletes order from Mongodb and view
  const deleteOrder = async(id:string) => {
    await fetch(`https://ancient-ravine-06505.herokuapp.com/orders/delete?orderID=${id}`, {
      method: "delete",
      headers: new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json",
      })
    });
    removeOrderFromView(id);
  }
  
  useEffect(() => {
    const fetchOrders = async (): Promise<any> => {
      const response = await fetch(`https://ancient-ravine-06505.herokuapp.com/orders/orders`);
      const json = await response.json();
      setOrders(json)
      setDeets(
        json.map(n => n.deets)
      )
      setIsFetched(true)
    }
    fetchOrders();
  }, []);

  // Resets the deets elements 
  // useEffect(() => {
  //   function resDeets () {
  //     let resetDeets = [];
  //     for (let i=0; i< orders.length; i++) {
  //       resetDeets[i] = false;
  //     };
  //     setDeets(resetDeets);
  //   };
  //   resDeets();
  // }, [])

  //shows details of an order
  const showDeets = (id) => {
    const index = orders.findIndex((order:{_id: string}) => order._id === id);
    const newDeets = [...deets];
    newDeets[index] = true;
    setDeets(newDeets);
  }

 //hides details of an order
 const hideDeets = (id) => {
  const index = orders.findIndex((order:{_id: string}) => order._id === id);
  const newDeets = [...deets];
  newDeets[index] = false;
  setDeets(newDeets);
  // return index;  
}
 const totalPage = (orders.length)/3;
  return (
    <div className={styles.container}>
      <Head>
        <title>لیست</title>
      </Head>
      <div className={styles.nav}><Navbar highlightH={highlightH} highlightL={highlightL}
      activeH={activeH} activeL={activeL}/></div>
      <div className={styles.orders}>
        <h2 className={styles.h2}>لیست سفارش ها</h2>
        <div className={styles.loading} style={{ display: isFetched ? 'none' : 'block'}}>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </div>
        <div className={styles.orderTable}><Orders orders={orders} 
        deleteOrder={deleteOrder} showDeets={showDeets} 
        hideDeets={hideDeets} deets={deets} page={page} handlePageChange={handlePageChange} /></div>
        <div className={styles.pagi} ><Pagination count={Math.ceil(totalPage)} page={page} 
        onChange={handlePageChange} variant="outlined" color="primary"/></div>
      </div>
    </div>
  );
}