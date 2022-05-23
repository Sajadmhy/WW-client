/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import styles from './styles/Navbar.module.css';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useState } from "react";
import { orange } from "@mui/material/colors";

export default function Navbar(props) {



    const selectionH = {
        backgroundColor : props.activeH? 'gray' : 'transparent',
        borderRight: props.activeH ? '3px solid orange' : 'none'
    }

    const selectionL = {
        backgroundColor : props.activeL? 'gray' : 'transparent',
        borderRight: props.activeL ? '3px solid orange' : 'none'
    }

    return(
        <div className={styles.nav}>
            <h2 className={styles.h2} >محصول</h2>
            <Link href='/'>
            <div onClick={props.highlightH} className={styles.item} style={{...selectionH}}>
                <div className={styles.icon}><HomeIcon/></div><a className={styles.a}>خانه</a>
            </div>
            </Link>
            <br/>
            <Link href='/List'>
            <div onClick={props.highlightL} style={{...selectionL}} className={styles.item}>
                <div className={styles.icon}><ListAltIcon/></div><a className={styles.a}>لیست</a>
            </div>
            </Link>
        </div>
    )
}