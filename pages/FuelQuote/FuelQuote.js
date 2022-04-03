import React, { Component , useState} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import styles from './FuelQuote.module.css'
import {ProfileNav} from '../components/Navbar/ProfileNav'
import Hist from "../components/FuelQuoteTable/FuelQuoteTable"
// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// configure({ adapter: new Adapter() });

const FuelQuote = () => {
    
    const [gallons, setGallons]= useState(0)
    const [deliveryDate, setdeliveryDate]= useState(new Date())
    const [address]= useState("1234 Cullen Blvd Houston, TX 77004")
    const [pricegal]= useState(3.50)
    const [total, setTotal]=useState(0)
    const clientInfo ={
        gallons: 0,
        total: 0,
        deliveryDate: new Date().toDateString()
    }
    const handleSubmit = (event) =>{
        // event.preventDefault();
        clientInfo.gallons=gallons,
        clientInfo.total= gallons * pricegal,
        clientInfo.deliveryDate= deliveryDate.toDateString()
    
        // alert(`${clientInfo.gallons} ${clientInfo.total} ${clientInfo.deliveryDate}`)
    };
    return (
        <body>
            <ProfileNav/>
            
            
            <form className={styles.center} onSubmit = { handleSubmit }>
            
                <div>
                    
                    {/* gallons requested */}
                    <label>Gallons Requested<br/></label>
                    <input type="number" 
                    min="0"
                    value={gallons} 
                    required
                    onChange={(g)=>setGallons(g.target.value)}/>
                    <br/>
                    
                    {/* delivery Address */}
                    <label><br/>Delivery Address<br/></label>
                    <input address="input" 
                    type="text" 
                    placeholder="Enter Delivery Address" 
                    value= {address} 
                    readOnly= {true}/>
                    <br/>

                    {/* date picker */}
                    <label><br/>Delivery Date<br/></label>
                    <DatePicker
                    placeholderText="Select Date"
                    dateFormat="MM/dd/yyyy"
                    selected={deliveryDate}
                    required
                    onChange={ (d)=>setdeliveryDate(d)}
                    name="deliveryDate"
                    />
                    <br/>

                    {/* Suggested Price/gal */}
                    <label><br/>Suggested Price/Gallon<br/></label>
                    <input price="input" 
                    type="number" 
                    placeholder="Suggested Price" 
                    value= {pricegal} 
                    readOnly= {true}/>
                    <br/>

                </div>
                <br/>
                <button type="submit">Submit</button>
            </form>
            <div className={styles.container}>
                    <Hist 
                        name= "Machevin"
                        address= {address}
                        gallons= {gallons}
                        deliveryDate={deliveryDate.toDateString()}
                        total= {gallons * pricegal}
                    />
                </div>
        </body>
        )
    }

export default FuelQuote;
