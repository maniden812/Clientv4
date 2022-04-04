import React, { Component , useState} from 'react'
import moment from 'moment';
import styles from './profile.module.css'
import {ProfileNav} from '../components/Navbar/ProfileNav'
// import { ClientRequest } from 'http'
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Hist from "../components/FuelQuoteTable/FuelQuoteTable"
Enzyme.configure({ adapter: new Adapter() })


const OrderHistory =()=> {
    

    return ( 
                
        <body>
            <ProfileNav/>
            <div className={styles.container}>
                <Hist />
            </div>
                
            

        </body>
        
    )
    
}
    


export default OrderHistory