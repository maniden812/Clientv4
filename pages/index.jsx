import styles from './index.module.css'
export default Home;

function Home() {
    return (
        <div className="p-4">
            <div>
             <h1 className ={styles.bigtext}>Track. Share. Save.</h1>
             <h1 className ={styles.smalltext} >Welcome to FuelQuote. Our platform is here to serve you better and faster. We will provide you the best prices and customer service. Created by Kevin Flores, Manasa Dendukuri, Chetana Pitani</h1>
           </div>
        </div>
    );
}
