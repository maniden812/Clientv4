import { useState , useEffect} from 'react';
import React from 'react';
import styles from "./FuelHistoryTable.module.css"
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import axios from "axios"
configure({ adapter: new Adapter() });
function FuelQuoteTable(props){
    const [history, setHistory] = useState([])
    const getHistory = () => {
        axios
          .post("http://localhost:3000/" + "orderhistory", {
            userid: localStorage.getItem("userid"),
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.error) {
              console.log(res.data.error);
            } else {
              setHistory(res.data);
            }
          })
          .catch((err) => console.log(err));
      };
    
      useEffect(() => {
        getHistory()
      }, []);
      
    return(
            <table className={styles.allofit}>
                <thead className={styles.headings}>
                    <tr className={styles.titles}>
                        <th>Address</th>
                        <th>Gallons</th>
                        <th>Date</th>
                        <th>Total</th>
                        
                    </tr>
                </thead>
                {history.map((row, index) => (
                    <tbody key={index} className={styles.data}>
                        <td>{row.address}</td>
                        <td>{row.gallons}</td>
                        <td>{formatDate(row.date)}</td>
                        <td>{parseFloat(row.total).toFixed(2)}</td>
                    </tbody>
                ))}
            </table>

    )
}
export default FuelQuoteTable;
