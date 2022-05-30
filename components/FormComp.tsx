import styles from './styles/FormComp.module.css';

export default function FormComp(props) {


    const buyButton = {
        backgroundColor: props.buy? 'blue' : 'gray',
        color: props.buy? 'white' : 'black'
    }

    const sellButton = {
        backgroundColor: props.buy? 'gray' : 'blue',
        color: props.buy? 'black' : 'white'
    }

    return(
        <div className={styles.container}>
        <form onSubmit={props.handleSubmit}>
            <button className={styles.buy} style={{...buyButton}}
            onClick={props.buyIt} type='button' id="buy">خرید</button>
            <button className={styles.sell} style={{...sellButton}} 
            onClick={props.sell} type='button' id="sell">فروش</button>
            <input className={styles.input} name='name' id="name" type='text' onChange={props.handleChange} placeholder="نام" required/>
            <input className={styles.input} name='phone' id='phone' type='number' onChange={props.handleChange} placeholder="شماره تماس" required/>
            <input className={styles.count} value={props.count} name='count' min='0' id='count' type='number' onChange={props.handleChangeCount} placeholder="تعداد" required />
            <button className={styles.incre} onClick={props.increment} type='button' id="add">+</button>
            <button className={styles.incre} onClick={props.decrement} type='button' id="sub">-</button>
            <input className={styles.input} name='price' id="price" min='0' type='number' onChange={props.handleChange} placeholder="قیمت هر واحد" required/>
            <p style={{ display: 'inline-block' }}>مبلغ خرید:</p>
            <p style={{ display: props.sum ? 'inline-block' : 'none', paddingRight: '20px' }}>{props.sum} دلار</p>
            <button type='submit' onClick={props.checkForm} className={styles.submit}>{props.buy? 'خرید' : 'فروش'}</button>
        </form>
        </div>
    )
}