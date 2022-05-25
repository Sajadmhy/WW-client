import styles from './styles/Orders.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import { display } from '@mui/system';


export default function Orders(props) {
     
    //Slices the orders to 3 orders per page
    const currentOrders = props.orders
    .slice((parseInt(props.page)-1)*3,((parseInt(props.page)-1)*3)+3);
    
    const index = (props.page-1)*3;

    const totalPage = (props.orders.length)/3;
    const page = props.page;


    return(
        <>
        <table className={styles.table}>
            <tr>
                <th className={styles.header}>ایدی سفارش</th>
                <th className={styles.header}>نوع سفارش</th>
                <th className={styles.header}>مقدار سفارش</th>
                <th className={styles.header}>قیمت هر واحد</th>
                <th className={styles.header}>قیمت کل</th>
                <th className={styles.header}>تاریخ ثبت</th>
                <th className={styles.header}>تاریخ نهایی شدن</th>
                <th className={styles.header}></th>
            </tr>
            {currentOrders.map((data,key) => 
            <>
            <tr key={key}>
            <th className={styles.data}>{data.id}</th>
            <th className={styles.data}>{data.buy ? 'خرید' : 'فروش'}</th>
            <th className={styles.data}>{data.count} واحد</th>
            <th className={styles.data}>{data.price} دلار</th>
            <th className={styles.data}>{parseInt(data.count) * parseInt(data.price)} دلار</th>
            <th className={styles.data}>request date</th>
            <th className={styles.data}>confirmation date</th>
            <button className={styles.button} onClick={() => props.showDeets(data._id)}>
                مشاهده
            </button>
            <div className={styles.delete} onClick={() => props.deleteOrder(data._id)}>
                <DeleteIcon />
            </div>
            </tr>
            
            <div style={{ display: props.deets[parseInt(key)+index]? 'block' : 'none' }} className={styles.deets}>
              <div className={styles.box}>
                <button onClick={() => props.hideDeets(data._id)}
                 className={styles.closeWatch}>X</button> 
                <p>نام سفارش دهنده: {data.name}</p>
                <p>شماره تلفن سفارش دهنده: {data.phone}</p>
              </div>
            </div>
            </>
            )}
        </table>
        {/* <div className={styles.pagi} ><Pagination count={Math.ceil(totalPage)} page={page} 
        onChange={props.handlePageChange} variant="outlined" color="primary"/></div> */}
        </>
    )
}