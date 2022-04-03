import React, { Component , useState} from 'react'
import DatePicker from 'react-datepicker'
// import "react-datepicker/dist/react-datepicker.css";
import styles from './FuelQuote.module.css'
import {ProfileNav} from '../components/Navbar/ProfileNav'
import Hist from "../components/FuelQuoteTable/FuelQuoteTable"
import moment from 'moment'
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import axios from "axios";

configure({ adapter: new Adapter() });

const FuelQuote = () => {
    
    const [gallons, setGallons]= useState(0)
    const [deliveryDate, setdeliveryDate]= useState("2022-03-13")
    const [address]= useState("1234 Cullen Blvd Houston, TX 77004")
    const [pricegal]= useState(3.50)
    const [total, setTotal]=useState(0)
    const [clientInfo,setClientInfo] =useState({
        gallons: 0,
        total: 0,
        deliveryDate: new Date()
    });
    const handleChange = (e) => {
        setClientInfo({
          ...clientInfo,
          [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (event) =>{
        // event.preventDefault();
        clientInfo.gallons=gallons,
        clientInfo.total= gallons * pricegal,
        //clientInfo.deliveryDate= [deliveryDate.getMonth()+1,deliveryDate.getDate(),deliveryDate.getFullYear()].join('/')
        clientInfo.deliveryDate = deliveryDate
        // alert(`${clientInfo.gallons} ${clientInfo.total} ${clientInfo.deliveryDate}`)
    };
    const handleSubmit = (event) =>{
        axios
          .post('http://localhost:3000/' + "FuelQuote", {
            userid: localStorage.getItem("userid"),
            gallons: clientInfo.gallons,
            total: clientInfo.total,
            deliveryDate: clientInfo.deliveryDate,
            
        })
        .then((res) => {
            console.log(res.data);
            if (res.data.error) {
              console.log(res.data.error);
            } 
            else {
              console.log(res.data.credentials);
              if (res.data.credentials) {
                setClient({
                    gallons: res.data.gallons,
                    total: res.data.total,
                    deliveryDate: res.data.deliveryDate,
                  
                });
                history.push("/FuelQuote");
              } 
              else if (!res.data.credentials) {
                console.log(res.data);
                history.push("/FuelQuote");
              }
            }
          })
          .catch((err) => console.log(err));
        e.preventDefault();
      };
    const yesterday = moment().subtract(1, 'day');
    const disablePastDt = current => {
        return current.isAfter(yesterday);
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
                    // value={gallons} 
                    required
                    id="#gals"
                    name = "gallons"
                    onChange={handleChange}/>
                    <br/>
                    
                    {/* delivery Address
                    <label><br/>Delivery Address<br/></label>
                    <input address="input" 
                    type="text" 
                    id="#address"
                    placeholder="Enter Delivery Address" 
                    value= {address} 
                    name = "address"
                    readOnly= {true}/>
                    <br/> */}

                    {/* date picker */}
                    <label><br/>Delivery Date<br/></label>
                    <input
                    type = "date"
                    placeholderText="Select Date"     
                    id="#date"
                    onChange={handleChange}
                    // value={deliveryDate}
                    required
                    name="deliveryDate"
                    />
                    <br/>

                    {/* Suggested Price/gal
                    <label><br/>Suggested Price/Gallon<br/></label>
                    <input price="input" 
                    type="number" 
                    id="#pricegal"
                    name = "pricegal"
                    placeholder="Suggested Price" 
                    value= {pricegal} 
                    readOnly= {true}/>
                    <br/> */}

                </div>
                <br/>
                <button type="submit">Submit</button>
            </form>
            {/* <div className={styles.container}>
                    <Hist 
                        name= "Machevin"
                        address= {address}
                        gallons= {gallons}

                        deliveryDate={deliveryDate}

                        total= {gallons * pricegal}
                    />
                </div> */}
        </body>
        )
    }

export default FuelQuote;
