import React, { Component , useState} from 'react'
import moment from 'moment';
import styles from './profile.module.css'
import {Nav} from '../components/Nav'
// import { ClientRequest } from 'http'
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Hist from "/Users/friday/Desktop/CS/4535Real/Clientv4/components/FuelHistoryTable.js"
Enzyme.configure({ adapter: new Adapter() })


function OrderHistory(){
    
    return ( 
                
        <body>
            <Nav/>
            <div className={styles.container}>
                <Hist />
            </div>

        </body>
        
    )
    
}
    


export default OrderHistory