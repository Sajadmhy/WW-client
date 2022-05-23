import styles from './styles/OrderFin.module.css';

export default function OrderFin(props) {
    return(
        <div className={styles.container}>
        <p className={styles.close} onClick={props.toggleOrder} >X</p>
        <h3 className={styles.h3}>جزییات سفارش</h3>
        <div id={styles.box}>
        <p className={styles.item}>نام سفارش دهنده</p>
        <p className={styles.item}>{props.inputValues.name}</p>
        <br/>
        <p className={styles.item}>شماره سفارش دهنده</p>
        <p className={styles.item}>{props.inputValues.phone}</p>
        <br/>
        <p className={styles.item}>فایل آپلود شده</p>
        <button className={styles.watch}>مشاهده</button>
        </div>
        <button className={styles.submit} onClick={props.submitForm}>ثبت نهایی</button>
        <button className={styles.cancel} onClick={props.toggleOrder}>انصراف</button>
        </div>
    )
}