import React, { Component , useState} from 'react'
import DatePicker from 'react-datepicker'
// import "react-datepicker/dist/react-datepicker.css";
import styles from '/Users/friday/Desktop/CS/4535Real/Clientv4/components/FuelHistoryTable.js'
// import {ProfileNav} from '../components/Navbar/ProfileNav'
import Hist from "/Users/friday/Desktop/CS/4535Real/Clientv4/components/FuelHistoryTable.js"
import moment from 'moment'
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import axios from "axios";

configure({ adapter: new Adapter() });

const FuelQuote = () => {
    
    const [gallons, setGallons]= useState(0)
    const [deliveryDate, setdeliveryDate]= useState("2022-03-13")
    const [state, setState]= useState("")
    const [pricegal]= useState(3.50)
    const [total, setTotal]=useState(0)
    const [clientInfo,setClientInfo] =useState({
        gallons: 0,
        total: 0,
        deliveryDate: new Date(),
        state: ""
    });
    const handleChange = (e) => {
        setClientInfo({
          ...clientInfo,
          [e.target.name]: e.target.value,
        });
    };
    // const handleSubmit = (event) =>{
    //     // event.preventDefault();
    //     clientInfo.gallons=gallons,
    //     clientInfo.total= gallons * pricegal,
    //     //clientInfo.deliveryDate= [deliveryDate.getMonth()+1,deliveryDate.getDate(),deliveryDate.getFullYear()].join('/')
    //     clientInfo.deliveryDate = deliveryDate
    //     // alert(`${clientInfo.gallons} ${clientInfo.total} ${clientInfo.deliveryDate}`)
    // };
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
            {/* <ProfileNav/> */}
            
            
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

                    <label> Select State </label> 
                    {/* value = { topic } */}
                    <select name="state" required id ='st' onChange={handleChange} >

                    <option value = "AL" > AL </option> 
                    <option value = "AK" > AK </option> 
                    <option value = "AZ" > AZ </option> 
                    <option value = "AR" > AR </option> 
                    <option value = "CA" > CA </option> 
                    <option value = "CO" > CO </option> 
                    <option value = "CT" > CT </option> 
                    <option value = "DE" > DE </option> 
                    <option value = "DC" > DC </option> 
                    <option value = "FL" > FL </option> 
                    <option value = "GA" > GA </option> 
                    <option value = "HI" > HI </option> 
                    <option value = "ID" > ID </option> 
                    <option value = "IL" > IL </option> 
                    <option value = "IN" > IN </option> 
                    <option value = "IA" > IA </option> 
                    <option value = "KS" > KS </option> 
                    <option value = "KY" > KY </option> 
                    <option value = "LA" > LA </option> 
                    <option value = "ME" > ME </option> 
                    <option value = "MD" > MD </option> 
                    <option value = "MA" > MA </option> 
                    <option value = "MI" > MI </option> 
                    <option value = "MN" > MN </option> 
                    <option value = "MS" > MS </option> 
                    <option value = "MO" > MO </option> 
                    <option value = "MT" > MT </option> 
                    <option value = "NE" > NE </option> 
                    <option value = "NV" > NV </option> 
                    <option value = "NH" > NH </option> 
                    <option value = "NJ" > NJ </option> 
                    <option value = "NM" > NM </option> 
                    <option value = "NY" > NY </option> 
                    <option value = "NC" > NC </option> 
                    <option value = "ND" > ND </option> 
                    <option value = "OH" > OH </option> 
                    <option value = "OK" > OK </option> 
                    <option value = "OR" > OR </option> 
                    <option value = "PA" > PA </option> 
                    <option value = "RI" > RI </option> 
                    <option value = "SC" > SC </option> 
                    <option value = "SD" > SD </option> 
                    <option value = "TN" > TN </option> 
                    <option value = "TX" > TX </option> 
                    <option value = "UT" > UT </option> 
                    <option value = "VT" > VT </option> 
                    <option value = "VA" > VA </option> 
                    <option value = "WA" > WA </option> 
                    <option value = "WV" > WV </option> 
                    <option value = "WI" > WI </option> 
                    <option value = "WY" > WY </option> 
                    </select> 

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
            <div className={styles.container}>
                
                <label>Suggested Price/Gallon</label>
                <br/>
                {pricegal}
                <br/><br />
                <label>Total</label>
                <br/>
                {gallons * pricegal}
            </div>
        </body>
        )
    }

export default FuelQuote;
