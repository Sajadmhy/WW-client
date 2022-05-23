import { useState } from 'react';
import styles from './styles/Offers.module.css';
import price from './Data/price.json';
import uuid from 'react-uuid';

export default function Offers(props) {
    const [limit,setLimit] = useState(8);
    
    //maps the price list array 
    const listItems = price.slice(0,limit).map((i) => 
        <tr key={uuid()}>
        <th>price</th>
        <th>count</th>
        <th className={styles.price}>final price</th>
        </tr>
    );

    //expands the list of prices if it's equal to 8 and shrinks 
    // it if it's above 8
    const seeMore = () => {
            if (limit=== 8) {
                setLimit(16);
            } else {setLimit(8)}
        };
    

    return(
        <div className={styles.container}>
        <h3 className={styles.h3}>پیشنهاد‌‌های {props.buy? 'خرید' : 'فروش'}</h3>
        <table>
           <tr>
            <th className={styles.column}>قیمت</th>
            <th className={styles.column}>مقدار</th>
            <th className={styles.column}>مبلغ کل</th>
            </tr>
        {listItems}
        </table>
        {/* changes the context of the button based on the price list length */}
        <button className={styles.more} onClick={seeMore}>{limit>10 ? "مشاهده کمتر" : "مشاهده بیشتر"}</button>
        </div>
    )
}